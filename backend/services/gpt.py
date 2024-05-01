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
        messages = [
            {"role": "system", "content": "You are an assistant to plan Japan Trip "}
        ]
        print(self.openai)

    def generate_activities(self, trip_info: TripInfo) -> list[str]:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
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

    def user_msg(self, user_input):
        #아래 코드는 프론트 단에서 입력한 정보 받아오는 것으로 바꾸기

        # GPT에서 응답이 오도록 하는 부분
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            # stream = True
        )
        # 출력한 값을 저장은 해야 하고, 값 출력은 이제 프론트 쪽에서 요청 시에 보내줘야 하는데 이때 별도의 rest api 호출 x
        chat = response.choices[0].message.content

        # for chunk in response :
        #     print( chunk.choices[0].delta.content )
        print(type(chat))
        return chat
        # todo : DB에 저장할지 아니면 기존의 user응답과 prompt응답을 계속 주고 받을지 결정
