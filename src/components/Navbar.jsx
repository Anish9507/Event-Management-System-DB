import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate('/'); };
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-30 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={32} />
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-purple-700">Home</Link>
          <Link to="/about" className="hover:text-purple-700">About</Link>
          {!user && (
            <>
              <Link to="/login" className="btn-accent">Login</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile" className="hover:text-purple-700">Profile</Link>
              <Link to="/dashboard" className="btn-accent">Dashboard</Link>
              <button onClick={onLogout} className="btn-primary">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
