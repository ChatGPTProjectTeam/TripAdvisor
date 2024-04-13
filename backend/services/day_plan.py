from datetime import timedelta
from typing import TYPE_CHECKING

from backend.dtos import TripInfo, DayPlan, SubPlan

if TYPE_CHECKING:
    from backend.services.gpt import GPTService


class DayPlanService:
    """
    날짜별 여행 일정을 생성하는 서비스입니다.
    """

    def __init__(self, gpt_service: "GPTService"):
        self.gpt_service = gpt_service

    def create_day_plan_list(self, trip_info: TripInfo) -> list[DayPlan]:
        day_plan_list = []
        activities = self.create_subplan_activities(trip_info)
        for i in range(trip_info.days):
            day_plan_list.append(
                DayPlan(
                    plan_id=i + 1,
                    date=trip_info.start_date + timedelta(days=i),
                    morning=SubPlan(
                        activity=self._get_activity((3 * i), activities),
                    ),
                    afternoon=SubPlan(
                        activity=self._get_activity((3 * i + 1), activities),
                    ),
                    evening=SubPlan(
                        activity=self._get_activity((3 * i + 2), activities),
                    ),
                )
            )
        return day_plan_list

    def create_subplan_activities(self, trip_info: TripInfo) -> list[str]:
        return self.gpt_service.generate_activities(trip_info)

    def _get_activity(self, index: int, activities: list[str]) -> str:
        try:
            return activities[index]
        except IndexError:
            # GPT 에서 내려주는 활동의 개수와 실제 일정의 개수가 다른 경우 빈 스트링으로 내려줌
            return ""
