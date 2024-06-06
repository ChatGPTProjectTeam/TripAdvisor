import sentry_sdk
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import Plan,Base
from backend.dtos import (
    TripInfo,
    FormRequestDTO,
    PlanListResponseDTO,
    PlanDTO,
    UserInput,
    FestivalDTO,
)
from backend.settings import settings

"""new import"""
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

load_dotenv()
sentry_sdk.init(
    dsn="https://f956c56aef0dfa46632c832796a33db2@o4504143506571264.ingest.us.sentry.io/4507214759460864",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    # Set profiles_sample_rate to 1.0 to profile 100%
    # of sampled transactions.
)
app = FastAPI()
# 모든 출처에서 모든 메소드를 허용하는 CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인에서의 요청 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드
    profiles_sample_rate=1.0,
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

if settings.ELASTIC_CLUSTER_ENDPOINT and settings.ELASTIC_PASSWORD:
    from elasticsearch_dsl import connections

    connections.create_connection(
        hosts=[settings.ELASTIC_CLUSTER_ENDPOINT],
        http_auth=("elastic", settings.ELASTIC_PASSWORD),
    )


@app.get("/api/v1/plans")
def get_plans() -> PlanListResponseDTO:
    from backend.services import plan_service

    plan_list = plan_service.get_plans()

    return PlanListResponseDTO(plan_list=plan_list)


@app.get("/api/v1/plan/{plan_id}")
def get_plan(plan_id: int) -> PlanDTO:
    from backend.services import plan_service

    return plan_service.get_plan(plan_id)


@app.post("/api/v1/plans")
def create_plan(form_request_dto: FormRequestDTO, trigger_skyscanner: bool = True):
    from backend.services import plan_service

    trip_info = TripInfo.from_form_request_dto(form_request_dto)
    plan_service.initiate_plan(trip_info, trigger_skyscanner)
    return {}


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(user_content: UserInput) -> bool:
    from backend.services import plan_service

    if plan_service.update_plan(user_content.plan_id, user_content.msg):
        return False
    else:
        return True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/v1/festival/{plan_id}")
from backend.services import festival_service
from backend.services import plan_service
def get_festival_info(
    plan_id: int, month: int, db: Session = Depends(get_db)
) -> FestivalDTO:

    # plan = db.query(Plan).filter(Plan.trip_plan_id == plan_id)
    plan = plan_service.get_plan(plan_id)

# component_type component_type
    festival_info = festival_service.get_festival_info(plan)
    if not festival_info:
        raise HTTPException(status_code=404, detail="Festival not found")

    return festival_info
