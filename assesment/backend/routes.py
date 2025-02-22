from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .models import DataModel

router = APIRouter()

# Route to fetch all data
@router.get("/data", response_model=list[DataModel])
def get_data(db: Session = Depends(get_db)):
    return db.query(DataModel).all()

# Route to insert new data
@router.post("/data")
def create_data(name: str, value: float, db: Session = Depends(get_db)):
    new_entry = DataModel(name=name, value=value)
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

# Route to delete data by ID
@router.delete("/data/{data_id}")
def delete_data(data_id: int, db: Session = Depends(get_db)):
    entry = db.query(DataModel).filter(DataModel.id == data_id).first()
    if entry:
        db.delete(entry)
        db.commit()
        return {"message": "Deleted successfully"}
    return {"error": "Data not found"}
