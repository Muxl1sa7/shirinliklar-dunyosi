import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <PageHeader title="Sevimlilar" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <FiHeart size={48} className="text-brown-200" />
            <p className="text-brown-400">Sevimlilar ro'yxati bo'sh.</p>
            <Link
              to="/cakes"
              className="rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
            >
              Tortlarni ko'rish
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
