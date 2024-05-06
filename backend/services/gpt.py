from openai import OpenAI

from backend.dtos import TripInfo, UserInput
from backend.settings import settings
from backend.constants import SYSTEM_PROMPT_EDIT_1, SYSTEM_PROMPT_EDIT_2

# TODO: 프롬프트 잘 작성하기
SYSTEM_PROMPT = """
입력 값:
1. MBTI: {mbti}
2. 여행 지역: {province}
3. 여행 일수: {days}일
4. 여행 시작 날짜: {start_date}
5. 여행 인원 수: {trip_member_num}명
6. 여행 스타일: {trip_style_text}

제한 사항:
1. 각 활동은 하나의 문자열로 표현되어야 합니다.
2. 외래어를 제외하고 모든 텍스트는 한국어로 제공되어야 합니다.
3. 식사 및 음식 관련 활동은 포함하지 않습니다.
4. 야스쿠니 신사 방문은 제외합니다.
5. 활동은 명사로 끝맺어야 합니다.
6. 출력 텍스트에 markdown 형식을 적용해야 합니다.
7. 활동 간의 이동에 필요한 수단을 명사로 추천해야 합니다.

입력 값 활용:
1. 사용자의 MBTI에 맞는 활동을 추천해야 합니다.
2. 여행은 지정된 여행 지역 내에서만 이루어집니다.
3. 여행 일정은 하루마다 오직 세 개의 활동(오전/오후/저녁)으로만 구성됩니다.
4. 여행 시작 날짜와 기간을 고려하여 특별 이벤트가 있는 경우 해당 이벤트를 반영합니다.
5. 제공되는 활동은 여행 인원 수를 고려합니다.
6. 하루 중 최소 한 번은 여행 스타일과 관련된 활동을 포함해야 합니다.
7. 이동수단 추천은 지역 내 거리와 예상 이동 시간에 기반해 이루어집니다.

출력 예시:
**1일차 (2024년 5월 9일)
- 오전: {province} 평화 기념공원 방문 (추천 이동수단: 도보)
- 오후: {province} 성 탐방 (추천 이동수단: 트램)
- 저녁: {province} 야경을 감상할 수 있는 공원 방문 (추천 이동수단: 택시)

**2일차 (2024년 5월 10일)
- 오전: {province} 방문하여 이츠쿠시마 신사 탐방 (추천 이동수단: 페리)
- 오후: {province}에서 일본 문화 체험 (추천 이동수단: 도보)
- 저녁: {province}에서 석양 감상 (추천 이동수단: 도보)

**3일차 (2024년 5월 11일)
- 오전: {province} 시립 미술관 방문 (추천 이동수단: 트램)
- 오후: {province} 아쿠아리움에서 고래 시청 (추천 이동수단: 택시)
- 저녁: {province} 시내에서 쇼핑 (추천 이동수단: 도보)

출력 예시는 오직 예시일 뿐이니 사용자 입력 값만 생각하여 출력하시오.
"""

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
                    "content": SYSTEM_PROMPT.format(
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

    def edit_activities(self, previous_activities: str, message: str) -> str:
        """
        여행 정보를 바탕으로 여행 활동을 생성합니다.
        """
        response = self.openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role:": "system", "content": SYSTEM_PROMPT_EDIT_1},
                {"role:": "user", "content": previous_activities},
            ],
            temperature=0.6,
        )

        return response.choices[0].message.content

    # todo : DB에 저장할지 아니면 기존의 user응답과 prompt응답을 계속 주고 받을지 결정
