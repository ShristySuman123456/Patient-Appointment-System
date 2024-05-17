from sqlalchemy import create_engine,MetaData
from sqlalchemy.orm import sessionmaker
meta = MetaData()


SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://admin:12345678@localhost:3304/patient_appointment_system"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
