from fastapi import FastAPI, Depends,Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from crud import get_all_patients 
import uvicorn
import stripe
from schemas import Payment 
from typing import List,Optional
from database import SessionLocal, engine
import crud, models, database, schemas

stripe.api_key = "pk_test_51PEuDgSIqyVgoIp05WEc6gWU8Vi1yVbEPV7bdDG5K7Gi1XvuEElrKlTyoJIH78YUO1IUTEisywlVS9FrAhJHXmOx00OEaxhpTs"
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    except Exception as e:
        print(e)
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

@app.post("/patients/", response_model=schemas.Patient)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    return crud.create_patient(db,patient.name, patient.age, patient.gender, patient.mobile,patient.email, patient.address, patient.medical_history,patient.policy_no,patient.emergency_contact)
    #return crud.create_patient(name=patient.name, email=patient.email, db=db, mobile=patient.mobile)


@app.get("/patients/", response_model=List[schemas.Patient])
def read_patients(patient_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    if patient_id is not None:
        db_patient = crud.get_patient(db, patient_id=patient_id)
        if db_patient is None:
            raise HTTPException(status_code=404, detail="Patient not found")
        return [db_patient]  # Return as a list for consistency with the response model
    else:
        patients = crud.get_all_patients(db)
        # Ensure all fields are correctly populated, avoiding None values for non-nullable fields
        for patient in patients:
            if patient.age is None:
                patient.age = 0  # or handle appropriately
            if patient.gender is None:
                patient.gender = ""
            if patient.mobile is None:
                patient.mobile = ""
            if patient.email is None:
                patient.email = ""
            if patient.address is None:
                patient.address = ""
            if patient.medical_history is None:
                patient.medical_history = ""
            if patient.policy_no is None:
                patient.policy_no = ""
            if patient.emergency_contact is None:
                patient.emergency_contact = ""
        return patients



@app.post("/appointments/", response_model=schemas.Appointment)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    return crud.create_appointment(db,appointment=appointment)

@app.put("/patients/{patient_id}", response_model=schemas.Patient)
def update_patient(patient_id: int, patient: schemas.PatientUpdate, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    db_patient = crud.update_patient(db=db, patient_id=patient_id, patient=patient)
    return db_patient

@app.delete("/patients/{patient_id}", response_model=schemas.Patient)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = crud.delete_patient(db=db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient

@app.get("/appointments/", response_model=List[schemas.Appointment])
def read_appointments(db: Session = Depends(get_db)):
    return crud.get_all_appointments(db)

@app.get("/appointments/{appointment_id}", response_model=schemas.Appointment)
def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@app.get("/patients/{patient_id}/appointments", response_model=List[schemas.Appointment])
def read_appointments_by_patient(patient_id: int, db: Session = Depends(get_db)):
    appointments = crud.get_appointments_by_patient(db, patient_id=patient_id)
    if not appointments:
        raise HTTPException(status_code=404, detail="Appointments not found")
    return appointments


@app.put("/appointments/{appointment_id}", response_model=schemas.Appointment)
def update_appointment(appointment_id: int, appointment: schemas.AppointmentUpdate, db: Session = Depends(get_db)):
    db_appointment = crud.update_appointment(db=db, appointment_id=appointment_id, appointment=appointment)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@app.delete("/appointments/{appointment_id}", response_model=schemas.Appointment)
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = crud.delete_appointment(db=db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

app.post("/payments/", response_model=schemas.Payment)
def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return crud.create_payment(db=db, payment=payment)

@app.get("/payments/{payment_id}", response_model=schemas.Payment)
def read_payment(payment_id: int, db: Session = Depends(get_db)):
    db_payment = crud.get_payment(db=db, payment_id=payment_id)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return db_payment

@app.put("/payments/{payment_id}", response_model=schemas.Payment)
def update_payment(payment_id: int, payment: schemas.PaymentUpdate, db: Session = Depends(get_db)):
    db_payment = crud.update_payment(db=db, payment_id=payment_id, payment=payment)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return db_payment

@app.delete("/payments/{payment_id}", response_model=schemas.Payment)
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    db_payment = crud.delete_payment(db=db, payment_id=payment_id)
    if db_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return db_payment

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)