from .day_plan import DayPlanService
from .gpt import GPTService
from .plan import PlanService
from .skyscanner import SkyscannerService

gpt_service = GPTService()
skyscanner_service = SkyscannerService()
day_plan_service = DayPlanService(gpt_service=gpt_service)
plan_service = PlanService(
    day_plan_service=day_plan_service, skyscanner_service=skyscanner_service
)
