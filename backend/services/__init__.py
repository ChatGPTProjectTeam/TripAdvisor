from .gpt import GPTService
from .plan import PlanService
from .search import SearchService
from .skyscanner import SkyscannerService

gpt_service: GPTService = GPTService()
skyscanner_service: SkyscannerService = SkyscannerService()
search_service: SearchService = SearchService()
plan_service: PlanService = PlanService(
    search_service=search_service,
    skyscanner_service=skyscanner_service,
    gpt_service=gpt_service,
)
