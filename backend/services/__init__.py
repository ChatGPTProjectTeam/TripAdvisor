from .day_plan import DayPlanService
from .plan import PlanService
from .skyscanner import SkyscannerService

plan_service = PlanService()
skyscanner_service = SkyscannerService()
day_plan_service = DayPlanService()


__all__ = [
    "plan_service",
    "skyscanner_service",
    "day_plan_service",
]
