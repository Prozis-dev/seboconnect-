import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório']
  },
  preco: {
    type: Number,
    required: [true, 'O preço é obrigatório'],
    min: [0, 'O preço não pode ser negativo']
  },
  descricao: {
    type: String,
    maxlength: [500, 'A descrição deve ter no máximo 500 caracteres']
  },
  categoria: {
    type: String,
    enum: ['Didático', 'Literatura', 'Técnico', 'Outros'],
    default: 'Outros'
  },
  estado: {
    type: String,
    enum: ['Novo', 'Seminovo', 'Usado', 'Desgastado'],
    required: true
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagem: {
    type: String 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Book', bookSchema);