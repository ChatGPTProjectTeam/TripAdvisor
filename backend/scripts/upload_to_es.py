import json
import sys
from contextlib import suppress

from backend.constants import INDEX_NAME
from backend.es.documents import JapanTravelDestination
from backend.services import search_service
from backend.utils import get_category
from elasticsearch_dsl import Search


def get_province(file_path: str) -> str:
    province = file_path.split("_")[0]
    if province == "도쿄":
        return "간토 지방"
    elif province == "오사카":
        return "간사이 지방"
    elif province == "오키나와":
        return "규슈/오키나와"
    raise ValueError("Invalid province")


def get_description(_data: dict) -> str:
    return (
        (_data["dictInfo"]["description"] or "")
        or (_data["descriptionInfo"]["publisher"] or "")
        or (_data["descriptionInfo"]["legacy"] or "")
    )


category_set = set()

if __name__ == "__main__":
    with suppress(Exception):
        JapanTravelDestination._index.delete()
        Search(index=INDEX_NAME).query().delete()
        JapanTravelDestination.init()
    for i in range(1, len(sys.argv)):
        file_path = sys.argv[i]
        f = open(file_path)
        trip_data = json.load(f)

        for data in trip_data:
            name = data["nameKo"]
            if not name:
                continue
            location = data["location"]
            if not location:
                continue
            lat = location["lat"]
            lon = location["lon"]

            description = get_description(data)
            vector = search_service.get_vector(name + " " + description)
            province = get_province(file_path)
            for subCa in data["subCategory"]:
                category_set.add(get_category(subCa["nameKo"]))
            JapanTravelDestination(
                name=name,
                description=description,
                province=province,
                feature_vector=list(vector),
                category=list(
                    set(
                        [get_category(subCa["nameKo"]) for subCa in data["subCategory"]]
                    )
                ),
                image_url=data["image"]["photoURL"] if data["image"] else "",
                lat=lat,
                lon=lon,
            ).save()
