from pydantic import BaseModel,EmailStr
from datetime import date, time, datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    username: Optional[str] = None

class UserLogin(UserBase):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    username: Optional[str] = None

    class Config:
        orm_mode = True

class PatientBase(BaseModel):
    name: str
    age:int
    gender:str
    mobile: str
    email: str
    address:str
    medical_history:str
    policy_no:str
    emergency_contact:str

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
       from_attributes = True

class PatientUpdate(PatientBase):
    pass

class AppointmentBase(BaseModel):
    details: str
    patient_id: int
    appointment_date: date
    appointment_time: time

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: int

    class Config:
        from_attributes = True

class PaymentBase(BaseModel):
    amount: float

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(PaymentBase):
    pass

class Payment(PaymentBase):
    payment_method_id: int

    class Config:
        from_attributes = True