from fastapi import FastAPI

from backend.dtos import TripInfo, TripPlan
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

messages = [
    {
        "role": "system", "content": "You are a kind helpful assistant"
    }
]


@app.post("/api/v1/plans")
def create_plan(trip_info: TripInfo) -> TripPlan:
    from backend.services import plan_service
    from backend.services import day_plan_service
    return day_plan_service.create_subplan_activities(trip_info)
    # return plan_service.create_plan(trip_info)


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, trip_info: TripInfo):
    return {}
