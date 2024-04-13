from datetime import timedelta
from typing import TYPE_CHECKING

from backend.dtos import TripInfo, DayPlan, SubPlan

if TYPE_CHECKING:
    from backend.services.gpt import GPTService


class DayPlanService:
    def __init__(self, gpt_service: "GPTService"):
        self.gpt_service = gpt_service

    def create_day_plan_list(self, trip_info: TripInfo) -> list[DayPlan]:
        day_plan_list = []
        component_gen = self.activity_generator(trip_info)

        for i in range(trip_info.days):
            day_plan_list.append(
                DayPlan(
                    plan_id=i + 1,
                    date=trip_info.start_date + timedelta(days=i),
                    morning=SubPlan(activity=next(component_gen)),
                    afternoon=SubPlan(activity=next(component_gen)),
                    evening=SubPlan(activity=next(component_gen)),
                )
            )
        return day_plan_list

    def activity_generator(self, trip_info: TripInfo):
        activities = self.create_subplan_activities(trip_info)
        for activity in activities:
            yield activity

    def create_subplan_activities(self, trip_info: TripInfo) -> list[str]:
        return self.gpt_service.generate_activities(trip_info)
