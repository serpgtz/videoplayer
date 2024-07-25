import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SearchForm = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const [busqueda, setBusqueda] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(busqueda);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        aria-label="Search"
        className="form-control me-2"
        placeholder="Search"
        type="search"
        value={busqueda}
        onChange={handleChange}
      />
      <button className="btn btn-outline-primary" type="submit">
        Search
      </button>
    </form>
  );
};

const Navbar = ({ onSearch }: { onSearch: (search: string) => void }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="row w-100 justify-content-between">
          <div className="col-auto">
            <Link className="navbar-brand" to="/">
              Videos Favoritos Sergio
            </Link>
          </div>
          <div className="col-auto">
            <button
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-bs-target="#navbarSupportedContent"
              data-bs-toggle="collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="col-auto collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/new-video">
                  Create New Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/videos">
                  Videos List
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-auto">
            <SearchForm onSearch={onSearch} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
