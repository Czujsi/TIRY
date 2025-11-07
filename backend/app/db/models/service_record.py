from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.db.base import Base

class ServiceRecord(Base):
    __tablename__ = "service_records"

    id = Column(Integer, primary_key=True, index=True)
    performed_at = Column(DateTime)
    notes = Column(String)
    cost = Column(Float, default=0.0)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    maintenance_id = Column(Integer, ForeignKey("maintenances.id"))

    truck = relationship("Truck")
    maintenance = relationship("Maintenance", back_populates="service_records")
