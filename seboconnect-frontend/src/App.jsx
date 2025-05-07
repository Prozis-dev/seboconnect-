import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Books from './pages/Books/Books';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AddBook from './pages/AddBook/AddBook';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/books" 
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-book" 
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;