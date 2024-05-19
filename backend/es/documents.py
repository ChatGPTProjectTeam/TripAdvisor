from elasticsearch_dsl import Document, Text, DenseVector

from backend.constants import INDEX_NAME


class JapanTravelDestination(Document):
    name = Text()
    description = Text()
    feature_vector = DenseVector(dims=768)

    class Index:
        name = INDEX_NAME


JapanTravelDestination.init()
