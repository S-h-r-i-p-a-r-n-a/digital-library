import React, { useState } from 'react';
import './AddBook.css';

function AddBook({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    published_year: new Date().getFullYear(),
    genre: 'Fiction',
    pages: 0,
    description: '',
    cover_url: 'https://images.unsplash.com/photo-1543002588-d83cea6e55bb?w=300',
    rating: 4.0,
    available: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.author.trim()) {
      onAdd(formData);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        published_year: new Date().getFullYear(),
        genre: 'Fiction',
        pages: 0,
        description: '',
        cover_url: 'https://images.unsplash.com/photo-1543002588-d83cea6e55bb?w=300',
        rating: 4.0,
        available: true
      });
    }
  };

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Fantasy', 'Science Fiction', 'Biography', 'History', 'Self-Help', 'Poetry'];

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter book title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
            />
          </div>
          <div className="form-group">
            <label htmlFor="published_year">Published Year</label>
            <input
              type="number"
              id="published_year"
              name="published_year"
              value={formData.published_year}
              onChange={handleChange}
              min="1000"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pages">Pages</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating">Rating (0-5)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="available">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="cover_url">Cover URL</label>
          <input
            type="text"
            id="cover_url"
            name="cover_url"
            value={formData.cover_url}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            rows="5"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Book</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;