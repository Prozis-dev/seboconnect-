import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Register.css'; // Usando estilo semelhante ao login

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    telefone: { ddd: '', numero: '' },
    cep: '',
    endereco: {
      tipo: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nome || !formData.email || !formData.senha || !formData.cpf) {
      setError('Preencha os campos obrigatórios!');
      return;
    }

    try {
      await api.post('/users/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar. Verifique os campos.');
    }
  };

  return (
    <div className="login-container">
      <h1>Cadastre-se</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        {/* Dados Pessoais */}
        <input
          type="text"
          name="nome"
          placeholder="Nome *"
          value={formData.nome}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          className="login-input"
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail *"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha * (mínimo 8 caracteres)"
          value={formData.senha}
          onChange={handleChange}
          className="login-input"
          minLength="8"
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF * (apenas números)"
          value={formData.cpf}
          onChange={handleChange}
          className="login-input"
          pattern="\d{11}"
          required
        />

        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          className="login-input"
        />

        {/* Telefone */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="telefone.ddd"
            placeholder="DDD *"
            value={formData.telefone.ddd}
            onChange={handleChange}
            className="login-input"
            style={{ width: '80px' }}
            pattern="\d{2}"
            required
          />
          <input
            type="text"
            name="telefone.numero"
            placeholder="Telefone *"
            value={formData.telefone.numero}
            onChange={handleChange}
            className="login-input"
            pattern="\d{8,9}"
            required
          />
        </div>

        {/* Endereço */}
        <input
          type="text"
          name="cep"
          placeholder="CEP *"
          value={formData.cep}
          onChange={handleChange}
          className="login-input"
          pattern="\d{8}"
          required
        />

        <select
          name="endereco.tipo"
          value={formData.endereco.tipo}
          onChange={handleChange}
          className="login-input"
          required
        >
          <option value="">Tipo de Logradouro *</option>
          <option value="Rua">Rua</option>
          <option value="Avenida">Avenida</option>
        </select>

        <input
          type="text"
          name="endereco.logradouro"
          placeholder="Logradouro *"
          value={formData.endereco.logradouro}
          onChange={handleChange}
          className="login-input"
          required
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="endereco.numero"
            placeholder="Número *"
            value={formData.endereco.numero}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="text"
            name="endereco.complemento"
            placeholder="Complemento"
            value={formData.endereco.complemento}
            onChange={handleChange}
            className="login-input"
          />
        </div>

        <input
          type="text"
          name="endereco.bairro"
          placeholder="Bairro *"
          value={formData.endereco.bairro}
          onChange={handleChange}
          className="login-input"
          required
        />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="endereco.cidade"
            placeholder="Cidade *"
            value={formData.endereco.cidade}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="text"
            name="endereco.estado"
            placeholder="UF *"
            value={formData.endereco.estado}
            onChange={handleChange}
            className="login-input"
            style={{ width: '80px' }}
            maxLength="2"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Cadastrar
        </button>
      </form>

      <p className="register-link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}