import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import './AddBook.css';

export default function AddBook() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editora: "", // Novo campo adicionado
    preco: "",
    descricao: "",
    categoria: 'Outros',
    estado: 'Usado',
  });

  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.titulo || !formData.autor || !formData.preco || !formData.editora) {
      setError('Preencha todos os campos obrigatórios!');
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
      console.error('Erro', err);
    }
  };

  return (
    <div className="addbook-container">
      <h1>Cadastrar Livro</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="addbook-form">
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Autor *</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
          />
        </div>

        {/* Novo campo editora */}
        <div className="form-group">
          <label>Editora *</label>
          <input
            type="text"
            name="editora"
            value={formData.editora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preço (R$) *</label>
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="Didático">Didático</option>
            <option value="Literatura">Literatura</option>
            <option value="Técnico">Técnico</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="Novo">Novo</option>
            <option value="Seminovo">Seminovo</option>
            <option value="Usado">Usado</option>
            <option value="Desgastado">Desgastado</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Livro
        </button>
      </form>
    </div>
  );
}