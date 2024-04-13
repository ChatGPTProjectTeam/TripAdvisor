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
        for i in range(trip_info.days):
            day_plan_list.append(
                DayPlan(
                    plan_id=i + 1,
                    date=trip_info.start_date + timedelta(days=i),
                    morning=SubPlan(),
                    afternoon=SubPlan(),
                    evening=SubPlan(),
                )
            )
        return day_plan_list
