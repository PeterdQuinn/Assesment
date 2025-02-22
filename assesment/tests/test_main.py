import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

# Test API health check
def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

# Test fetching data (should be empty initially)
def test_get_data_empty():
    response = client.get("/data")
    assert response.status_code == 200
    assert response.json() == []

# Test inserting data
def test_insert_data():
    response = client.post("/data", json={"name": "Test Item", "value": 42.5})
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["name"] == "Test Item"
    assert json_response["value"] == 42.5

# Test fetching data after insertion
def test_get_data():
    client.post("/data", json={"name": "Test Item", "value": 42.5})
    response = client.get("/data")
    assert response.status_code == 200
    assert len(response.json()) > 0
