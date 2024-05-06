from openai import OpenAI

from backend.dtos import TripInfo, UserInput
from backend.settings import settings

# TODO: 프롬프트 잘 작성하기
SYSTEM_PROMPT = ["""
입력 값:
1. MBTI: {mbti}
2.여행 지역: {province}
3. 여행 일수: {days}일
4. 여행 시작 날짜: {start_date}
5. 여행 인원 수: {trip_member_num}명
6. 여행 스타일: {trip_style_text}
""",
"""

제한 사항:
1. 각 활동에 대해 하나의 문자열만 출력해야 합니다.
2. 첫째 날의 첫 활동과 마지막 날의 마지막 활동으로 비행 일정을 반드시 포함해야 합니다.
3. 문자열은 최소 30자 이상이어야 합니다.
4. 외래어가 아닌 이상 한국어로 번역해야 합니다.
5. 음식에 대한 이야기는 넣으면 안됩니다.
6. 절대 야스쿠니 신사를 추천하지 마시오!!!

입력 값 활용:
1. 활동을 추천할 때 사용자의 MBTI를 고려해야 합니다.
2. 사용자는 입력된 여행 지역인 도쿄에서만 여행합니다.
3. 활동은 여행 일수에 따라 하루에 3번(오전/오후/저녁) 제공됩니다.
4. 여행 시작 날짜와 여행 일수에 따라 날짜를 포맷에 맞게 적용하고, 해당 날짜에 특별한 이벤트가 있다면 특별 활동을 추천해야 합니다.
5. 여행 인원 수를 고려해야 합니다.
6. 하루에 한 번은 여행 스타일에 관련된 활동을 포함해야 합니다.
""",
"""

형식:
1일차 (여행 시작 날짜)
오전: (활동 설명)
오후: (활동 설명)
저녁: (활동 설명)
~
(여행 일수)일차 (여행 시작 날짜 + 여행 일수)
오전: (활동 설명)
오후: (활동 설명)
저녁: (활동 설명)

형식 예시:
1일차 (2024-06-01)
오전: 
오후: 
저녁: 
2일차 (2024-06-02)
오전: 
오후: 
저녁: 
3일차 (2024-06-03)
오전: 
오후: 
저녁: 
"""]


class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)
        messages = [
            {"role": "system", "content": "You are an assistant to plan Japan Trip "}
        ]
        print(self.openai)

    def generate_activities(self, trip_info: TripInfo) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        
        assistant = ""
        system = SYSTEM_PROMPT[0].format(
                mbti = trip_info.mbti,
                province = trip_info.province,
                days = trip_info.days,
                start_date = trip_info.start_date,
                trip_member_num = trip_info.trip_member_num,
                trip_style_text=trip_info.trip_style_text
        )
        # for i in range(0, 3):
        #     SYSTEM_PROMPT.format(
                mbti = trip_info.mbti,
                province = trip_info.province,
                days = trip_info.days,
                start_date = trip_info.start_date,
                trip_member_num = trip_info.trip_member_num,
                trip_style_text=trip_info.trip_style_text,
        #     ).split(-)[i]
        for i in range(0, 3):
            if i == 0:
                response = self.openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {
                            "role": "system",
                            "content": system,
                        },
                    ],
                )
            else:
                response = self.openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {
                            "role": "assistant",
                            "content": assistant
                            "role": "system",
                            "content": system + SYSTEM_PROMPT[i],
                        },
                    ],
                )
            assistant = response.choices[0].message.content

        return assistant

    def edit_activities(self, previous_activities: str, message: str) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[],
        )
        """
        GPT 에서 내려주는 활동의 개수와 실제 일정의 개수가 다른 경우 처리가 필요함    
        """
        return response.choices[0].message.content

    def user_msg(self, user_input: UserInput):
        # 아래 코드는 프론트 단에서 입력한 정보 받아오는 것으로 바꾸기

        # GPT에서 응답이 오도록 하는 부분
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": user_input.msg}
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
