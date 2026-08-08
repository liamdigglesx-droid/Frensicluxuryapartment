// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: 8, fontSize: '0.875rem' },
            success: { iconTheme: { primary: '#c9a84c', secondary: '#fff' } },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/apartments/:id" element={<ApartmentDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <main style={{ paddingTop: 120, textAlign: 'center', minHeight: '60vh' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: 16 }}>404</h1>
              <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Page not found</p>
              <a href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Go Home
              </a>
            </main>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
