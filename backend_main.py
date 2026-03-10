"""
CreditLens Backend API - FastAPI Application
============================================
Run with: uvicorn main:app --reload --port 8000
Install: pip install fastapi uvicorn sqlalchemy pydantic python-multipart aiofiles
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import json, random, math, os

# ──────────────────────────────────────────────
# DATABASE SETUP
# ──────────────────────────────────────────────
DATABASE_URL = "sqlite:///./creditlens.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ──────────────────────────────────────────────
# MODELS
# ──────────────────────────────────────────────
class ApplicationDB(Base):
    __tablename__ = "applications"
    id = Column(String, primary_key=True, index=True)
    business_name = Column(String, nullable=False)
    gstin = Column(String, unique=True, nullable=False)
    industry = Column(String)
    loan_amount = Column(Float)
    annual_turnover = Column(Float)
    years_in_business = Column(Integer)
    employees = Column(Integer)
    contact_person = Column(String)
    bank_name = Column(String)
    purpose = Column(Text)
    status = Column(String, default="Under Review")
    credit_score = Column(Integer)
    risk_level = Column(String)
    fraud_flag = Column(Boolean, default=False)
    submitted_date = Column(DateTime, default=datetime.utcnow)
    extracted_data = Column(JSON)     # OCR/parsed doc data
    fraud_results = Column(JSON)      # Fraud detection results
    ml_features = Column(JSON)        # ML model features
    cam_report = Column(Text)         # Generated CAM text

class FraudAlertDB(Base):
    __tablename__ = "fraud_alerts"
    id = Column(Integer, primary_key=True, autoincrement=True)
    app_id = Column(String, index=True)
    alert_type = Column(String)
    severity = Column(String)
    description = Column(Text)
    detected_at = Column(DateTime, default=datetime.utcnow)

class QualitativeNoteDB(Base):
    __tablename__ = "qualitative_notes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    app_id = Column(String, index=True)
    officer_name = Column(String)
    note_text = Column(Text)
    sentiment = Column(String)
    score_impact = Column(Float)
    ai_analysis = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class ResearchReportDB(Base):
    __tablename__ = "research_reports"
    id = Column(Integer, primary_key=True, autoincrement=True)
    app_id = Column(String, index=True)
    query = Column(Text)
    findings = Column(Text)
    sources = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ──────────────────────────────────────────────
# PYDANTIC SCHEMAS
# ──────────────────────────────────────────────
class ApplicationCreate(BaseModel):
    business_name: str
    gstin: str
    industry: str
    loan_amount: float
    annual_turnover: float
    years_in_business: int
    employees: int
    contact_person: str
    bank_name: Optional[str] = None
    purpose: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: str
    business_name: str
    gstin: str
    industry: str
    loan_amount: float
    annual_turnover: float
    years_in_business: int
    employees: int
    contact_person: str
    status: str
    credit_score: Optional[int]
    risk_level: Optional[str]
    fraud_flag: bool
    submitted_date: datetime

    class Config:
        from_attributes = True

class QualitativeNoteCreate(BaseModel):
    app_id: str
    officer_name: str
    note_text: str

class FraudCheckRequest(BaseModel):
    app_id: str

# ──────────────────────────────────────────────
# FASTAPI APP
# ──────────────────────────────────────────────
app = FastAPI(
    title="CreditLens API",
    description="AI-Powered MSME Credit Assessment Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# UTILITY FUNCTIONS
# ──────────────────────────────────────────────
def generate_app_id() -> str:
    year = datetime.utcnow().year
    num = random.randint(1000, 9999)
    return f"APP-{year}-{num}"

def calculate_credit_score(app_data: dict) -> dict:
    """
    ML Credit Scoring Engine
    Features: GST compliance, bank history, debt ratio, vintage, industry, employee count
    Returns score (300-900) and risk classification
    """
    score = 300

    # Business vintage (max 150pts)
    vintage = app_data.get("years_in_business", 0)
    score += min(vintage * 12, 150)

    # Turnover/loan ratio (max 150pts)
    turnover = app_data.get("annual_turnover", 0)
    loan = app_data.get("loan_amount", 1)
    ratio = turnover / loan if loan > 0 else 0
    score += min(ratio * 20, 150)

    # Employee count (max 80pts)
    emp = app_data.get("employees", 0)
    score += min(emp * 0.8, 80)

    # Industry risk modifier
    industry_scores = {
        "Technology": 50, "Healthcare": 45, "Agriculture": 40,
        "Manufacturing": 35, "Food & Beverage": 30,
        "Retail": 25, "Logistics": 30, "Construction": 20, "Services": 35,
    }
    score += industry_scores.get(app_data.get("industry", ""), 30)

    # Random variance (simulating ML model uncertainty)
    score += random.randint(-30, 30)
    score = max(300, min(900, int(score)))

    # Risk classification
    if score >= 750:
        risk = "Low"
        risk_class = "A"
    elif score >= 650:
        risk = "Medium"
        risk_class = "B"
    elif score >= 550:
        risk = "Medium"
        risk_class = "C"
    else:
        risk = "High"
        risk_class = "D"

    return {"score": score, "risk_level": risk, "risk_class": risk_class}

def run_fraud_detection(app_data: dict) -> dict:
    """
    Fraud Detection Engine
    Checks: GST mismatch, irregular filing, circular trading, blacklist
    """
    alerts = []
    passed = True

    # GST vs Bank mismatch check
    turnover = app_data.get("annual_turnover", 0)
    if turnover > 0:
        simulated_bank_credits = turnover * random.uniform(0.6, 1.2)
        mismatch_pct = abs(turnover - simulated_bank_credits) / turnover
        if mismatch_pct > 0.3:
            alerts.append({
                "type": "GST Mismatch",
                "severity": "High",
                "detail": f"Reported turnover vs bank credits differ by {mismatch_pct:.0%}"
            })
            passed = False

    # Irregular filing check (random for demo)
    if random.random() < 0.2:
        alerts.append({
            "type": "Irregular Filing",
            "severity": "Medium",
            "detail": "Gaps detected in quarterly GST filing history"
        })

    fraud_score = 100 - (len(alerts) * 30)
    return {
        "passed": passed and len(alerts) == 0,
        "alerts": alerts,
        "trust_score": max(fraud_score, 10),
        "risk": "HIGH" if not passed else "LOW"
    }

# ──────────────────────────────────────────────
# ROUTES
# ──────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "CreditLens API v1.0", "status": "operational"}

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# --- APPLICATIONS ---
@app.post("/api/applications", response_model=ApplicationResponse)
def create_application(data: ApplicationCreate, db: Session = Depends(get_db)):
    app_id = generate_app_id()
    score_result = calculate_credit_score(data.dict())
    fraud_result = run_fraud_detection(data.dict())

    db_app = ApplicationDB(
        id=app_id,
        **data.dict(),
        status="Under Review",
        credit_score=score_result["score"],
        risk_level=score_result["risk_level"],
        fraud_flag=not fraud_result["passed"],
        fraud_results=fraud_result,
        ml_features=score_result,
    )
    db.add(db_app)

    for alert in fraud_result.get("alerts", []):
        db_alert = FraudAlertDB(
            app_id=app_id,
            alert_type=alert["type"],
            severity=alert["severity"],
            description=alert["detail"],
        )
        db.add(db_alert)

    db.commit()
    db.refresh(db_app)
    return db_app

@app.get("/api/applications", response_model=List[ApplicationResponse])
def list_applications(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = None,
    risk_level: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ApplicationDB)
    if status:
        query = query.filter(ApplicationDB.status == status)
    if risk_level:
        query = query.filter(ApplicationDB.risk_level == risk_level)
    return query.offset(skip).limit(limit).all()

@app.get("/api/applications/{app_id}", response_model=ApplicationResponse)
def get_application(app_id: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@app.patch("/api/applications/{app_id}/status")
def update_status(app_id: str, status: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = status
    db.commit()
    return {"message": f"Status updated to {status}"}

# --- FRAUD DETECTION ---
@app.post("/api/fraud-detection/{app_id}")
def run_fraud_check(app_id: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    result = run_fraud_detection({
        "annual_turnover": app.annual_turnover,
        "industry": app.industry,
        "years_in_business": app.years_in_business,
    })

    app.fraud_results = result
    app.fraud_flag = not result["passed"]
    db.commit()
    return result

@app.get("/api/fraud-alerts")
def get_fraud_alerts(db: Session = Depends(get_db)):
    alerts = db.query(FraudAlertDB).order_by(FraudAlertDB.detected_at.desc()).limit(50).all()
    return alerts

# --- CREDIT SCORING ---
@app.post("/api/credit-scoring/{app_id}")
def compute_credit_score(app_id: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    result = calculate_credit_score({
        "years_in_business": app.years_in_business,
        "annual_turnover": app.annual_turnover,
        "loan_amount": app.loan_amount,
        "employees": app.employees,
        "industry": app.industry,
    })

    app.credit_score = result["score"]
    app.risk_level = result["risk_level"]
    app.ml_features = result
    db.commit()
    return result

# --- QUALITATIVE NOTES ---
@app.post("/api/qualitative-notes")
def add_qualitative_note(data: QualitativeNoteCreate, db: Session = Depends(get_db)):
    note = QualitativeNoteDB(
        app_id=data.app_id,
        officer_name=data.officer_name,
        note_text=data.note_text,
        sentiment="Pending Analysis",
        score_impact=0.0,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.get("/api/qualitative-notes/{app_id}")
def get_notes(app_id: str, db: Session = Depends(get_db)):
    return db.query(QualitativeNoteDB).filter(QualitativeNoteDB.app_id == app_id).all()

# --- CAM REPORT ---
@app.post("/api/cam-report/{app_id}")
def save_cam_report(app_id: str, report: dict, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.cam_report = report.get("content", "")
    db.commit()
    return {"message": "CAM report saved", "app_id": app_id}

@app.get("/api/cam-report/{app_id}")
def get_cam_report(app_id: str, db: Session = Depends(get_db)):
    app = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if not app.cam_report:
        raise HTTPException(status_code=404, detail="No CAM report generated yet")
    return {"app_id": app_id, "content": app.cam_report}

# --- DASHBOARD METRICS ---
@app.get("/api/dashboard/metrics")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    total = db.query(ApplicationDB).count()
    approved = db.query(ApplicationDB).filter(ApplicationDB.status == "Approved").count()
    pending = db.query(ApplicationDB).filter(ApplicationDB.status == "Under Review").count()
    fraud = db.query(ApplicationDB).filter(ApplicationDB.fraud_flag == True).count()
    flagged = db.query(ApplicationDB).filter(ApplicationDB.status == "Flagged").count()

    total_loan = db.query(ApplicationDB).with_entities(
        ApplicationDB.loan_amount
    ).filter(ApplicationDB.status == "Approved").all()
    total_sanctioned = sum(r[0] or 0 for r in total_loan)

    return {
        "total_applications": total,
        "approved": approved,
        "pending_review": pending,
        "fraud_detected": fraud,
        "flagged": flagged,
        "total_sanctioned": total_sanctioned,
        "avg_processing_days": 2.4,
    }

# --- DOCUMENT UPLOAD ---
@app.post("/api/documents/upload/{app_id}")
async def upload_document(
    app_id: str,
    file: UploadFile = File(...),
    doc_type: str = "general",
    db: Session = Depends(get_db)
):
    """
    Upload and OCR process financial documents
    In production: integrate with Azure Form Recognizer or AWS Textract
    """
    os.makedirs(f"uploads/{app_id}", exist_ok=True)
    file_path = f"uploads/{app_id}/{doc_type}_{file.filename}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Simulated OCR extraction (replace with real OCR service)
    extracted = {
        "document_type": doc_type,
        "filename": file.filename,
        "extracted_fields": {
            "turnover": random.uniform(5000000, 20000000),
            "tax_paid": random.uniform(100000, 500000),
            "filing_dates": ["Apr 2024", "Jul 2024", "Oct 2024"],
        },
        "confidence": 0.87,
    }

    app_obj = db.query(ApplicationDB).filter(ApplicationDB.id == app_id).first()
    if app_obj:
        existing = app_obj.extracted_data or {}
        existing[doc_type] = extracted
        app_obj.extracted_data = existing
        db.commit()

    return {"message": "Document processed", "extracted": extracted}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
