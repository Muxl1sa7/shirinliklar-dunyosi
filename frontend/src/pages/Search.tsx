import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/api';
import type { Product } from '../types';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q),
    );
  }, [products, query]);

  return (
    <div>
      <PageHeader title="Qidiruv natijalari" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {query && (
          <p className="mb-8 text-center text-brown-500">
            "<span className="font-semibold text-brown-700">{query}</span>" bo'yicha {results.length} ta natija
            topildi
          </p>
        )}

        {loading ? (
          <p className="text-center text-brown-400">Yuklanmoqda...</p>
        ) : !query ? (
          <p className="text-center text-brown-400">Qidirish uchun mahsulot nomini kiriting.</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-brown-400">Hech narsa topilmadi. Boshqa so'z bilan urinib ko'ring.</p>
        )}
      </section>
    </div>
  );
}
