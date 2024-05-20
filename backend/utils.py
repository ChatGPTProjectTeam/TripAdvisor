from backend.constants import SEARCH_ENABLED_PROVINCES


def is_search_enabled_province(province: str) -> bool:
    """
    해당 지역이 검색 가능한 지역인지 확인합니다.
    """
    return province in SEARCH_ENABLED_PROVINCES


def get_category(category: str) -> str:
    if category in [
        "랜드마크",
        "건물",
        "컨벤션 센터",
        "성곽",
        "지역",
        "정원",
        "전망시설",
        "성지",
        "관광센터",
        "경관산책로",
        "인터내셔널",
        "자연야생지역",
        "해변",
        "섬",
    ]:
        return "관광"
    if "역사" in category or category in "유적산책로":
        return "역사"
    if category in [
        "시장",
        "커피숍",
        "카페",
        "가이세키 요리",
        "수프",
        "중국식",
        "바베큐",
        "스테이크하우스",
        "스시",
        "펍",
        "해산물",
        "패스트푸드",
        "아시아 요리",
        "일본식",
        "그릴",
        "브루 펍",
        "피자",
    ]:
        return "음식"
    if category in [
        "전문상점",
        "백화점",
        "쇼핑몰",
        "어린이박물관",
        "전문박물관",
    ]:
        return "쇼핑"
    if category in [
        "공공기관",
        "미술관",
        "공원",
        "도서관",
        "과학박물관",
        "극장",
        "역사박물관",
        "동물원",
        "스포츠시설",
        "수족관",
    ]:
        return "문화"
    return f"NO CATEGORY - {category}"
