from sqlalchemy import Column, Integer, JSON

from backend.database import Base


class Plan(Base):
    __tablename__ = "plan"

    plan_id = Column(Integer, primary_key=True)
    plan_info = Column(JSON)
