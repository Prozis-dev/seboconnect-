import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './BookDetails.css';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data.book);
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (!book) return <div className="error">Livro não encontrado</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-grid">
        <div className="book-image">
          <img
            src={book.imagem || '/placeholder-book.jpg'}
            alt={book.titulo}
          />
        </div>
        
        <div className="book-info">
          <h1>{book.titulo}</h1>
          <p className="author">por {book.autor}</p>
          
          <div className="price-section">
            <span className="price">R$ {book.preco.toFixed(2)}</span>
            <span className={`condition ${book.estado.toLowerCase()}`}>
              {book.estado}
            </span>
          </div>

          <div className="details-section">
            <h3>Detalhes</h3>
            <ul>
              <li><strong>Editora:</strong> {book.editora}</li>
              <li><strong>Categoria:</strong> {book.categoria}</li>
              <li><strong>Ano:</strong> {new Date(book.createdAt).getFullYear()}</li>
            </ul>
          </div>

          <div className="description">
            <h3>Descrição</h3>
            <p>{book.descricao || 'Nenhuma descrição fornecida.'}</p>
          </div>

          <Link to={`/user/${book.vendedor._id}`} className="seller-link">
            Ver outros livros deste vendedor
          </Link>
        </div>
      </div>
    </div>
  );
}