import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/api';
import type { DessertCategory, Product } from '../types';

const tabs: { label: string; value: DessertCategory | 'all' }[] = [
  { label: 'Barchasi', value: 'all' },
  { label: 'Makaronlar', value: 'macarons' },
  { label: 'Kapkeyklar', value: 'cupcakes' },
  { label: 'Braunilar', value: 'brownies' },
  { label: 'Pechenelar', value: 'cookies' },
  { label: 'Donutlar', value: 'donuts' },
  { label: 'Kremli desertlar', value: 'creamy' },
  { label: 'Parhez', value: 'diet' },
];

const PAGE_SIZE = 8;

export default function Desserts() {
  const [desserts, setDesserts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DessertCategory | 'all'>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts({ type: 'dessert' })
      .then((data) => setDesserts(data.products))
      .catch(() => setDesserts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (activeTab === 'all' ? desserts : desserts.filter((item) => item.category === activeTab)),
    [desserts, activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTabChange = (value: DessertCategory | 'all') => {
    setActiveTab(value);
    setPage(1);
  };

  return (
    <div>
      <PageHeader title="Desertlar" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-brown-700 text-white'
                  : 'bg-cream text-brown-600 hover:bg-brown-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-brown-400">Yuklanmoqda...</p>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {paginated.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-brown-400">Bu kategoriyada hozircha mahsulot yo'q.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === pageNumber
                    ? 'bg-brown-700 text-white'
                    : 'bg-cream text-brown-600 hover:bg-brown-100'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-sm font-medium text-brown-600 transition-colors hover:bg-brown-100"
              aria-label="Keyingi sahifa"
            >
              »
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
