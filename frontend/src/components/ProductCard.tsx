import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../lib/format';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <div className="group overflow-hidden rounded-2xl border border-brown-50 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(product)}
          aria-label={`${product.name} sevimlilarga qo'shish`}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white ${
            favorite ? 'text-red-500' : 'text-brown-400'
          }`}
        >
          <FiHeart size={16} fill={favorite ? 'currentColor' : 'none'} />
        </button>
        {product.dietFriendly && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            Parhez uchun
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div>
          <Link to={`/product/${product.id}`} className="font-display text-base font-semibold text-brown-800 hover:text-brown-500">
            {product.name}
          </Link>
          <p className="mt-1 text-sm font-medium text-brown-500">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={() => addToCart(product)}
          aria-label={`${product.name} savatga qo'shish`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brown-50 text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
        >
          <FiShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}
