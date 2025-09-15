# Chat Application

A modern, stateful chat application built with FastAPI and vanilla JavaScript, featuring AI-powered conversations with full conversation history tracking.

## 🚀 Quick Start

### Using Docker (Recommended)

The easiest way to run the application is with Docker:

```bash
# Start everything with one command
docker-compose up --build
```

That's it! The application will be available at **http://localhost:8000**
- **Chat Interface**: http://localhost:8000
- **LocalAI API**: http://localhost:1234

### Using Docker in Development Mode

For development with live file watching:

```bash
# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Environment Variables

The application uses LocalAI with automatic model downloading. You can customize configuration using environment variables:

```bash
# Create a .env file
cat > .env << EOF
API_URL=http://127.0.0.1:1234/v1/chat/completions
MODEL_NAME=qwen/qwen3-1.7b
MAX_TOKENS=1000
TEMPERATURE=0.7
EOF

# Then run
docker-compose up --build
```

## 🛠️ Development Setup

If you prefer to run locally without Docker:

### Prerequisites
- Python 3.9+
- [uv](https://github.com/astral-sh/uv) package manager

### Installation

```bash
# Install dependencies
uv sync

# Run the application
uv run uvicorn app:app --reload
```

## ✨ Features

- **Stateful Conversations**: Full conversation history maintained across messages
- **Modern UI**: Clean, responsive chat interface
- **AI Integration**: Configurable AI service integration
- **Real-time Typing**: Visual typing indicators for better UX
- **Message History**: Clear conversation history when needed
- **Docker Ready**: Single-command deployment
- **Type Safe**: Full TypeScript-style type checking with Pyright
- **Linted Code**: Ruff and isort for consistent code formatting

## 🏗️ Architecture

```
├── app.py              # FastAPI application entry point
├── routers/            # API route handlers
│   └── chat.py        # Chat endpoint with conversation history
├── models/            # Pydantic data models
│   └── schemas.py     # Request/response schemas
├── services/          # Business logic layer
│   └── ai_service.py  # AI service integration
├── middleware/        # FastAPI middleware
│   └── cors.py       # CORS configuration
├── static/           # Frontend assets
│   ├── script.js     # Chat application logic
│   └── style.css     # Styling with think tag support
├── templates/        # Jinja2 HTML templates
│   └── index.html    # Main chat interface
└── config.py         # Application settings
```

## 🔧 API Endpoints

### Chat Endpoint
```http
POST /chat
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "conversation_history": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

### Frontend
```http
GET /
```
Serves the chat interface at the root path.

## 🧪 Development Commands

```bash
# Run linters
uv run ruff check .
uv run pyright .
uv run isort . --check-only

# Fix linting issues
uv run ruff check . --fix
uv run isort .

# Run the server in development mode
uv run uvicorn app:app --reload

# Add new dependencies
uv add package-name
```

## 🐳 Docker Details

### Dockerfile Features
- Multi-stage build for optimal image size
- Uses `uv` for fast dependency installation
- Non-root user for security
- Health checks included
- Python 3.11 slim base image

### Docker Compose Features
- **LocalAI Integration**: Automatic model downloading from Hugging Face
- **Pre-configured Model**: Qwen3-1.7B-GGUF model loads automatically
- Environment variable configuration
- Volume mounts for development
- Health checks for both services
- Automatic restart policies
- Port mapping: Chat App (8000:8000), LocalAI (1234:8080)

## 📝 Configuration

### LocalAI Configuration
- **Automatic Model Loading**: Qwen3-1.7B-Q8_0.gguf downloads automatically from Hugging Face
- **Backend**: Uses llama-cpp for GGUF model inference
- **API Endpoint**: Available at http://localhost:1234
- **Model Storage**: Persistent volume for downloaded models

### Chat App Configuration
- `API_URL`: AI service endpoint (default: http://127.0.0.1:1234/v1/chat/completions)
- `MODEL_NAME`: Model identifier (default: qwen/qwen3-1.7b)
- `MAX_TOKENS`: Maximum response tokens (default: 1000)
- `TEMPERATURE`: AI temperature setting (default: 0.7)

### Model Information
- **Default Model**: Qwen3-1.7B-Q8_0.gguf (~1.9GB)
- **Auto-download**: Model downloads automatically on first startup
- **Storage**: Models persist in Docker volume for faster subsequent startups
