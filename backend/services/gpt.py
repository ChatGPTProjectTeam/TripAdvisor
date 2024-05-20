from openai import OpenAI

from backend.prompts import SYSTEM_PROMPT_CREATE, SYSTEM_PROMPT_EDIT
from backend.dtos import TripInfo
from backend.settings import settings


class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)

    def generate_activities(self, trip_info: TripInfo, search_result: str) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE.format(
                        mbti=trip_info.mbti,
                        province=trip_info.province,
                        days=trip_info.days,
                        start_date=trip_info.start_date,
                        trip_member_num=trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text,
                    ),
                }
            ],
            temperature=0.6,
        )

        return response.choices[0].message.content

    def edit_activity(
        self, previous_activity: str, message: str
    ) -> str:  # 기존 활동 string 유저 메세지에 따라 수정하는 함수 구현
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_EDIT},
                {"role": "assistant", "content": previous_activity},
                {"role": "user", "content": message},
            ],
            temperature=0.6,
        )

        return response.choices[0].message.content
