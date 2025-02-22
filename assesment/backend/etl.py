import requests
import pandas as pd
from sqlalchemy.orm import Session
from .database import get_db
from .models import DataModel

API_URL = "https://api.example.com/data"  # Replace with actual API endpoint

def fetch_data():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()
    return []

def transform_data(raw_data):
    df = pd.DataFrame(raw_data)
    df = df.rename(columns={"api_name": "name", "api_value": "value"})
    df.dropna(inplace=True)
    return df.to_dict(orient="records")

def load_data(db: Session, transformed_data):
    for row in transformed_data:
        new_entry = DataModel(name=row['name'], value=row['value'])
        db.add(new_entry)
    db.commit()

def run_etl():
    db = next(get_db())
    raw_data = fetch_data()
    if raw_data:
        transformed_data = transform_data(raw_data)
        load_data(db, transformed_data)
        return {"message": "ETL process completed successfully"}
    return {"message": "No data retrieved"}
