import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { isAuthenticated, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await login({ email, password });
    setSubmitting(false);

    if (result.success) {
      navigate('/profile', { replace: true });
    } else {
      setError(result.message ?? "Email yoki parol noto'g'ri");
    }
  };

  return (
    <div>
      <PageHeader title="Kirish" />

      <section className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brown-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brown-700">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brown-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
          >
            {submitting ? 'Kirilmoqda...' : 'Kirish'}
          </button>

          <p className="text-center text-sm text-brown-500">
            Akkountingiz yo'qmi?{' '}
            <Link to="/register" className="font-semibold text-brown-700 hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>

          <p className="text-center text-xs text-brown-300">
            <Link to="/admin/login" className="hover:text-brown-500 hover:underline">
              Admin sifatida kirish
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
