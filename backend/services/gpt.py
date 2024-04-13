from openai import OpenAI

from backend.settings import settings


class GPTService:
    def __init__(self):
        self.openai = OpenAI(api_key=settings.OPENAI_API_KEY)

    def create_activities(self) -> str:
        response = self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
            ],
        )
        return response.choices[0].message.content
