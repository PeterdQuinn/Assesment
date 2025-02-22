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

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy, Pandas, Uvicorn, Alembic (for database migrations)
- **Database**: PostgreSQL (SQLite for local development)
- **ETL**: Pandas for data cleaning and transformation
- **Frontend**: React.js, Material-UI, Recharts, Axios, Tailwind CSS
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Testing**: Pytest for backend unit testing

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
