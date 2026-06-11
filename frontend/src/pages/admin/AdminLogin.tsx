import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLogin() {
  const { isAuthenticated, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.message ?? "Login yoki parol noto'g'ri");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-slate-800">Admin kirish</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Boshqaruv paneliga kirish uchun login va parolni kiriting
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Login</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none focus:border-slate-500"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
          >
            {submitting ? 'Kirilmoqda...' : 'Kirish'}
          </button>

          <p className="text-center text-xs text-slate-400">
            <Link to="/login" className="hover:text-slate-600 hover:underline">
              Mijoz sifatida kirish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
