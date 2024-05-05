from sqlalchemy import (
    Column,
    JSON,
    DateTime,
    String,
    Text,
    ForeignKey,
    Integer,
)
from sqlalchemy.orm import Mapped, relationship, mapped_column

from backend.database import Base


class Plan(Base):
    __tablename__ = "plan"

    plan_id = Column(Integer, primary_key=True)
    plan_info = Column(JSON)
    created_at = Column(DateTime)


class PlanComponent(Base):
    __tablename__ = "plan_component"

    component_id = Column(Integer, primary_key=True)
    component_type = Column(String(50))
    plan_id: Mapped[int] = mapped_column(ForeignKey("plan.plan_id"))
    plan: Mapped["Plan"] = relationship("Plan", back_populates="plan_component_list")
    plane_info_id = mapped_column(ForeignKey("plane_info.plane_info_id"))
    plane_info = relationship("PlaneInfo")
    accommodation_info_id = mapped_column(
        ForeignKey("accommodation_info.accommodation_info_id")
    )
    accommodation_info = relationship("AccommodationInfo")
    activity = Column(Text)


class AccommodationInfo(Base):
    __tablename__ = "accommodation_info"

    accommodation_info_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    stars = Column(String(100))
    lowest_price = Column(String(100))
    rating = Column(String(100))
    location = Column(String(100))


class PlaneInfo(Base):
    __tablename__ = "plane_info"

    plane_info_id = Column(Integer, primary_key=True)
    price = Column(String(100))
    origin = Column(String(100))
    destination = Column(String(100))
    departure = Column(String(100))
    arrival = Column(String(100))
    airline = Column(String(100))
