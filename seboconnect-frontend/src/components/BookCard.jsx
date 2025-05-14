
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="book-card">
      <img 
        src={book.imagem || '/placeholder-book.jpg'} 
        alt={book.titulo}
      />
      <div className="book-info">
        <h3>{book.titulo}</h3>
        <p>Autor: {book.autor}</p>
        <p>Preço: R$ {book.preco.toFixed(2)}</p>
      </div>
    </Link>
  );
}