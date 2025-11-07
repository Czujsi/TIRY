from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class FuelLog(Base):
    __tablename__ = "fuel_logs"

    id = Column(Integer, primary_key=True, index=True)
    liters = Column(Float)
    cost = Column(Float)
    recorded_at = Column(DateTime)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"))

    truck = relationship("Truck", back_populates="fuel_logs")
    driver = relationship("Driver", back_populates="fuel_logs")
