# Chat AI

A minimal, clean, future-proof AI chat learning project built with React + TypeScript (Vite) frontend and Node.js + Express + TypeScript backend.

## Project Structure

```
chat-ai/
├── frontend/          # React + TypeScript (Vite)
├── backend/           # Node.js + Express + TypeScript
└── README.md
```

## Features

- ✅ Minimal but attractive chat UI
- ✅ Real-time streaming responses
- ✅ Clean, modern design
- ✅ TypeScript throughout
- ✅ Ready for AI integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start both backend and frontend servers (in separate terminals)
2. Open `http://localhost:3000` in your browser
3. Type a message and click Send
4. Watch the assistant response stream in real-time

## Architecture

### Backend

- **Routes** (`src/routes/`): HTTP route handlers
- **Services** (`src/services/`): Business logic (currently static, ready for AI integration)
- **Streaming**: Currently streams static responses, designed to be replaced with AI API streaming

### Frontend

- **Components** (`src/components/`): React components
- **Hooks** (`src/hooks/`): Custom React hooks for chat functionality
- **Types** (`src/types/`): TypeScript type definitions

## Future Integration Points

The project is structured to easily integrate:

- **AI APIs**: Replace `chat.service.ts` streaming logic with OpenAI, Anthropic, etc.
- **MongoDB**: Add database layer for chat history persistence
- **Redis**: Add caching layer for faster responses
- **Authentication**: Add auth middleware and user management

## Development

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- Backend streams responses as `text/plain` (not JSON)
- Frontend uses `ReadableStream` API to handle streaming
- No database or authentication yet - ready to be added
- CORS is enabled for local development

