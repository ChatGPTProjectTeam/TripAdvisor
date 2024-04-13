from fastapi import FastAPI

from dtos import TripInfo, TripPlan
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()


@app.post("/api/v1/plans")
def create_plan(trip_info: TripInfo) -> TripPlan:
    from backend.services import plan_service

    return plan_service.create_plan(trip_info)


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, trip_info: TripInfo):
    return {}
