import sentry_sdk
from dotenv import load_dotenv
from fastapi import FastAPI

from backend.dtos import (
    TripInfo,
    FormRequestDTO,
    PlanListResponseDTO,
)

load_dotenv()
sentry_sdk.init(
    dsn="https://f956c56aef0dfa46632c832796a33db2@o4504143506571264.ingest.us.sentry.io/4507214759460864",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
    # We recommend adjusting this value in production.
    profiles_sample_rate=1.0,
)

app = FastAPI()


@app.get("/api/v1/plans")
def get_plans() -> PlanListResponseDTO:
    from backend.services import plan_service

    plan_list = plan_service.get_plans()

    return PlanListResponseDTO(plan_list=plan_list)


@app.post("/api/v1/plans")
def create_plan(form_request_dto: FormRequestDTO):
    from backend.services import plan_service

    trip_info = TripInfo.from_form_request_dto(form_request_dto)
    plan_service.initiate_plan(trip_info)
    return {}


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, msg: str):
    from backend.services import plan_service

    plan_service.update_plan(plan_id, msg)
    return {}
