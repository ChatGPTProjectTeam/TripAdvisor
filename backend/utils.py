from backend.constants import SEARCH_ENABLED_PROVINCES


def is_search_enabled_province(province: str) -> bool:
    """
    해당 지역이 검색 가능한 지역인지 확인합니다.
    """
    return province in SEARCH_ENABLED_PROVINCES
