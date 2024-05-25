from sqlalchemy import Column, Integer, String,Float, ForeignKey, Date, Time
from sqlalchemy.orm import relationship
from base import Base



class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    age= Column(Integer)
    gender= Column(String(100))
    mobile = Column(String(15))
    email = Column(String(100))
    address= Column(String(255))
    medical_history= Column(String(255))
    policy_no= Column(String(255))
    emergency_contact= Column(String(100))
    
    # Relationship with appointments
    appointments = relationship("Appointment", back_populates="patient")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    details = Column(String(255))
    patient_id = Column(Integer, ForeignKey("patients.id"))
    appointment_date=Column(Date)
    appointment_time = Column(Time)
    

    # Relationship with patient
    patient = relationship("Patient", back_populates="appointments")

class Payment(Base):
    __tablename__ = "payment"

    payment_method_id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
   