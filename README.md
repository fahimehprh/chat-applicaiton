# Chat Application

A modern, stateful chat application built with FastAPI and vanilla JavaScript, featuring AI-powered conversations with full conversation history tracking.

## 🚀 Quick Start

### Using Docker (Recommended)

The easiest way to run the application is with Docker:

```bash
# 1. Place your GGUF model file in the ./llama-models directory
# Example: ./llama-models/llama-2-7b-chat.q4_0.gguf

# 2. Create environment file (optional)
cp .env.example .env
# Edit .env to set MODEL_FILE=your-model-name.gguf

# 3. Start everything with one command
docker-compose up --build
```

That's it! The application will be available at **http://localhost:8000**
- **Chat Interface**: http://localhost:8000
- **llama.cpp API**: http://localhost:8080

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

You can customize the AI service configuration using environment variables:

```bash
# Create a .env file
cat > .env << EOF
API_URL=http://your-ai-service:1234/v1/chat/completions
MODEL_NAME=your-preferred-model
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
- Environment variable configuration
- Volume mounts for development
- Health checks
- Automatic restart policies
- Port mapping (8000:8000)

## 📝 Configuration

### llama.cpp Configuration
- `MODEL_FILE`: GGUF model filename in ./llama-models directory (default: model.gguf)
- `CONTEXT_SIZE`: Context window size (default: 2048)
- `THREADS`: Number of CPU threads to use (default: 4)

### Chat App Configuration
- `API_URL`: AI service endpoint (default: http://llama-cpp:8080/v1/chat/completions)
- `MODEL_NAME`: Model identifier for API (default: gpt-3.5-turbo)
- `MAX_TOKENS`: Maximum response tokens (default: 1000)
- `TEMPERATURE`: AI temperature setting (default: 0.7)

### Model Requirements
1. **Download a GGUF model** from Hugging Face or convert your own
2. **Place it in `./llama-models/`** directory
3. **Set `MODEL_FILE`** environment variable to the filename

**Popular models:**
- Llama 2 7B: `llama-2-7b-chat.q4_0.gguf` (~4GB)
- Llama 2 13B: `llama-2-13b-chat.q4_0.gguf` (~7GB)
- Code Llama: `codellama-7b-instruct.q4_0.gguf` (~4GB)

## 🤝 Contributing

1. Ensure Docker is installed and running
2. Make your changes
3. Test with: `docker-compose up --build`
4. Run linters: `uv run ruff check . && uv run pyright .`
5. Submit a pull request
