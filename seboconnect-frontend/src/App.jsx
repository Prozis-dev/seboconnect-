import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Books from './pages/Books/Books';
import BookDetails from './pages/BookDetails/BookDetails';
import AddBook from './pages/AddBook/AddBook';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Rota pública (página inicial) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rotas públicas de autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rota de livros (pública para busca) */}
          <Route path="/books" element={<Books />} />
          
          {/* Rotas protegidas */}
          <Route path="/books/:id" element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          } />
          <Route path="/add-book" element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;