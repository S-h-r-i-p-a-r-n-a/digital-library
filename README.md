# 🚀 Digital Library System

An AI-powered digital library management system built with FastAPI, PostgreSQL, and Streamlit. Designed for students to access, read, and study books with intelligent features like semantic search, AI summaries, and personalized recommendations.

## ✨ Features

### Current Features (v1.0)
- ✅ User Authentication (Register/Login with JWT)
- ✅ User Profile Management
- ✅ Role-based Access (Student/Admin)

### Upcoming Features
- 📚 Book Management (Upload, Browse, Search)
- 📖 PDF Reader Interface
- 📊 Reading Analytics
- 🤖 AI-Powered Search
- 💡 Smart Recommendations
- 📝 AI Summaries & Study Tools

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Python 3.11 or higher
- Docker & Docker Compose
- PostgreSQL 15 (or use Docker)
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/digital-library.git
cd digital-library
```

### 2. Setup Environment Variables
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

### 3. Start Database with Docker
```bash
# From project root
docker-compose up -d db
```

This starts PostgreSQL on `localhost:5432`

### 4. Install Python Dependencies
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### 5. Run the Application
```bash
# Make sure you're in backend/ directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

### 6. Access Database GUI (Optional)
```bash
docker-compose up -d pgadmin
```

Access pgAdmin at http://localhost:5050
- Email: admin@admin.com
- Password: admin

## 📁 Project Structure
```
digital-library/
│
├── backend/
│   ├── app/
│   │   ├── api/              # API route handlers
│   │   │   ├── auth.py       # Authentication endpoints
│   │   │   └── deps.py       # Shared dependencies
│   │   │
│   │   ├── core/             # Core functionality
│   │   │   ├── config.py     # Configuration settings
│   │   │   ├── database.py   # Database setup
│   │   │   └── security.py   # Password & JWT handling
│   │   │
│   │   ├── crud/             # Database operations
│   │   │   └── user.py       # User CRUD operations
│   │   │
│   │   ├── models/           # SQLAlchemy models
│   │   │   └── user.py       # User database model
│   │   │
│   │   ├── schemas/          # Pydantic schemas
│   │   │   └── user.py       # User validation schemas
│   │   │
│   │   ├── utils/            # Utility functions
│   │   │
│   │   └── main.py           # FastAPI app entry point
│   │
│   ├── uploads/              # Uploaded files storage
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables (git-ignored)
│   └── .env.example          # Environment template
│
├── frontend/                 # Streamlit app (coming soon)
│
├── docker-compose.yml        # Docker services configuration
├── .gitignore
└── README.md
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and get token | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

## 🧪 Testing the API

### 1. Register a New User
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "full_name": "John Doe",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=student@example.com&password=password123"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### 3. Get Profile (with token)
```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'student',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

## 🔧 Development

### Run with Auto-reload
```bash
uvicorn app.main:app --reload
```

### View Logs
```bash
docker-compose logs -f db
```

### Reset Database
```bash
docker-compose down -v
docker-compose up -d db
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/digital_library` |
| `SECRET_KEY` | JWT secret key (min 32 chars) | - |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `PROJECT_NAME` | Application name | `Digital Library System` |
| `DEBUG` | Debug mode | `True` |
| `UPLOAD_DIR` | File upload directory | `./uploads` |
| `MAX_UPLOAD_SIZE` | Max file size in bytes | `52428800` (50MB) |

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart db

# Check logs
docker-compose logs db
```

### Port Already in Use
```bash
# Find process using port 8000
# Windows:
netstat -ano | findstr :8000

# Mac/Linux:
lsof -i :8000

# Kill the process or use different port
uvicorn app.main:app --reload --port 8001
```

### Module Not Found Error
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### Import Error
```bash
# Make sure you're running from backend/ directory
cd backend
uvicorn app.main:app --reload
```

## 🎯 Roadmap

### Phase 1: Core Features (Current)
- [x] User Authentication
- [x] User Management
- [ ] Book CRUD Operations
- [ ] File Upload System

### Phase 2: Reading Features
- [ ] PDF Viewer
- [ ] Reading Progress Tracking
- [ ] Bookmarks & Annotations
- [ ] Search Books

### Phase 3: AI Features
- [ ] Semantic Search
- [ ] Book Recommendations
- [ ] AI Summarization
- [ ] Q&A Chatbot

### Phase 4: Advanced Features
- [ ] Reading Analytics
- [ ] Social Features
- [ ] Mobile App
- [ ] Offline Reading

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Shriparna Prasad** - *Initial work* - [GitHub](https://github.com/S-h-r-i-p-a-r-n-a)

## 🙏 Acknowledgments

- FastAPI for the amazing framework
- Anthropic for AI capabilities
- The open-source community

## 📞 Contact

- **Email**: shriparnaprasad2005@gmail.com
- **GitHub**: [S-h-r-i-p-a-r-n-a](https://github.com/S-h-r-i-p-a-r-n-a)
- **LinkedIn**: [Shriparna Prasad](https://linkedin.com/in/yourprofile)

---

Made with ❤️ for students worldwide


