import Book from '../models/book.js';

export const createBook = async (req, res) => {
  try {
    const { titulo, autor, preco, descricao, categoria, estado, editor } = req.body;
    
    const newBook = await Book.create({
      titulo,
      autor,
      preco,
      descricao,
      categoria,
      estado,
      editor, // Adicionado campo editor
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
    const { titulo, autor, editor, limit } = req.query;
    const filters = {};

    // Filtros dinâmicos
    if (titulo) filters.titulo = { $regex: titulo, $options: 'i' };
    if (autor) filters.autor = { $regex: autor, $options: 'i' };
    if (editor) filters.editor = { $regex: editor, $options: 'i' };

    // Limite de resultados (para a Landing Page)
    const query = Book.find(filters).populate('vendedor', 'nome cidade');
    if (limit) query.limit(parseInt(limit));

    const books = await query;

    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros', details: error.message });
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