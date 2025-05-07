import express from 'express';
import { 
  createBook, 
  getBooks, 
  getBookDetails 
} from '../controllers/bookController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks); 
router.get('/:id', getBookDetails); 

router.post('/', authMiddleware, createBook); 

router.get('/test', (req, res) => {
  res.json({ 
    message: "Conexão backend-frontend OK!",
    books: [
      { titulo: "Exemplo 1", autor: "Autor Teste" },
      { titulo: "Exemplo 2", autor: "Autor Teste" }
    ]
  });
});

export default router;