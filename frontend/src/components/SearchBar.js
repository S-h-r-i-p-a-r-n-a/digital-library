import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [genres, setGenres] = useState([
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 
    'Fantasy', 'Science Fiction', 'Biography', 'History', 
    'Self-Help', 'Poetry', 'Dystopian'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = { genre: '', available: '', search: '' };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="🔍 Search by title or author..."
          value={localFilters.search}
          onChange={handleInputChange}
          className="search-input"
        />

        <select
          name="genre"
          value={localFilters.genre}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select
          name="available"
          value={localFilters.available}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">All Books</option>
          <option value="true">Available Only</option>
          <option value="false">Unavailable Only</option>
        </select>

        <button onClick={handleReset} className="reset-btn">Reset</button>
      </div>
    </div>
  );
}

export default SearchBar;