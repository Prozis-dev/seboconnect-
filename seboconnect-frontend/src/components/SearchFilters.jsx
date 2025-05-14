import { useState } from 'react';
import api from '../../services/api';

export default function SearchFilters({ onSearch }) {
  const [filters, setFilters] = useState({
    titulo: '',
    autor: '',
    editor: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/books', { params: filters });
      onSearch(response.data.books);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={filters.titulo}
        onChange={handleChange}
      />
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={filters.autor}
        onChange={handleChange}
      />
      <input
        type="text"
        name="editor"
        placeholder="Editora"
        value={filters.editor}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}