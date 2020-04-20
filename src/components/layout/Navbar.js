import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(search);
    setSearch("");
  };
  const handleChange = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div>
      <nav className="navbar">
        <h1>
          <i className="fas fa-university" />
          <Link to={"/"}>Poster Finder</Link>
        </h1>
        <form onSubmit={handleSubmit} className="form-control">
          <input
            type="text"
            className="input"
            value={search}
            onChange={handleChange}
            placeholder="Enter your search item.."
          />
          <button type="submit" className="search btn-sm btn-success">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
}
