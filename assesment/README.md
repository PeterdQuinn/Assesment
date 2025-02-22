# Full Stack BI Developer Assessment

## Project Overview

This project is a **full-stack Business Intelligence (BI) solution** that includes **data ingestion, ETL processing, and an interactive analytics dashboard**. The system fetches data from an API, processes and stores it in a database, and displays visual insights in a user-friendly web interface.

## Features

✅ **Backend**: FastAPI for data ingestion and API service.  
✅ **ETL Processing**: Data transformation using Pandas and SQLAlchemy.  
✅ **Database**: PostgreSQL (or SQLite for local development).  
✅ **Frontend**: React.js with Material-UI and Recharts for data visualization.  
✅ **CI/CD**: GitHub Actions for automated testing and deployment.  
✅ **Scalability**: Modular and production-ready architecture.  
✅ **Data Validation**: Ensures accuracy in BI reporting.  
✅ **Automated Testing**: Unit tests for data integrity.  

## Problem Solved

Modern businesses need **real-time analytics** to make **data-driven decisions**. This project provides a **Business Intelligence (BI) dashboard** that allows users to:
- **Collect & visualize data** from an API.
- **Process raw data** with an ETL pipeline.
- **Store data securely** in a PostgreSQL database.
- **Display insights** in an interactive dashboard.

This system ensures **efficient data ingestion, transformation, and visualization**, making it easier to track business performance.

## Technologies Used

- **Backend:** FastAPI, SQLAlchemy, Pandas, PostgreSQL  
- **Frontend:** React.js, Material-UI, Recharts  
- **Data Processing:** ETL (Extract, Transform, Load) with Pandas  
- **Testing & Deployment:** Pytest, GitHub Actions, Docker  

## Challenges & Solutions

**1️⃣ Challenge: Ensuring real-time data updates**  
✔ **Solution:** Used **state management in React** and `useEffect()` to automatically fetch new data after every update.  

**2️⃣ Challenge: Handling API failures & validation**  
✔ **Solution:** Implemented **error handling** in the frontend & backend, displaying alerts if the API fails.  

**3️⃣ Challenge: Making the UI user-friendly**  
✔ **Solution:** Used **Material-UI** for a clean layout and **Recharts** for interactive visualizations.  

**4️⃣ Challenge: ETL Process Efficiency**  
✔ **Solution:** Optimized the ETL pipeline with **Pandas** for batch data processing, reducing latency.  

## Example API Response

When making a `GET` request to `/data`, the API returns JSON-formatted processed data:

```json
[
  {"id": 1, "name": "Revenue", "value": 1500.75},
  {"id": 2, "name": "Expenses", "value": 900.50},
  {"id": 3, "name": "Profit", "value": 600.25}
]
```

## Local Setup Instructions

### Backend Setup

#### 1. Clone the repository

```sh
git clone https://github.com/your-repo/assesment.git
cd assesment
```

#### 2. Create and activate a virtual environment

```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install dependencies

```sh
pip install -r backend/requirements.txt
```

#### 4. Apply Database Migrations

```sh
alembic upgrade head
```

#### 5. Run the FastAPI server

```sh
uvicorn backend.main:app --reload
```

#### 6. Trigger ETL process

```sh
curl http://127.0.0.1:8000/etl
```

#### 7. Verify API is working

```sh
curl http://127.0.0.1:8000/data
```

### Frontend Setup

#### 1. Navigate to the frontend directory and install dependencies

```sh
cd frontend
npm install
```

#### 2. Start the React development server

```sh
npm run dev
```

### Deployment Instructions

- Use **Docker** for containerization:

```sh
docker-compose up --build
```

- CI/CD via **GitHub Actions** for automated deployment.
- Deploy database migrations with:

```sh
alembic upgrade head
```

- Ensure environment variables are set in a `.env` file before deployment.

## API Endpoints

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | `/data`   | Fetch processed data |
| POST   | `/data`   | Insert new data      |
| GET    | `/etl`    | Trigger ETL process  |
| GET    | `/health` | Check API health     |

## Additional Notes

- A `.env` file is used for environment variables (e.g., database credentials, API keys).
- The project can be extended with additional BI tools like **Power BI, Looker, or Tableau**.
- Future improvements: **Cache optimization, Role-based access control (RBAC), and predictive analytics integration**.
- Unit tests can be run with:

```sh
pytest tests/
```
