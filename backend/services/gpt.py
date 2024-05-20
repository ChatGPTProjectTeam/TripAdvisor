from openai import OpenAI

from backend.prompts import (
    SYSTEM_PROMPT_CREATE,
    SYSTEM_PROMPT_EDIT,
    SYSTEM_PROMPT_CREATE_WITH_SEARCH,
    SYSTEM_PROMPT_EDIT_WITH_SEARCH,
)
from backend.dtos import TripInfo
from backend.settings import settings


class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)

    def generate_activities(self, trip_info: TripInfo, search_result: str) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        messages = [
            {
                "role": "system",
                "content": (
                    SYSTEM_PROMPT_CREATE_WITH_SEARCH.format(
                        mbti=trip_info.mbti,
                        province=trip_info.province,
                        days=trip_info.days,
                        start_date=trip_info.start_date,
                        trip_member_num=trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text,
                        travel_sites=search_result,
                    )
                    if search_result
                    else SYSTEM_PROMPT_CREATE.format(
                        mbti=trip_info.mbti,
                        province=trip_info.province,
                        days=trip_info.days,
                        start_date=trip_info.start_date,
                        trip_member_num=trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text,
                    )
                ),
            }
        ]

        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.6,
        )

        return response.choices[0].message.content

    def edit_activity(
        self, previous_activity: str, message: str, search_query: str
    ) -> str:  # 기존 활동 string 유저 메세지에 따라 수정하는 함수 구현
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """

        system_prompt = (
            SYSTEM_PROMPT_EDIT_WITH_SEARCH.format(travel_sites=search_query)
            if search_query
            else SYSTEM_PROMPT_EDIT
        )

        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "assistant", "content": previous_activity},
                {"role": "user", "content": message},
            ],
            temperature=0.6,
        )

        return response.choices[0].message.content
    
    def moderation(self, message: str) -> bool:
        moderation = self.openai.moderations.create(input=message)
        if moderation.results[0].flagged:
            return True
        else:
            return False

    # todo : DB에 저장할지 아니면 기존의 user응답과 prompt응답을 계속 주고 받을지 결정