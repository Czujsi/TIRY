from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String)
    destination = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    distance_km = Column(Integer, default=0)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"))

    truck = relationship("Truck", back_populates="routes")
    driver = relationship("Driver", back_populates="routes")
