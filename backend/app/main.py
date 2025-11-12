"""
Main FastAPI application entry point.
"""
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    """Root endpoint - API health check"""
    return {
        "message": "Welcome to Digital Library API",
    }

@app.get('/health')
def health_check():
    return {
        "status": "healthy"
    }