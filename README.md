# AgentForge

A browser-based platform for designing, configuring, and deploying autonomous multi-agent AI systems with real code execution capabilities.

## Features

- Visual drag-and-drop pipeline builder
- Native code execution through Google ADK
- Prebuilt templates for real-world applications
- Cloud Run deployment integration

## Tech Stack

### Frontend
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Visual Canvas:** React Flow

### Backend
- **Framework:** FastAPI (Python)
- **Agent Orchestration:** Google ADK
- **Database:** Supabase (PostgreSQL)

## Project Structure

```
agentforge/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages and routes
│   │   ├── components/      # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── layout/      # Layout components
│   │   │   └── pipeline/    # Pipeline builder components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── services/        # API service layer
│   │   ├── store/           # State management
│   │   └── types/           # TypeScript type definitions
│   └── ...
├── backend/                  # FastAPI backend service
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── core/            # Core configuration
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   └── services/        # Business logic
│   └── tests/               # Backend tests
├── tasks/                    # Development task documentation
└── prd.md                   # Product Requirements Document
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agentforge
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend
   cp frontend/.env.example frontend/.env.local

   # Backend
   cp backend/.env.example backend/.env
   ```

   Edit the `.env.local` and `.env` files with your configuration values.

4. **Set up the backend (optional for frontend development)**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Development

**Start the frontend development server:**
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

**Start the backend server:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at [http://localhost:8000](http://localhost:8000).
API documentation: [http://localhost:8000/api/docs](http://localhost:8000/api/docs).

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run build` | Build frontend for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## Configuration

### Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories for required environment variables.

Key configurations:
- **Supabase:** Database and authentication
- **Google ADK:** Agent orchestration and code execution
- **Google Maps API:** Location-based features
- **Web Search API:** Research capabilities

## Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit validation

Pre-commit hooks automatically run linting and formatting on staged files.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all linting and type checks pass
4. Submit a pull request

## License

Private - All rights reserved
