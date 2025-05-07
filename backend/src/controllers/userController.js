import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';
const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    console.log('Dados recebidos no cadastro:', req.body);

    const { 
      nome, 
      sobrenome, 
      email, 
      senha, 
      cpf,
      dataNascimento,
      telefone,
      cep,
      endereco
    } = req.body;

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { cpf }] });
    if (userExists) {
      return res.status(400).json({ 
        error: 'E-mail ou CPF já cadastrado',
        details: userExists.email === email ? 'E-mail já existe' : 'CPF já existe'
      });
    }

    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
    console.log('Senha criptografada com sucesso');

    const newUser = await User.create({
      nome,
      sobrenome,
      email,
      senha: hashedPassword,
      cpf,
      dataNascimento,
      telefone,
      cep,
      endereco
    });


    const userResponse = newUser.toObject();
    delete userResponse.senha;

    console.log('Usuário criado com ID:', newUser._id);
    return res.status(201).json({ 
      success: true,
      user: userResponse 
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ 
      error: 'Erro ao cadastrar usuário',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


export const login = async (req, res) => {
  try {
    console.log('Tentativa de login:', req.body.email);

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const user = await User.findOne({ email }).select('+senha');
    
    if (!user) {
      console.log('Usuário não encontrado para:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      console.log('Senha incorreta para:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    const userResponse = user.toObject();
    delete userResponse.senha;

    console.log('Login bem-sucedido para:', email);
    return res.status(200).json({
      success: true,
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ 
      error: 'Erro ao fazer login',
      details: error.message
    });
  }
};

export const listUsers = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  try {
    const users = await User.find({}).select('-senha');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logout realizado' });
};