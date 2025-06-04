import Book from '../models/book.js';

export const createBook = async (req, res) => {
  try {
    const { titulo, autor, editora, preco, descricao, categoria, estado } = req.body; // Adicionado 'editora'

    const newBook = await Book.create({
      titulo,
      autor,
      editora, // Adicionado 'editora'
      preco,
      descricao,
      categoria,
      estado,
      vendedor: req.user._id
    });

    res.status(201).json({
      success: true,
      book: newBook
    });

  } catch (error) {
    res.status(500).json({
      error: 'Erro ao criar livro',
      details: error.message
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('vendedor', 'nome email cidade estado');

    res.status(200).json({
      success: true,
      books
    });

  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar livros',
      details: error.message
    });
  }
};

export const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('vendedor', '-senha');

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.status(200).json({
      success: true,
      book
    });

  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar livro',
      details: error.message
    });
  }
};