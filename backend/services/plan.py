from typing import TYPE_CHECKING

from backend.database import SessionLocal
from backend.dtos import TripInfo
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

    def initiate_plan(self, trip_info: TripInfo):
        plan = Plan()
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
            component_type="plane_info", plane_info=from_plane_info, plan=plan
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
            session.add(to_plane_component)
            session.add(accommodation_component)
            session.add(activity_component)
            session.commit()
