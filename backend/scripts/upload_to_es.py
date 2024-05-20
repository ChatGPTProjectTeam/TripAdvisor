import json
import sys

from backend.es.documents import JapanTravelDestination
from backend.services import search_service


def get_province(file_path: str) -> str:
    province = file_path.split("_")[0]
    if province == "도쿄":
        return "간토 지방"
    elif province == "오사카":
        return "간사이 지방"
    raise ValueError("Invalid province")


def get_description(_data: dict) -> str:
    return (_data["dictInfo"]["description"] or "") or _data["descriptionInfo"][
        "publisher"
    ]


if __name__ == "__main__":
    file_path = sys.argv[1]
    f = open(file_path)
    trip_data = json.load(f)
    JapanTravelDestination._index.delete()
    JapanTravelDestination.init()
    # Search(index="japan_travel_destination").query().delete()
    for data in trip_data:
        name = data["nameKo"]
        description = get_description(data)
        vector = search_service.get_vector(name + " " + description)
        province = get_province(file_path)

        JapanTravelDestination(
            name=name,
            description=description,
            province=province,
            feature_vector=list(vector),
        ).save()
