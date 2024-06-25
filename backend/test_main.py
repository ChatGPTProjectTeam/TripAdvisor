import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_plans():
    response = client.get("/api/v1/plans")
    assert response.status_code == 200
    assert "plan_list" in response.json()

def test_get_plan_success():
    plan_id = 1
    response = client.get(f"/api/v1/plan/{plan_id}")
    assert response.status_code == 200
    assert "id" in response.json() and response.json()["id"] == plan_id

def test_get_plan_not_found():
    plan_id = 9999
    response = client.get(f"/api/v1/plan/{plan_id}")
    assert response.status_code == 404
    assert response.json() == {"detail": "존재하지 않는 plan 입니다."}

def test_create_plan():
    form_request_dto = {
        "trip_name": "Test Trip",
        "destination": "Test Destination",
        "start_date": "2024-01-01",
        "end_date": "2024-01-10",

    }
    response = client.post("/api/v1/plans", json=form_request_dto)
    assert response.status_code == 200
    assert response.json() == {}

def test_edit_plan_success():
    user_content = {
        "plan_id": 1,
        "msg": "Updated message"
    }
    response = client.patch(f"/api/v1/plan/{user_content['plan_id']}", json=user_content)
    assert response.status_code == 200
    assert response.json() == False
def test_edit_plan_failure():
    user_content = {
        "plan_id": 9999,
        "msg": "Updated message"
    }
    response = client.patch(f"/api/v1/plan/{user_content['plan_id']}", json=user_content)
    assert response.status_code == 200
    assert response.json() == True
