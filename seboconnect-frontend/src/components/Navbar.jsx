import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      background: '#f0f0f0',
      marginBottom: '2rem'
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        {user && (
          <>
            <Link to="/books" style={{ marginRight: '1rem' }}>Livros</Link>
            <Link to="/add-book">Vender Livro</Link>
          </>
        )}
      </div>
      {user ? (
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      ) : (
        <Link 
          to="/login"
          style={{
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          Login
        </Link>
      )}
    </nav>
  );
}