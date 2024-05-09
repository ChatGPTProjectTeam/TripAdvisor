from concurrent.futures.thread import ThreadPoolExecutor
from datetime import datetime
from typing import TYPE_CHECKING

from backend.database import SessionLocal
from backend.dtos import TripInfo, PlanDTO
from backend.models import Plan, PlanComponent, PlaneInfo, AccommodationInfo

if TYPE_CHECKING:
    from backend.services import SkyscannerService, GPTService


class PlanService:
    def __init__(
        self,
        skyscanner_service: "SkyscannerService",
        gpt_service: "GPTService",
    ):
        self.skyscanner_service = skyscanner_service
        self.gpt_service = gpt_service

    def get_plans(self) -> list[PlanDTO]:
        with SessionLocal() as session:
            plans = session.query(Plan).all()
            plan_list = [PlanDTO.from_orm(plan) for plan in plans]
        return plan_list

    def get_plan(self, plan_id: int) -> PlanDTO:
        with SessionLocal() as session:
            plan = session.query(Plan).filter(Plan.trip_plan_id == plan_id).all()
            return PlanDTO(
                trip_plan_id=plan[0].trip_plan_id,
                province=plan[0].province,
                created_at=plan[0].created_at,
                plan_component_list=plan[0].plan_component_list,
            )

    def initiate_plan(self, trip_info: TripInfo):
        plan = Plan(
            province=trip_info.province,
            created_at=datetime.now(),
        )
        with SessionLocal() as session:
            session.add(plan)
            session.commit()
            session.refresh(plan)
        self._create_plan(plan, trip_info)

    def _create_plan(self, plan: Plan, trip_info: TripInfo):
        with ThreadPoolExecutor(max_workers=2) as executor:
            skyscanner_result = executor.submit(
                self.skyscanner_service.create_plane_and_accommodation_info, trip_info
            )
            activities = executor.submit(
                self.gpt_service.generate_activities, trip_info
            )
        try:
            from_plane_info, to_plane_info, accommodation_info = (
                skyscanner_result.result()
            )
        except Exception as e:
            print("skyscanner error", e)
            from_plane_info = PlaneInfo(
                price="0",
                origin="인천국제공항",
                destination="일본",
                departure="비행기 정보를 불러오지 못했어요. 나중에 다시 시도해주세요.",
                arrival="",
                airline="",
            )
            to_plane_info = PlaneInfo(
                price="0",
                origin="일본",
                destination="인천국제공항",
                departure="비행기 정보를 불러오지 못했어요. 나중에 다시 시도해주세요.",
                arrival="",
                airline="",
            )
            accommodation_info = AccommodationInfo(
                name="숙소 정보를 불러오지 못했어요. 나중에 다시 시도해주세요",
                stars="1",
                lowest_price="",
                rating="",
                location="Location: 9-15 togano-cho, Kita-ku, 530-0056 Osaka, Japan",
            )
            with SessionLocal() as session:
                session.add(from_plane_info)
                session.add(to_plane_info)
                session.add(accommodation_info)
                session.commit()
                session.refresh(from_plane_info)
                session.refresh(to_plane_info)
                session.refresh(accommodation_info)

        try:
            activities = activities.result()
        except Exception as e:
            print("activity error", e)
            activities = (
                "GPT 서버 이슈로 활동 정보를 불러오지 못했어요. 나중에 다시 시도해주세요. 대신에 제가 간단하게 일본에서 즐길 거리를 소개해드릴게요.\n"
                + """
도쿄 탐험: 도쿄는 현대적인 스카이라인과 전통적인 일본 문화가 공존하는 도시입니다. 시부야와 신주쿠와 같은 번화가는 쇼핑과 식사를 즐기기에 완벽하며, 아사쿠사와 같은 지역에서는 센소지 같은 역사적인 사원을 방문할 수 있습니다.\n
교토의 역사적인 명소 방문: 교토는 일본의 고도로서 수많은 사찰, 신사 및 전통적인 일본 정원이 있습니다. 금각사, 은각사, 청수사 등을 방문해 보세요.\n
오사카에서의 먹거리 체험: 오사카는 일본에서 "미식의 도시"로 알려져 있습니다. 도톤보리와 같은 지역에서 타코야키(문어볼), 오코노미야키(일본식 팬케이크)와 같은 길거리 음식을 맛볼 수 있습니다.\n
온천에서 휴식: 일본은 온천으로 유명하며, 하코네, 벳부, 기노사키 등과 같은 온천 지역에서 전통적인 일본식 료칸(여관)에서 숙박하며 온천욕을 즐길 수 있습니다.\n
니세코에서 스키: 홋카이도에 위치한 니세코는 세계적으로 유명한 스키 리조트로, 겨울에는 스키와 스노보드를 즐길 수 있습니다.\n
"""
            )

        from_plane_component = PlanComponent(
            component_type="plane_info", plane_info=from_plane_info, plan=plan
        )
        to_plane_component = PlanComponent(
            component_type="plane_info",
            plane_info=to_plane_info,
            plan=plan,  # plane_info=from_plane_info 이던것 수정
        )
        accommodation_component = PlanComponent(
            component_type="accommodation_info",
            accommodation_info=accommodation_info,
            plan=plan,
        )
        activity_component = PlanComponent(
            component_type="activity",
            activity=activities,
            plan=plan,
        )

        with SessionLocal() as session:
            # 원래 논의됐던대로 plane, accommodation, activity, plane 순으로 수정
            session.add(from_plane_component)
            session.add(accommodation_component)
            session.add(activity_component)
            session.add(to_plane_component)
            session.commit()

    def update_plan(self, plan_id: int, msg: str):
        with SessionLocal() as session:
            # plan = session.query(Plan).filter(Plan.id == plan_id).one()
            components = (
                session.query(PlanComponent)
                .filter(PlanComponent.trip_plan_id == plan_id)
                .filter(PlanComponent.component_type == "activity")
                .all()
            )
            if components:
                previous_activity = components[0].activity
                new_activity = self.gpt_service.edit_activity(previous_activity, msg)

                components[0].activity = new_activity
                session.commit()
