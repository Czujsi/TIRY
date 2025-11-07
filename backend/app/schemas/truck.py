from pydantic import BaseModel
from typing import Optional

class TruckCreate(BaseModel):
    vin: str
    registration_number: str
    brand: Optional[str]

class TruckOut(BaseModel):
    id: int
    vin: str
    registration_number: str
    brand: Optional[str]

    class Config:
        orm_mode = True
