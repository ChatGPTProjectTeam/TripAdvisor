from elasticsearch_dsl import (
    Document,
    Text,
    DenseVector,
    Keyword,
    Float,
    analyzer,
    tokenizer,
)

from backend.constants import INDEX_NAME


korean_analyzer = analyzer(
    "default_nori_analyzer",
    type="custom",
    tokenizer=tokenizer(
        "default_nori_tokenizer",
        type="nori_tokenizer",
        decompound_mode="mixed",
    ),
    filter=[
        "nori_part_of_speech",
        "nori_readingform",
        "lowercase",
    ],
)


class JapanTravelDestination(Document):
    name = Text()
    description = Text(analyzer=korean_analyzer, fields={"raw": Keyword()})
    province = Text()
    categories = Keyword(multi=True)
    image_url = Text()
    feature_vector = DenseVector(dims=768)
    lat = Float()
    lon = Float()

    class Index:
        name = INDEX_NAME
