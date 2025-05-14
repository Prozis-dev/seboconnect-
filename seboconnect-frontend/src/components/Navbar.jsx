import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('titulo');
  const navigate = useNavigate();

  const handleSimpleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?${filter}=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/books');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          SeboConnect
        </Link>

        <form onSubmit={handleSimpleSearch} className="search-form">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-filter"
          >
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
            <option value="editora">Editora</option>
          </select>
          <input
            type="text"
            placeholder="Pesquisar livros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/add-book" className="nav-link">Vender Livro</Link>
            <button onClick={logout} className="logout-button">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
