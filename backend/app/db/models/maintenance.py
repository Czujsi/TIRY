from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base


class Maintenance(Base):
    __tablename__ = "maintenances"

    id = Column(Integer, primary_key=True, index=True)
    scheduled_date = Column(DateTime)
    description = Column(String)
    completed = Column(Boolean, default=False)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    truck = relationship("Truck", back_populates="maintenances")
    service_records = relationship("ServiceRecord", back_populates="maintenance")
