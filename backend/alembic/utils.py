from datetime import datetime
import pytz


def get_now() -> datetime:
    korea_time_zone = pytz.timezone("Asia/Seoul")
    return datetime.now(korea_time_zone)
