import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-8">
        <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label-float">Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label-float">Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
        <p className="text-sm text-gray-600 mt-4">No account? <Link to="/signup" className="text-purple-700">Sign up</Link></p>
      </div>
    </div>
  );
}
