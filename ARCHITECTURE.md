# CreditLens — Full Stack Architecture

## Tech Stack
- **Frontend**: React + Tailwind (JSX artifact) with Anthropic API for AI features
- **Backend**: Python FastAPI + SQLAlchemy ORM
- **Database**: SQLite (dev) / PostgreSQL (production)
- **AI Engine**: Anthropic Claude (claude-sonnet-4-20250514)

---

## Project Structure
```
creditlens/
├── frontend/               # React app (Vite)
│   ├── src/
│   │   ├── App.jsx          ← Main app (provided)
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # FastAPI
│   ├── main.py              ← API server (provided)
│   ├── requirements.txt
│   └── creditlens.db        ← SQLite (auto-created)
│
└── docker-compose.yml
```

---

## Backend Setup

```bash
# 1. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic python-multipart aiofiles anthropic

# 3. Set environment variables
export ANTHROPIC_API_KEY="sk-ant-..."

# 4. Run the server
uvicorn main:app --reload --port 8000
```

---

## Frontend Setup

```bash
# 1. Create Vite + React app
npm create vite@latest frontend -- --template react
cd frontend

# 2. Install dependencies
npm install

# 3. Add the provided App.jsx

# 4. Run dev server
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/metrics` | Dashboard KPIs |
| GET | `/api/applications` | List all applications |
| POST | `/api/applications` | Submit new application |
| GET | `/api/applications/{id}` | Get single application |
| PATCH | `/api/applications/{id}/status` | Update status |
| POST | `/api/fraud-detection/{id}` | Run fraud scan |
| GET | `/api/fraud-alerts` | Get all fraud alerts |
| POST | `/api/credit-scoring/{id}` | Compute ML score |
| POST | `/api/qualitative-notes` | Add field note |
| GET | `/api/qualitative-notes/{id}` | Get notes for app |
| POST | `/api/cam-report/{id}` | Save CAM report |
| GET | `/api/cam-report/{id}` | Retrieve CAM report |
| POST | `/api/documents/upload/{id}` | Upload & OCR document |

---

## Database Schema

### applications
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR PK | APP-YYYY-XXXX |
| business_name | VARCHAR | Company name |
| gstin | VARCHAR UNIQUE | GST number |
| industry | VARCHAR | Sector |
| loan_amount | FLOAT | Requested amount |
| annual_turnover | FLOAT | Reported revenue |
| credit_score | INTEGER | ML score 300-900 |
| risk_level | VARCHAR | Low/Medium/High |
| fraud_flag | BOOLEAN | Fraud detected |
| status | VARCHAR | Application status |
| extracted_data | JSON | OCR results |
| fraud_results | JSON | Fraud scan results |
| ml_features | JSON | Scoring features |
| cam_report | TEXT | Generated CAM |

### fraud_alerts
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | |
| app_id | VARCHAR FK | Reference |
| alert_type | VARCHAR | GST Mismatch, etc. |
| severity | VARCHAR | High/Medium/Low |
| description | TEXT | Details |

### qualitative_notes
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | |
| app_id | VARCHAR FK | Reference |
| officer_name | VARCHAR | Credit officer |
| note_text | TEXT | Observation |
| sentiment | VARCHAR | AI sentiment |
| score_impact | FLOAT | Points impact |
| ai_analysis | TEXT | Claude analysis |

### research_reports
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | |
| app_id | VARCHAR FK | Reference |
| query | TEXT | Research query |
| findings | TEXT | AI findings |
| sources | JSON | Source URLs |

---

## Production Deployment

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db/creditlens
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on: [db]

  frontend:
    build: ./frontend
    ports: ["3000:80"]
    environment:
      - VITE_API_BASE_URL=http://backend:8000

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: creditlens
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes: ["pgdata:/var/lib/postgresql/data"]

volumes:
  pgdata:
```

---

## Production Integrations (Recommended)

| Service | Purpose |
|---------|---------|
| **Azure Form Recognizer** | OCR for GST/bank documents |
| **AWS Textract** | Alternative OCR |
| **GSTN Sandbox API** | Live GST verification |
| **CIBIL/Experian API** | Credit bureau data |
| **RBI Defaulter API** | Blacklist check |
| **SendGrid** | Email notifications |
| **Auth0 / Clerk** | Authentication |
| **Redis** | Caching + job queues |
| **Celery** | Background tasks (ML, OCR) |
| **S3/Azure Blob** | Document storage |

---

## Security Checklist
- [ ] JWT authentication on all endpoints
- [ ] Role-based access (Admin, Credit Officer, Auditor)
- [ ] Document encryption at rest (AES-256)
- [ ] API rate limiting
- [ ] Audit logging for all decisions
- [ ] PII masking in logs
- [ ] VAPT testing before production
