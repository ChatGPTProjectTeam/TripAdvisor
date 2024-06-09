from backend.database import SessionLocal
from typing import Optional, TYPE_CHECKING
from backend.dtos import TripInfo
from backend.models import FestivalInfo

from datetime import date, timedelta

class FestivalService:
    
    def get_festival_info(
        self, trip_info: TripInfo
    ) -> Optional[FestivalInfo]:
        province = trip_info.province
        start:date = trip_info.start_date
        # end:date = trip_info.start_date + timedelta(days=trip_info.days)
        
        with SessionLocal() as session:
            month = start.month
            festival = (
                session.query(FestivalInfo)
                .filter(FestivalInfo.province == province, FestivalInfo.month == month)
                .first()
            )

        if not festival:
            return None

        return festival