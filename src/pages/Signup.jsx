import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed');
    }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-8">
        <h2 className="text-2xl font-semibold mb-6">Create your account</h2>
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label-float">Name</label>
            <input className="input" value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="label-float">Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label-float">Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary w-full" type="submit">Sign up</button>
        </form>
        <p className="text-sm text-gray-600 mt-4">Have an account? <Link to="/login" className="text-purple-700">Log in</Link></p>
      </div>
    </div>
  );
}
