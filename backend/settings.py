from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings

load_dotenv()


class ProjectSettings(BaseSettings):
    OPENAI_API_KEY: str = Field(..., env="OPENAI_API_KEY")
    SQLALCHEMY_DATABASE_URL: str = Field(..., env="SQLALCHEMY_DATABASE_URL")
    SKYSCANNER_API_KEY: str = Field(..., env="SKYSCANNER_API_KEY")
    ELASTIC_CLUSTER_ENDPOINT: str = Field("", env="ELASTIC_CLUSTER_ENDPOINT")
    ELASTIC_PASSWORD: str = Field("", env="ELASTIC_PASSWORD")


settings = ProjectSettings()
