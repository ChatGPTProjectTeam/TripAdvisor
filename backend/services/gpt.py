from openai import OpenAI

from backend.dtos import TripInfo, UserInput
from backend.settings import settings
from backend.constants import SYSTEM_PROMPT_EDIT, SYSTEM_PROMPT_EDIT_1, SYSTEM_PROMPT_EDIT_2, SYSTEM_PROMPT_CREATE

# TODO: 프롬프트 잘 작성하기

class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)
        print(self.openai)

    def generate_activities(self, trip_info: TripInfo) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE.format(
                        mbti = trip_info.mbti,
                        province = trip_info.province,
                        days = trip_info.days,
                        start_date = trip_info.start_date,
                        trip_member_num = trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text,
                    ),
                }
            ],
            temperature=0.6,
        )
        
        return response.choices[0].message.content

    def edit_activity(self, previous_activity: str, message: str) -> str:
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

    # todo : DB에 저장할지 아니면 기존의 user응답과 prompt응답을 계속 주고 받을지 결정
