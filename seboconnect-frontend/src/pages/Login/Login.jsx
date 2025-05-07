import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação simples
    if (!email || !senha) {
      setError('Preencha todos os campos!');
      return;
    }

    try {
      await login(email, senha);
      navigate('/books'); 
    } catch (err) {
      setError('E-mail ou senha incorretos');
      console.error('Erro no login:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '0.5rem', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}