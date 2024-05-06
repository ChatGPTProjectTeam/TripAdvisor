from datetime import datetime
from typing import TYPE_CHECKING

from backend.database import SessionLocal
from backend.dtos import TripInfo, PlanDTO
from backend.models import Plan, PlanComponent

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
        (
            from_plane_info,
            to_plane_info,
            accommodation_info,
        ) = self.skyscanner_service.create_plane_and_accommodation_info(trip_info)

        activities = self.gpt_service.generate_activities(trip_info)

        from_plane_component = PlanComponent(
            component_type="plane_info", plane_info=from_plane_info, plan=plan
        )
        to_plane_component = PlanComponent(
            component_type="plane_info", plane_info=to_plane_info, plan=plan
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
            session.add(from_plane_component)
            session.add(accommodation_component)
            session.add(activity_component)
            session.add(to_plane_component)
            session.commit()

    def update_plan(self, plan_id: int, msg: str):

        component_id = 15     # 4 * plan_id - 1

        with SessionLocal() as session:
            # plan = session.query(Plan).filter(Plan.id == plan_id).one()
            components = (
                session.query(PlanComponent)
                .filter(PlanComponent.component_id == component_id)
                .all()
            )
            if components:
                previous_activity = components[0].activity
                print(type(previous_activity))
                new_activity = self.gpt_service.edit_activity(
                    previous_activity, msg
                )

                components[0].activity = new_activity
                session.commit()