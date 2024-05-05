from dotenv import load_dotenv
from fastapi import FastAPI

from backend.dtos import (
    TripInfo,
    UserInput,
    FormRequestDTO,
    PlanListResponseDTO,
)

load_dotenv()
app = FastAPI()


@app.get("/api/v1/plans")
def get_plans() -> PlanListResponseDTO:
    return PlanListResponseDTO(plan_list=[])


@app.post("/api/v1/plans")
def create_plan(form_request_dto: FormRequestDTO):
    from backend.services import day_plan_service

    trip_info = TripInfo.from_form_request_dto(form_request_dto)
    day_plan_service.create_subplan_activities(trip_info)
    return {}


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, msg: str):
    return {}


@app.post("/")
async def input_send(user_content: UserInput):
    from backend.services import gpt_service

    messages = [{"role": "system", "content": "You are a kind helpful assistant"}]
    user_msg = ""

    answer = gpt_service.user_msg(user_content)
    user_msg = user_content.msg
    print(type(answer))
    messages.append(
        {"role": "user", "content": user_msg},
    )
    messages.append(
        {"role": "assistant", "content": answer},
    )
    return messages
