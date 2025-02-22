from sqlalchemy import Column, Integer, String, Float
from .database import Base

# Example Data Model
class DataModel(Base):
    __tablename__ = "data_table"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    value = Column(Float)
    
# Additional models can be added here as needed
