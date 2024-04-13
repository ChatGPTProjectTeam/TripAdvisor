from fastapi import FastAPI

from dtos import TripInfo

app = FastAPI()


@app.post("/api/v1/plans")
def create_plan(trip_info: TripInfo):
    return {}


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, trip_info: TripInfo):
    return {}
