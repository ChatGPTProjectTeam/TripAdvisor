from openai import OpenAI

from backend.dtos import TripInfo
from backend.settings import settings

# TODO: 프롬프트 잘 작성하기
SYSTEM_PROMPT = """
너는 여행에서 할 활동들을 추천해주어야해.

여행에 대한 정보는 아래와 같아.
1. 여행지: {province}
2. 여행 시작 날짜: {start_date}
3. 여행 일수: {days}
4. 여행 스타일: {trip_style_text}

(여행 일수) * (아침/점심/저녁) 개수만큼의 활동을 추천해야해 
활동마다 '\n'으로 구분해줘.
"""


class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)

    def generate_activities(self, trip_info: TripInfo) -> list[str]:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT.format(
                        province=trip_info.province,
                        start_date=str(trip_info.start_date),
                        days=trip_info.days,
                        trip_style_text=trip_info.trip_style_text,
                    ),
                },
            ],
        )
        """
        GPT 에서 내려주는 활동의 개수와 실제 일정의 개수가 다른 경우 처리가 필요함    
        """
        return [
            activity
            for activity in response.choices[0].message.content.split("\n")
            if activity
        ]
