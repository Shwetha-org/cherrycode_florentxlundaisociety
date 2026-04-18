# Curate

Curate is an AI-powered fashion styling web app that helps users get quick styling feedback based on body-profile inputs and fashion product URLs.

## Problem Statement

Online fashion shopping often lacks personalized guidance. Users may like a product visually but still struggle to decide whether its silhouette, color direction, and overall vibe suit their body profile and style preferences. This project solves that problem by providing a quick and structured style verdict.

## Solution

Curate provides a simple two-step styling experience. First, the user uploads front and side photos and adds preferences such as skin tone, vibe, and fit preference to receive a body-profile based styling analysis. Then the user can submit a fashion product URL and get a verdict such as Buy, Maybe, or Skip, along with styling notes and recommendations.

## Technical Approach

The project uses a React and Vite frontend with a Flask backend.

### Backend
The backend provides:
- `GET /health`
- `POST /analyze-body`
- `POST /analyze-product`

The body analysis flow accepts front and side images along with user preferences and returns a structured styling response. The product analysis flow accepts a product URL, body profile, and style preferences, and returns a structured verdict with scores and notes.

### Frontend
The frontend collects user inputs, sends requests to the backend, and displays the returned results in a styled and easy-to-read interface.

## Project Structure

```bash
project-root/
├── backend/
│   └── app.py
├── public/
├── src/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
pip install flask flask-cors python-dotenv anthropic
cd ..
```

### 4. Add environment variable

Create a `.env` file inside the `backend` folder and add:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### 5. Run the backend

```bash
cd backend
python app.py
```

The backend runs on:

```txt
http://127.0.0.1:5000
```

### 6. Run the frontend

```bash
npm run dev
```

The frontend usually runs on:

```txt
http://localhost:5173
```

## Notes

- The app is intentionally conservative in its analysis and avoids medical, health, or sensitive claims.
- Product verdicts are based on limited signals such as URL text, body profile, and stated preferences, so the output is meant to be assistive rather than absolute.
- The backend is designed to return valid JSON so the frontend can reliably render structured styling feedback.

## License

This project is for educational and portfolio use unless otherwise specified.
