from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.base import Base

class GPSDevice(Base):
    __tablename__ = "gps_devices"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, unique=True)
    lat = Column(Float, default=0.0)
    lon = Column(Float, default=0.0)
    last_seen = Column(DateTime)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    truck = relationship("Truck", back_populates="gps_device")
