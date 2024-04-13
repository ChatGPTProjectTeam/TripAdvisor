from datetime import date

from backend.dtos import PlaneInfo, AccommodationInfo


class SkyscannerService:
    def get_plane_and_accommodation_info(
        self, province: str, days: int, start_date: date
    ) -> tuple[PlaneInfo, AccommodationInfo]:
        # TODO: 스카이스캐너 API를 이용해 실제 정보를 가져오기
        plane_info = PlaneInfo(
            departure="Seoul",
            arrival=province,
            airline="korean air",
        )
        accommodation_info = AccommodationInfo(
            name="Intercontinental Hotel",
            location=province,
            rating=4.5,
        )
        return plane_info, accommodation_info


x
