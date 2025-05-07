import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
  },
  sobrenome: {
    type: String,
    required: [true, 'O sobrenome é obrigatório'],
    trim: true,
  },
  dataNascimento: {
    type: Date,
    required: [true, 'A data de nascimento é obrigatória'],
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório'],
    unique: true,
    validate: {
      validator: (v) => /^\d{11}$/.test(v), 
      message: 'CPF inválido (deve conter 11 dígitos)',
    },
  },

  // Contato
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'E-mail inválido'], 
  },
  telefone: {
    ddd: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{2}$/.test(v),
        message: 'DDD inválido',
      },
    },
    numero: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{8,9}$/.test(v),
        message: 'Número de telefone inválido',
      },
    },
  },

  cep: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{8}$/.test(v),
      message: 'CEP inválido',
    },
  },
  endereco: {
    tipo: { type: String, required: true }, 
    logradouro: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true, maxlength: 2 },
  },


  senha: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    minlength: [8, 'A senha deve ter no mínimo 8 caracteres'],
    select: false, 
  },
}, { timestamps: true }); 

export default mongoose.model('User', UserSchema);