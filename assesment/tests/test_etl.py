import pytest
from backend.etl import fetch_data, transform_data, load_data
from backend.database import SessionLocal, Base, engine
from backend.models import DataModel

# Setup test database
@pytest.fixture(scope="function")
def test_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    Base.metadata.drop_all(bind=engine)

# Mock API response
def mock_api_response():
    return [{"api_name": "Test Data", "api_value": 123.4}]

# Test ETL transformation
def test_transform_data():
    raw_data = mock_api_response()
    transformed = transform_data(raw_data)
    assert transformed[0]["name"] == "Test Data"
    assert transformed[0]["value"] == 123.4

# Test ETL load into database
def test_load_data(test_db):
    raw_data = mock_api_response()
    transformed = transform_data(raw_data)
    load_data(test_db, transformed)
    retrieved_entry = test_db.query(DataModel).first()
    assert retrieved_entry is not None
    assert retrieved_entry.name == "Test Data"
    assert retrieved_entry.value == 123.4
