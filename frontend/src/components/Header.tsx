import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { GiCupcake } from 'react-icons/gi';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/format';

const navLinks = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/cakes', label: 'Tortlar' },
  { to: '/desserts', label: 'Desertlar' },
  { to: '/custom-order', label: 'Maxsus buyurtma' },
  { to: '/about', label: 'Biz haqimizda' },
  { to: '/contact', label: "Bog'lanish" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { total } = useCart();
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const profileTo = isAuthenticated ? '/profile' : '/login';

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brown-50 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-xl font-bold text-brown-700 sm:text-2xl"
        >
          <GiCupcake className="text-2xl text-brown-400 sm:text-3xl" />
          Sweet Dreams
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brown-600 ${
                  isActive ? 'text-brown-700' : 'text-brown-800/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="hidden text-brown-700 transition-colors hover:text-brown-400 sm:block"
            aria-label="Qidirish"
          >
            <FiSearch size={20} />
          </button>
          <Link
            to={profileTo}
            className="hidden text-brown-700 transition-colors hover:text-brown-400 sm:block"
            aria-label="Profil"
          >
            <FiUser size={20} />
          </Link>
          <Link
            to="/favorites"
            className="relative text-brown-700 transition-colors hover:text-brown-400"
            aria-label="Sevimlilar"
          >
            <FiHeart size={20} />
            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brown-700 text-[10px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-brown-700 px-2.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brown-600 sm:px-4"
          >
            <FiShoppingCart size={18} />
            <span className="hidden sm:inline">{formatPrice(total)}</span>
          </Link>
          <button
            className="text-brown-700 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menyu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-brown-50 px-3 py-3 sm:px-6 lg:px-8">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-7xl items-center gap-3">
            <FiSearch className="shrink-0 text-brown-400" size={18} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Mahsulot qidirish..."
              className="w-full bg-transparent text-sm text-brown-800 outline-none placeholder:text-brown-300"
            />
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setQuery('');
              }}
              className="shrink-0 text-brown-400 transition-colors hover:text-brown-700"
              aria-label="Qidiruvni yopish"
            >
              <FiX size={18} />
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brown-50 px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-brown-50 text-brown-700' : 'text-brown-800/70 hover:bg-brown-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to={profileTo}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-brown-50 text-brown-700' : 'text-brown-800/70 hover:bg-brown-50'
              }`
            }
          >
            {isAuthenticated ? 'Profil' : 'Kirish'}
          </NavLink>
        </nav>
      )}
    </header>
  );
}
