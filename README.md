# Train Management App

## Tech Stack

- **Frontend:** Next.js, React, ShadCN
- **Backend:** NestJS
- **Database:** PostgreSQL with TypeORM

## Local Development Setup

### Prerequisites

- Node.js v18+
- PostgreSQL running locally

### 1. Start Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=trainuser
DB_PASSWORD=trainpass123
DB_NAME=traindb
JWT_SECRET=dev-secret-key
JWT_EXPIRES_IN=24h
```

Start development server:

```bash
npm run start:dev
```

Backend runs at: `http://localhost:3000`

### 2. Start Frontend

Open new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Start development server on port 3001:

```bash
npm run dev -- -p 3001
```

Frontend runs at: `http://localhost:3001`

### 3. Access Application

Open `http://localhost:3001` in your browser and create an account to get started.

## Project Structure

```
kevych-test-task/
├── backend/          # NestJS backend API
├── frontend/         # Next.js frontend
├── terraform/        # AWS infrastructure as code
└── docker-compose.yml # Docker setup for production
```
