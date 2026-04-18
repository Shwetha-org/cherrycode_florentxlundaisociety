# Curate

Curate is an AI-powered fashion styling web app that helps users get quick styling feedback based on body-profile inputs and fashion product URLs.[file:1676]

## Problem Statement

Online fashion shopping often lacks personalized guidance.[file:1676] Users may like a product visually but still struggle to decide whether its silhouette, color direction, and overall vibe suit their body profile and style preferences.[file:1676] This project addresses that gap by providing a quick and structured style verdict instead of forcing users to guess.[file:1676]

## Solution

Curate provides a simple two-step styling flow.[file:1676] First, the user uploads front and side photos and adds preferences such as skin tone, vibe, and fit preference to receive a conservative body-profile based styling analysis.[file:1676] Then the user can submit a fashion product URL and get a structured verdict with fit, color, vibe, styling notes, accessories, and a final recommendation such as Buy, Maybe, or Skip.[file:1676]

## Technical Approach

The project uses a React + Vite frontend and a Flask backend.[file:1676] The backend communicates with Anthropic to generate structured JSON responses for both body analysis and product verdict workflows.[file:1676]

### Backend workflow

The Flask backend exposes three main endpoints:[file:1676]

- `GET /health` for checking whether the backend is running.[file:1676]
- `POST /analyze-body` for analyzing uploaded front and side images together with user styling preferences.[file:1676]
- `POST /analyze-product` for evaluating a product URL using the user’s body profile and style preferences.[file:1676]

For body analysis, uploaded images are temporarily saved, converted to base64, and sent to the Anthropic API along with a prompt that requests cautious, styling-focused JSON output.[file:1676] For product analysis, the backend sends the product URL, body profile, and style preferences to the model and expects structured JSON containing verdict, scores, summary, and styling notes.[file:1676]

### Frontend workflow

The frontend collects user inputs, sends requests to the backend, and displays the returned results in a styled verdict interface.[file:1676] The app is designed to keep the analysis readable, compact, and focused on fashion guidance rather than overconfident predictions.[file:1676]

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

From the project root:

```bash
npm install
```

### 3. Install backend dependencies

From the `backend` folder:

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

From the `backend` folder:

```bash
python app.py
```

The backend will start on:

```txt
http://127.0.0.1:5000
```

### 6. Run the frontend

From the project root:

```bash
npm run dev
```

The frontend will usually start on:

```txt
http://localhost:5173
```

## Notes

- The app is intentionally conservative in its analysis and avoids medical, health, or sensitive claims.[file:1676]
- Product verdicts are based on limited signals such as URL text, body profile, and stated preferences, so the output is meant to be assistive rather than absolute.[file:1676]
- The backend is designed to return valid JSON so the frontend can reliably render structured styling feedback.[file:1676]

## License

This project is for educational and portfolio use unless otherwise specified.
