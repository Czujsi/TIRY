from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    message = Column(String)
    created_at = Column(DateTime)
    acknowledged = Column(Boolean, default=False)

    truck_id = Column(Integer, ForeignKey("trucks.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    truck = relationship("Truck", back_populates="alerts")
    user = relationship("User", back_populates="alerts")
