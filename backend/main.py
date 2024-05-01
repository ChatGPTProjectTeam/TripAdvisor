from typing import List

from fastapi import FastAPI

from backend.dtos import TripInfo, TripPlan, UserInput
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

messages = [
    {
        "role": "system", "content": "You are a kind helpful assistant"
    }
]
user_msg = ""

@app.post("/api/v1/plans")
def create_plan(trip_info: TripInfo) -> TripPlan:
    from backend.services import plan_service
    from backend.services import day_plan_service
    return day_plan_service.create_subplan_activities(trip_info)
    # return plan_service.create_plan(trip_info)


@app.patch("/api/v1/plan/{plan_id}")
def edit_plan(plan_id: int, trip_info: TripInfo):
    return {}


@app.post("/")
async def input_send(user_content: UserInput) :
    from backend.services import day_plan_service
    from backend.services import gpt_service
    from backend.services import plan_service
    answer = gpt_service.user_msg(user_content)
    user_msg = user_content.msg
    print(type(answer))
    messages.append(
            {
        "role":"user",
        "content": user_msg

    },)
    messages.append(
        {
            "role":"assistant",
            "content":answer
        },
    )
    print(answer)
    return messages
    # return {
    #     "code":"200",
    #         "msg":answer
    #         }
#
# @app.get("/api/chats")
# def