
# Pingo - Internet Speed Test Application

Pingo is a modern, full-stack web application that allows users to test their internet speed. It displays metrics such as download speed, upload speed, ping, and jitter in real-time.

## Project Structure

This project follows a monorepo structure with separate frontend and backend directories:

```
pingo/
├── frontend/          # React frontend application
└── backend/           # Node.js Express backend application
```

## Frontend

The frontend is built with:
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui for component library
- Framer Motion for animations
- Socket.IO client for real-time updates

## Backend

The backend is built with:
- Node.js and Express
- Socket.IO for real-time communication
- Speedtest-net package for internet speed measurements
- MongoDB with Mongoose for data storage

## Features

- Start test and stream live download/upload speed progress
- Save results with timestamp
- Allow user feedback on each test result
- Display previous test results in the UI
- Clean responsive design with modern UI/UX

## Getting Started

### Prerequisites

- Node.js 16+ 
- MongoDB

### Running the Frontend

```sh
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:8080

### Running the Backend

```sh
cd backend
npm install
npm run dev
```

The backend will be available at http://localhost:3001

## Project Info

**URL**: https://lovable.dev/projects/31880f38-97bf-4523-81f6-74bec0e2a82f

## Deployment

- Frontend: Deploy to Vercel
- Backend: Deploy to Render or Railway
