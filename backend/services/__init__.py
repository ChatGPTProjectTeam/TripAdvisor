from .gpt import GPTService
from .plan import PlanService
from .festival import FestivalService

# from .search import SearchService
from .skyscanner import SkyscannerService

gpt_service: GPTService = GPTService()
skyscanner_service: SkyscannerService = SkyscannerService()
# search_service: SearchService = SearchService()
plan_service: PlanService = PlanService(
    search_service=None,
    skyscanner_service=skyscanner_service,
    gpt_service=gpt_service,
)

festival_service: FestivalService = FestivalService()
