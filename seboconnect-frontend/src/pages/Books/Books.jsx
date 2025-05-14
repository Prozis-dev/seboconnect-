import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './Books.css';

export default function Books() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        console.log('Parâmetros da busca:', params); // Debug
        const response = await api.get('/books', { params });
        console.log('Resposta da API:', response.data); // Debug
        setBooks(response.data.books);
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  if (loading) {
    return <div className="loading">Carregando livros...</div>;
  }

  return (
    <div className="books-container">
      <h2>Livros Disponíveis</h2>
      
      {books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <h3>{book.titulo}</h3>
              <p><strong>Autor:</strong> {book.autor}</p>
              <p><strong>Preço:</strong> R$ {book.preco.toFixed(2)}</p>
              <Link to={`/books/${book._id}`} className="details-link">
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          Nenhum livro encontrado com esses critérios de busca.
        </div>
      )}
    </div>
  );
}