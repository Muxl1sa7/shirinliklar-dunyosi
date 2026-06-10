import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group overflow-hidden rounded-2xl border border-brown-50 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
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
