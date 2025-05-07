import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

export default function AddBook() {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    preco: '',
    descricao: '',
    categoria: 'Outros',
    estado: 'Usado',
  });
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.titulo || !formData.autor || !formData.preco) {
      setError('Preencha os campos obrigatórios!');
      return;
    }

    try {
      await api.post('/books', {
        ...formData,
        preco: parseFloat(formData.preco), 
      });
      navigate('/books'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar livro. Tente novamente.');
      console.error('Erro:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1 style={{ textAlign: 'center' }}>Cadastrar Livro</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título *"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor *"
          value={formData.autor}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço (R$) *"
          value={formData.preco}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          rows="3"
        />
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          style={{ padding: '0.5rem' }}
        >
          <option value="Didático">Didático</option>
          <option value="Literatura">Literatura</option>
          <option value="Técnico">Técnico</option>
          <option value="Outros">Outros</option>
        </select>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          style={{ padding: '0.5rem' }}
        >
          <option value="Novo">Novo</option>
          <option value="Seminovo">Seminovo</option>
          <option value="Usado">Usado</option>
          <option value="Desgastado">Desgastado</option>
        </select>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cadastrar Livro
        </button>
      </form>
    </div>
  );
}