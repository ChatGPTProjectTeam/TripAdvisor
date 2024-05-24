from openai import OpenAI

from backend.prompts import (
    SYSTEM_PROMPT_CREATE_1,
    SYSTEM_PROMPT_CREATE_2,
    SYSTEM_PROMPT_CREATE_3,
    ASSISTANT_PROMPT_CREATE_1,
    ASSISTANT_PROMPT_CREATE_2,
    
    SYSTEM_PROMPT_CREATE_WITH_SEARCH_1,
    SYSTEM_PROMPT_CREATE_WITH_SEARCH_2,
    SYSTEM_PROMPT_CREATE_WITH_SEARCH_3,
    ASSISTANT_PROMPT_CREATE_WITH_SEARCH_1,
    ASSISTANT_PROMPT_CREATE_WITH_SEARCH_2,
    
    SYSTEM_PROMPT_EDIT_1,
    SYSTEM_PROMPT_EDIT_2,
    SYSTEM_PROMPT_EDIT_3,
    SYSTEM_PROMPT_EDIT_4,
    ASSISTANT_PROMPT_EDIT_1,
    ASSISTANT_PROMPT_EDIT_2,
    ASSISTANT_PROMPT_EDIT_3,
    USER_PROMPT_EDIT_1,
    USER_PROMPT_EDIT_2,
    
    SYSTEM_PROMPT_EDIT_WITH_SEARCH_1,
    SYSTEM_PROMPT_EDIT_WITH_SEARCH_2,
    SYSTEM_PROMPT_EDIT_WITH_SEARCH_3,
    SYSTEM_PROMPT_EDIT_WITH_SEARCH_4,
    ASSISTANT_PROMPT_EDIT_WITH_SEARCH_1,
    ASSISTANT_PROMPT_EDIT_WITH_SEARCH_2,
    ASSISTANT_PROMPT_EDIT_WITH_SEARCH_3,
    USER_PROMPT_EDIT_WITH_SEARCH_1,
    USER_PROMPT_EDIT_WITH_SEARCH_2
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
        
        categories_str = ", ".join(trip_info.categories)
        if search_result:
            messages = [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_WITH_SEARCH_1
                },
                {
                    "role": "assistant",
                    "content": ASSISTANT_PROMPT_CREATE_WITH_SEARCH_1,
                },
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_WITH_SEARCH_2,
                },
                {
                    "role": "assistant",
                    "content": ASSISTANT_PROMPT_CREATE_WITH_SEARCH_2,
                },
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_WITH_SEARCH_3.format(
                        categories=categories_str,
                        province=trip_info.province,
                        days=trip_info.days,
                        start_date=trip_info.start_date,
                        trip_member_num=trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text,
                        travel_sites=search_result
                    ),                
                }  
            ] 
        else:
            messages = [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_1
                },
                {
                    "role": "assistant",
                    "content": ASSISTANT_PROMPT_CREATE_1,
                },
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_2,
                },
                {
                    "role": "assistant",
                    "content": ASSISTANT_PROMPT_CREATE_2,
                },
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT_CREATE_3.format(
                        categories=categories_str,
                        province=trip_info.province,
                        days=trip_info.days,
                        start_date=trip_info.start_date,
                        trip_member_num=trip_info.trip_member_num,
                        trip_style_text=trip_info.trip_style_text
                    ),                
                }  
            ]
            

        response = self.openai.chat.completions.create(
            model="gpt-4o",
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

        if search_query:
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_WITH_SEARCH_1},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_WITH_SEARCH_1},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_WITH_SEARCH_2},
                {"role": "user", "content": USER_PROMPT_EDIT_WITH_SEARCH_1},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_WITH_SEARCH_2},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_WITH_SEARCH_3},
                {"role": "user", "content": USER_PROMPT_EDIT_WITH_SEARCH_2},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_WITH_SEARCH_3},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_WITH_SEARCH_4.format(travel_sites=search_query)},
                {"role": "assistant", "content": previous_activity},
                {"role": "user", "content": message},
            ]
        else:
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_1},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_1},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_2},
                {"role": "user", "content": USER_PROMPT_EDIT_1},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_2},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_3},
                {"role": "user", "content": USER_PROMPT_EDIT_2},
                {"role": "assistant", "content": ASSISTANT_PROMPT_EDIT_3},
                {"role": "system", "content": SYSTEM_PROMPT_EDIT_4},
                {"role": "assistant", "content": previous_activity},
                {"role": "user", "content": message},
            ]
        
        response = self.openai.chat.completions.create(
            model="gpt-4o",
            messages=messages,
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