import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { GiCupcake } from 'react-icons/gi';
import { useCart } from '../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cakes', label: 'Cakes' },
  { to: '/desserts', label: 'Desserts' },
  { to: '/custom-order', label: 'Custom Order' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { total } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brown-50 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-brown-700">
          <GiCupcake className="text-3xl text-brown-400" />
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

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="hidden text-brown-700 transition-colors hover:text-brown-400 sm:block" aria-label="Qidirish">
            <FiSearch size={20} />
          </button>
          <button className="hidden text-brown-700 transition-colors hover:text-brown-400 sm:block" aria-label="Profil">
            <FiUser size={20} />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-brown-700 px-4 py-2 text-sm font-medium text-white">
            <FiShoppingCart size={18} />
            ${total.toFixed(2)}
          </div>
          <button
            className="text-brown-700 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menyu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

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
        </nav>
      )}
    </header>
  );
}
