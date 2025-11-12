"""
Database configuration and session management.
This file sets up the connection to PostgreSQL.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Create database engine
# echo=True will print all SQL queries (useful for debugging)
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # Print SQL queries in debug mode
    pool_pre_ping=True,  # Verify connections before using them
)

# SessionLocal class will be used to create database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all database models
Base = declarative_base()


# Dependency to get database session
def get_db():
    """
    Creates a new database session for each request.
    Automatically closes the session when done.
    
    Usage in FastAPI routes:
    @app.get("/users")
    def get_users(db: Session = Depends(get_db)):
        # use db here
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()