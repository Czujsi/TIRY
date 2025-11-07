from sqlalchemy.orm import Session
from app.db.models.truck import Truck

def get_all_trucks(db: Session):
    return db.query(Truck).all()

def get_truck(db: Session, truck_id: int):
    return db.query(Truck).filter(Truck.id == truck_id).first()

def create_truck(db: Session, *, vin: str, registration_number: str, brand: str | None = None):
    t = Truck(vin=vin, registration_number=registration_number, brand=brand)
    db.add(t)
    db.commit()
    db.refresh(t)
    return t
