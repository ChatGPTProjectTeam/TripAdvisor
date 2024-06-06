from backend.dtos import PlanDTO, FestivalDTO, FormRequestDTO
from backend.database import SessionLocal
from typing import Optional, TYPE_CHECKING
from backend.dtos import FestivalDTO
from backend.models import Festival


class FestivalService:
    def __init__(self):
        pass

    # def initiate_plan(self, trip_info: TripInfo, trigger_skyscanner: bool = True):
    #     plan = Plan(
    #         province=trip_info.province,
    #         created_at=datetime.now(),
    #     )
    #     with SessionLocal() as session:
    #         session.add(plan)
    #         session.commit()
    #         session.refresh(plan)
    #     self._create_plan(plan, trip_info, trigger_skyscanner)
    def get_festival_info(
        self, plan_dto: PlanDTO, form_request: FormRequestDTO
    ) -> Optional[FestivalDTO]:
        province = plan_dto.province
        month = form_request.month

        with SessionLocal() as session:
            plan_target = plan_dto.plan_component_list
            plane_info_components = [
                comp for comp in plan_target if comp.component_type == "plane_info"
            ]
            plane_info_components
            festival = (
                session.query(Festival)
                .filter(Festival.province == province, Festival.month == month)
                .first()
            )

            if not festival:
                return None

            return FestivalDTO(
                festival_ID=festival.festival_ID,
                festival_title=festival.festival_title,
                province=festival.province,
                month=festival.month,
                festival_content=festival.festival_content,
                festival_photo=festival.festival_photo,
            )

    # def get_festival_info(
    #     self, plan_dto: PlanDTO, form_request: FormRequestDTO
    # ) -> Optional[FestivalDTO]:
    #     province = plan_dto.province
    #     month = form_request.month
    #
    #     with SessionLocal() as session:
    #         festival = (
    #             session.query(Festival)
    #             .filter(Festival.province == province, Festival.month == month)
    #             .first()
    #         )
    #
    #         if not festival:
    #             return None
    #
    #         return FestivalDTO(
    #             festival_ID=festival.festival_ID,
    #             festival_title=festival.festival_title,
    #             province=festival.province,
    #             month=festival.month,
    #             festival_content=festival.festival_content,
    #             festival_photo=festival.festival_photo,
    #         )
