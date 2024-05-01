from fastapi import FastAPI

from backend.dtos import TripInfo, TripPlan, PlaneInfo
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

@app.post("/api/v1/plane")
def create_plane(trip_info: TripInfo) -> PlaneInfo:
    from backend.services import skyscanner_service
    
    return skyscanner_service.create_plane_info(trip_info)