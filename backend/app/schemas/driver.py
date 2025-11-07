from pydantic import BaseModel
from typing import Optional

class DriverCreate(BaseModel):
    full_name: str
    license_number: Optional[str]
    phone: Optional[str]
    company_id: Optional[int]

class DriverOut(BaseModel):
    id: int
    full_name: str
    license_number: Optional[str]
    phone: Optional[str]
    company_id: Optional[int]

    class Config:
        orm_mode = True
