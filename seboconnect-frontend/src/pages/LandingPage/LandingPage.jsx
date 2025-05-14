// src/pages/LandingPage/LandingPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './LandingPage.css'; // Arquivo CSS para estilos (crie na mesma pasta)

export default function LandingPage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await api.get('/books?limit=6'); // Limita a 6 livros em destaque
        setFeaturedBooks(response.data.books);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    fetchFeaturedBooks();
  }, []);

  return (
    <div className="landing-container">
      <section className="hero-section">
        <h1>Encontre livros incríveis a preços acessíveis</h1>
        <p>Compre, venda ou troque com a comunidade acadêmica da UEPB.</p>
      </section>

      <section className="featured-books">
        <h2>Livros em Destaque</h2>
        <div className="books-grid">
          {featuredBooks.map((book) => (
            <Link to={`/books/${book._id}`} key={book._id} className="book-card">
              <div className="book-image">
                <img 
                  src={book.imagem || '/placeholder-book.jpg'} 
                  alt={book.titulo} 
                />
              </div>
              <div className="book-details">
                <h3>{book.titulo}</h3>
                <p className="author">{book.autor}</p>
                <p className="price">R$ {book.preco.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/books" className="see-all-button">Ver todos os livros</Link>
      </section>
    </div>
  );
}