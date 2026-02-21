import React, { useState } from 'react';
import './BookDetail.css';

function BookDetail({ book, onUpdate, onDelete, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
  };

  const handleSave = () => {
    onUpdate(book.id, editedBook);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete(book.id);
    }
  };

  return (
    <div className="book-detail-container">
      <button className="back-btn" onClick={onBack}>← Back to List</button>

      <div className="book-detail">
        <div className="detail-cover">
          <img src={editedBook.cover_url} alt={editedBook.title} />
        </div>

        <div className="detail-content">
          {!isEditing ? (
            <>
              <h1>{editedBook.title}</h1>
              <p className="author">by {editedBook.author}</p>
              
              <div className="detail-meta">
                <div className="meta-item">
                  <span className="label">ISBN:</span>
                  <span className="value">{editedBook.isbn}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Genre:</span>
                  <span className="value">{editedBook.genre}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Published:</span>
                  <span className="value">{editedBook.published_year}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Pages:</span>
                  <span className="value">{editedBook.pages}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Rating:</span>
                  <span className="value">⭐ {editedBook.rating}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Availability:</span>
                  <span className={`value ${editedBook.available ? 'available' : 'unavailable'}`}>  
                    {editedBook.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <div className="description-section">
                <h2>Description</h2>
                <p>{editedBook.description}</p>
              </div>

              <div className="actions">
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={editedBook.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Author</label>
                <input 
                  type="text" 
                  name="author" 
                  value={editedBook.author}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>ISBN</label>
                <input 
                  type="text" 
                  name="isbn" 
                  value={editedBook.isbn}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Genre</label>
                <input 
                  type="text" 
                  name="genre" 
                  value={editedBook.genre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Published Year</label>
                <input 
                  type="number" 
                  name="published_year" 
                  value={editedBook.published_year}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Pages</label>
                <input 
                  type="number" 
                  name="pages" 
                  value={editedBook.pages}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <input 
                  type="number" 
                  name="rating" 
                  min="0"
                  max="5"
                  step="0.1"
                  value={editedBook.rating}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Available</label>
                <input 
                  type="checkbox" 
                  name="available" 
                  checked={editedBook.available}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Cover URL</label>
                <input 
                  type="text" 
                  name="cover_url" 
                  value={editedBook.cover_url}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={editedBook.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => { setEditedBook(book); setIsEditing(false); }}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;