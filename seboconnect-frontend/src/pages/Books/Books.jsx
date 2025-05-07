import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data.books);
      } catch (err) {
        setError('Erro ao carregar livros. Tente novamente.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando livros...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Livros Disponíveis</h1>
      <p style={{ textAlign: 'center' }}>
        Olá, {user.nome}! Aqui estão os livros cadastrados no sistema.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {books.map((book) => (
          <div 
            key={book._id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{book.titulo}</h3>
            <p><strong>Autor:</strong> {book.autor}</p>
            <p><strong>Preço:</strong> R$ {book.preco.toFixed(2)}</p>
            <p><strong>Estado:</strong> {book.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}