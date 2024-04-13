서버 로직
api/v1/plan : 호출했을 때

1. startDate, days, province, tripMemberNum 기반으로 skyscanner 조회
2. skyscanner 조회 결과에서 항공 일정, 숙소 일정 정하기
3. RAG 활용하여 일정 정하기 (vector DB + prompt)
4. province 기반으로 식당 결정 (days 마다)