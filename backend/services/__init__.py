from .gpt import GPTService
from .plan import PlanService
from .skyscanner import SkyscannerService

gpt_service = GPTService()
skyscanner_service = SkyscannerService()
plan_service = PlanService(
    skyscanner_service=skyscanner_service,
    gpt_service=gpt_service,
)
