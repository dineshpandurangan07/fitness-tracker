# ??? FitPulse � Fitness & Workout Tracker

A full-stack, modern fitness tracking app built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

## ? Features

- ?? **Real Google OAuth** � Sign in with your actual Google account
- ? **Fast Mail Login** � Instant login with just your email
- ?? **Dashboard** � Workout stats, progress charts, and calorie tracking
- ?? **Workout Logging** � Log exercises, sets, reps, and duration
- ?? **Weight Tracker** � Track body weight over time with charts
- ?? **Goals** � Set and monitor fitness goals
- ?? **Calorie Tracker** � Daily calorie intake management
- ?? **History** � Full workout history and analytics
- ?? **Dark Mode** � Full dark/light theme support

## ??? Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Recharts, React Router, @react-oauth/google

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth, bcryptjs, Google Auth

## ?? Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google OAuth Client ID

### Backend Setup
```bash
cd backend
cp .env.example .env
# Fill in your values in .env
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
# Fill in your values in .env
npm install
npm run dev
```

### Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fitness_tracker
JWT_SECRET=your_jwt_secret
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### Deploying to Vercel

Import the repository into Vercel with the repository root as the project root. The included `vercel.json` builds the Vite frontend and exposes the Express API through the same domain.

Add these Vercel environment variables for Production, Preview, and Development as needed:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
JWT_SECRET=<long-random-secret>
NODE_ENV=production
GOOGLE_CLIENT_ID=<google-client-id>
VITE_GOOGLE_CLIENT_ID=<google-client-id>
```

Do not set `VITE_API_URL` for Vercel. The frontend uses relative `/api` requests so the deployed website and API share one URL.

## ?? Screenshots

> Dashboard, Workouts, Progress, Calorie Tracker, and more.

## ?? License

MIT
