import torch
from elasticsearch_dsl import Search, Q
from elasticsearch_dsl import connections
from transformers import BertModel, BertTokenizer

from backend.constants import INDEX_NAME
from backend.settings import settings


class SearchService:
    tokenizer: BertTokenizer
    model: BertModel

    def __init__(self):
        connections.create_connection(
            hosts=[settings.ELASTIC_CLUSTER_ENDPOINT],
            http_auth=("elastic", settings.ELASTIC_PASSWORD),
            timeout=20,
        )
        self.tokenizer = BertTokenizer.from_pretrained("snunlp/KR-BERT-char16424")
        self.model = BertModel.from_pretrained("snunlp/KR-BERT-char16424")

    def search_category(self, categories: list[str], province: str) -> str:
        s = Search(index=INDEX_NAME).query(
            Q("match", province=province) & Q("terms", category=categories)
        )[:10]
        response = s.execute()
        result = ""
        for hit in response:
            result += (
                f"추천 여행지 TITLE: {hit.name}, "
                f"DESCRIPTION: {hit.description}, "
                f"LAT: {hit.lat}, LONG: {hit.lat}, "
            )
            result += f"여행지 사진: {hit.image_url}\n" if hit.image_url else "\n"
        return result

    def search_query(self, query: str, province: str) -> str:
        """
        텍스트를 검색합니다.
        """
        query_vector = self.get_vector(query)
        s = Search(index=INDEX_NAME).query(
            "script_score",
            query=Q("match", province=province),
            script={
                "source": "cosineSimilarity(params.query_vector, 'feature_vector') + 1.0",
                "params": {"query_vector": query_vector},
            },
        )[:2]
        response = s.execute()
        result = ""
        for hit in response:
            result += f"추천 여행지 TITLE: {hit.name}, DESCRIPTION: {hit.description}\n"
        return result

    def get_vector(self, text: str) -> list[float]:
        # 텍스트를 토크나이저로 인코딩
        inputs = self.tokenizer(
            text, return_tensors="pt", truncation=True, max_length=512
        )
        # 모델에 인코딩된 입력 제공
        with torch.no_grad():
            outputs = self.model(**inputs)
        # [CLS] 토큰의 벡터를 반환
        return list(outputs.last_hidden_state[0, 0].numpy())
