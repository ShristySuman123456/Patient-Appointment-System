from sqlalchemy.orm import Session
from models import Patient,Appointment 
from database import SessionLocal
from models import User
from passlib.context import CryptContext
import models, schemas


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, hashed_password=user.password, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_patient(db: Session, patient_id: int):
    return db.query(Patient).filter(Patient.id == patient_id).first()

def get_all_patients(db: Session):
    return db.query(Patient).all()

def get_appointment(db: Session, patient_id: int):
    return db.query(Appointment).filter(Appointment.patient_id == patient_id).first()


def get_all_appointments(db: Session):
    return db.query(models.Appointment).all()

def get_appointments_by_patient(db: Session,patient_id: int):
    return db.query(models.Appointment).filter(models.Appointment.patient_id == patient_id).all()

def create_patient(db: Session,name: str,age:int,gender:str, mobile: str, email: str,address:str,medical_history:str,policy_no:str,emergency_contact:str):

    new_patient = Patient(name=name,age=age,gender=gender, mobile=mobile, email=email,address=address,medical_history=medical_history,policy_no=policy_no,emergency_contact=emergency_contact)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    db_appointment = models.Appointment(
        details=appointment.details,
        patient_id=appointment.patient_id,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def update_patient(db: Session, patient_id: int, patient: schemas.PatientUpdate):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if db_patient:
        for key, value in patient.dict(exclude_unset=True).items():
            setattr(db_patient, key, value)
        db.commit()
        db.refresh(db_patient)
    return db_patient

def update_appointment(db: Session, appointment_id: int, appointment: schemas.AppointmentUpdate):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        for key, value in appointment.dict(exclude_unset=True).items():
            setattr(db_appointment, key, value)
        db.commit()
        db.refresh(db_appointment)
    return db_appointment

def delete_patient(db: Session, patient_id: int):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
    if db_patient:
        db.delete(db_patient)
        db.commit()
    return db_patient

def delete_appointment(db: Session, appointment_id: int):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        db.delete(db_appointment)
        db.commit()
    return db_appointment

def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(
        payment_method_id=payment.payment_method_id,
        amount=payment.amount
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payment(db: Session, payment_id: int):
    return db.query(models.Payment).filter(models.Payment.id == payment_id).first()

def update_payment(db: Session, payment_id: int, payment: schemas.PaymentUpdate):
    db_payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if db_payment:
        for attr, value in payment.dict(exclude_unset=True).items():
            setattr(db_payment, attr, value)
        db.commit()
        db.refresh(db_payment)
    return db_payment

def delete_payment(db: Session, payment_id: int):
    db_payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if db_payment:
        db.delete(db_payment)
        db.commit()
    return db_payment


db = SessionLocal()
patients = get_all_patients(db)
for patient in patients:
    print(patient.name,patient.mobile,patient.email,patient.age, patient.gender)  