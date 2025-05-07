import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    telefone: {
      ddd: '',
      numero: ''
    },
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
    
    // Trata campos aninhados (ex: "telefone.ddd", "endereco.estado")
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

    // Validação básica dos campos principais
    if (!formData.nome || !formData.email || !formData.senha || !formData.cpf || !formData.dataNascimento) {
      setError('Preencha os campos obrigatórios!');
      return;
    }

    try {
      await api.post('/users/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar. Verifique todos os campos.');
      console.error('Erro no cadastro:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1 style={{ textAlign: 'center' }}>Cadastro</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Dados Pessoais */}
        <input
          type="text"
          name="nome"
          placeholder="Nome *"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome *"
          value={formData.sobrenome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail *"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha * (mínimo 8 caracteres)"
          value={formData.senha}
          onChange={handleChange}
          required
          minLength="8"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF * (apenas números)"
          value={formData.cpf}
          onChange={handleChange}
          required
          pattern="\d{11}"
        />
        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento *"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
        />

        {/* Telefone */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="telefone.ddd"
            placeholder="DDD *"
            value={formData.telefone.ddd}
            onChange={handleChange}
            required
            pattern="\d{2}"
            style={{ width: '60px' }}
          />
          <input
            type="text"
            name="telefone.numero"
            placeholder="Telefone *"
            value={formData.telefone.numero}
            onChange={handleChange}
            required
            pattern="\d{8,9}"
          />
        </div>

        {/* Endereço */}
        <input
          type="text"
          name="cep"
          placeholder="CEP *"
          value={formData.cep}
          onChange={handleChange}
          required
          pattern="\d{8}"
        />
        <select
          name="endereco.tipo"
          value={formData.endereco.tipo}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem' }}
        >
          <option value="">Tipo de Logradouro *</option>
          <option value="Rua">Rua</option>
          <option value="Avenida">Avenida</option>
          <option value="Travessa">Travessa</option>
        </select>
        <input
          type="text"
          name="endereco.logradouro"
          placeholder="Logradouro *"
          value={formData.endereco.logradouro}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco.numero"
          placeholder="Número *"
          value={formData.endereco.numero}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco.complemento"
          placeholder="Complemento"
          value={formData.endereco.complemento}
          onChange={handleChange}
        />
        <input
          type="text"
          name="endereco.bairro"
          placeholder="Bairro *"
          value={formData.endereco.bairro}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco.cidade"
          placeholder="Cidade *"
          value={formData.endereco.cidade}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco.estado"
          placeholder="Estado * (Sigla: SP, RJ...)"
          value={formData.endereco.estado}
          onChange={handleChange}
          required
          maxLength="2"
          style={{ width: '80px' }}
        />

        <button 
          type="submit" 
          style={{ 
            padding: '0.75rem', 
            background: '#28a745', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}