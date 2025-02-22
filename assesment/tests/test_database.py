import pytest
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

# Test inserting into the database
def test_insert_database(test_db):
    new_entry = DataModel(name="Test Entry", value=99.9)
    test_db.add(new_entry)
    test_db.commit()
    retrieved_entry = test_db.query(DataModel).first()
    assert retrieved_entry is not None
    assert retrieved_entry.name == "Test Entry"
    assert retrieved_entry.value == 99.9