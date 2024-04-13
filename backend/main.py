from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/v1/plans")
def create_plan():
    return {}


@app.patch("/api/v1/plan/{plan_id}")
def read_item(plan_id: int, q: Union[str, None] = None):
    return {}
