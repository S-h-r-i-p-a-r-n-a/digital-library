from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Sample library data
books_data = [
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "isbn": "978-0743273565",
        "published_year": 1925,
        "genre": "Fiction",
        "pages": 180,
        "description": "A classic American novel set in the Jazz Age.",
        "cover_url": "https://images.unsplash.com/photo-1543002588-d83cea6e55bb?w=300",
        "rating": 4.8,
        "available": True,
        "added_date": "2024-01-15"
    },
    {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "isbn": "978-0061120084",
        "published_year": 1960,
        "genre": "Fiction",
        "pages": 281,
        "description": "A gripping tale of racial injustice and childhood innocence.",
        "cover_url": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300",
        "rating": 4.9,
        "available": True,
        "added_date": "2024-01-16"
    },
    {
        "id": 3,
        "title": "1984",
        "author": "George Orwell",
        "isbn": "978-0451524935",
        "published_year": 1949,
        "genre": "Dystopian",
        "pages": 328,
        "description": "A dystopian social science fiction novel about totalitarianism.",
        "cover_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300",
        "rating": 4.7,
        "available": False,
        "added_date": "2024-01-17"
    },
    {
        "id": 4,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "isbn": "978-0141439518",
        "published_year": 1813,
        "genre": "Romance",
        "pages": 279,
        "description": "A romantic novel of manners and marriage.",
        "cover_url": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300",
        "rating": 4.6,
        "available": True,
        "added_date": "2024-01-18"
    },
    {
        "id": 5,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "isbn": "978-0316769174",
        "published_year": 1951,
        "genre": "Fiction",
        "pages": 277,
        "description": "A story of teenage rebellion and alienation.",
        "cover_url": "https://images.unsplash.com/photo-1543002588-d83cea6e55bb?w=300",
        "rating": 4.5,
        "available": True,
        "added_date": "2024-01-19"
    },
    {
        "id": 6,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "isbn": "978-0547928227",
        "published_year": 1937,
        "genre": "Fantasy",
        "pages": 310,
        "description": "A fantasy adventure of a hobbit's unexpected journey.",
        "cover_url": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300",
        "rating": 4.8,
        "available": True,
        "added_date": "2024-01-20"
    }
]

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "success",
        "message": "Digital Library API is running",
        "timestamp": datetime.now().isoformat()
    }), 200

# Get all books
@app.route('/api/books', methods=['GET'])
def get_books():
    genre_filter = request.args.get('genre')
    available_filter = request.args.get('available')
    search_query = request.args.get('search')
    
    filtered_books = books_data
    
    if search_query:
        search_query = search_query.lower()
        filtered_books = [b for b in filtered_books if 
                         search_query in b['title'].lower() or 
                         search_query in b['author'].lower()]
    
    if genre_filter:
        filtered_books = [b for b in filtered_books if b['genre'].lower() == genre_filter.lower()]
    
    if available_filter:
        available = available_filter.lower() == 'true'
        filtered_books = [b for b in filtered_books if b['available'] == available]
    
    return jsonify({
        "status": "success",
        "count": len(filtered_books),
        "data": filtered_books
    }), 200

# Get single book
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((b for b in books_data if b['id'] == book_id), None)
    if not book:
        return jsonify({
            "status": "error",
            "message": f"Book with id {book_id} not found"
        }), 404
    
    return jsonify({
        "status": "success",
        "data": book
    }), 200

# Get statistics
@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    total_books = len(books_data)
    available_books = len([b for b in books_data if b['available']])
    genres = list(set([b['genre'] for b in books_data]))
    avg_rating = sum([b['rating'] for b in books_data]) / len(books_data) if books_data else 0
    
    return jsonify({
        "status": "success",
        "data": {
            "total_books": total_books,
            "available_books": available_books,
            "unavailable_books": total_books - available_books,
            "genres": genres,
            "average_rating": round(avg_rating, 2),
            "total_pages": sum([b['pages'] for b in books_data])
        }
    }), 200

# Get genres
@app.route('/api/genres', methods=['GET'])
def get_genres():
    genres = list(set([b['genre'] for b in books_data]))
    return jsonify({
        "status": "success",
        "data": genres
    }), 200

# Add book (POST)
@app.route('/api/books', methods=['POST'])
def add_book():
    try:
        data = request.json
        new_book = {
            "id": max([b['id'] for b in books_data]) + 1,
            "title": data.get('title'),
            "author": data.get('author'),
            "isbn": data.get('isbn'),
            "published_year": data.get('published_year'),
            "genre": data.get('genre'),
            "pages": data.get('pages'),
            "description": data.get('description'),
            "cover_url": data.get('cover_url', 'https://images.unsplash.com/photo-1543002588-d83cea6e55bb?w=300'),
            "rating": data.get('rating', 4.0),
            "available": data.get('available', True),
            "added_date": datetime.now().strftime('%Y-%m-%d')
        }
        books_data.append(new_book)
        return jsonify({
            "status": "success",
            "message": "Book added successfully",
            "data": new_book
        }), 201
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# Update book
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    try:
        book = next((b for b in books_data if b['id'] == book_id), None)
        if not book:
            return jsonify({
                "status": "error",
                "message": f"Book with id {book_id} not found"
            }), 404
        
        data = request.json
        for key, value in data.items():
            if key in book:
                book[key] = value
        
        return jsonify({
            "status": "success",
            "message": "Book updated successfully",
            "data": book
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# Delete book
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books_data
    book = next((b for b in books_data if b['id'] == book_id), None)
    if not book:
        return jsonify({
            "status": "error",
            "message": f"Book with id {book_id} not found"
        }), 404
    
    books_data = [b for b in books_data if b['id'] != book_id]
    return jsonify({
        "status": "success",
        "message": "Book deleted successfully"
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000