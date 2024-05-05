from typing import TYPE_CHECKING

from backend.database import SessionLocal
from backend.dtos import PlanDTO, TripInfo, PlanComponentDTO
from backend.models import Plan

if TYPE_CHECKING:
    from backend.services import SkyscannerService


class PlanService:
    def __init__(
        self,
        skyscanner_service: "SkyscannerService",
    ):
        self.skyscanner_service = skyscanner_service

    def create_plan(self, trip_info: TripInfo) -> PlanDTO:
        plan_info = self._create_plan(trip_info)
        plan = Plan(
            plan_info=plan_info.json(exclude_none=True),
        )
        with SessionLocal() as session:
            session.add(plan)
            session.commit()
            session.refresh(plan)
        plan_info.trip_plan_id = plan.plan_id
        return plan_info

    def _create_plan(self, trip_info: TripInfo) -> PlanDTO:
        # 비행기와 숙소 정보를 가져옵니다.
        (
            plane_info,
            accommodation_info,
        ) = self.skyscanner_service.create_plane_and_accommodation_info(
            trip_info.province, trip_info.days, trip_info.start_date
        )
        # 날짜별 일정을 생성합니다.
        day_plan_list = self.day_plan_service.create_day_plan_list(trip_info)

        return PlanDTO(
            trip_plan=[
                PlanComponentDTO(
                    component_id=1,
                    component_type="plane",
                    plane_info=plane_info,
                    accommodation_info=None,
                ),
                PlanComponentDTO(
                    component_id=2,
                    component_type="accommodation",
                    plane_info=None,
                    accommodation_info=accommodation_info,
                ),
                PlanComponentDTO(
                    component_id=3,
                    component_type="activity",
                    day_plan_list=day_plan_list,
                ),
            ]
        )
