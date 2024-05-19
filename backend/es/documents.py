from elasticsearch_dsl import Document, Text, DenseVector
from elasticsearch_dsl import connections

from backend.settings import settings


class JapanTravelDestination(Document):
    name = Text()
    description = Text()
    feature_vector = DenseVector(dims=768)

    class Index:
        name = "tripper.japan_travel_destination"


JapanTravelDestination.init()
