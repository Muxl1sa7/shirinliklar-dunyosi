import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { cakes } from '../data/products';
import type { CakeCategory } from '../types';

const tabs: { label: string; value: CakeCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Fruit', value: 'fruit' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Special', value: 'special' },
];

const PAGE_SIZE = 6;

export default function Cakes() {
  const [activeTab, setActiveTab] = useState<CakeCategory | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activeTab === 'all' ? cakes : cakes.filter((cake) => cake.category === activeTab)),
    [activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTabChange = (value: CakeCategory | 'all') => {
    setActiveTab(value);
    setPage(1);
  };

  return (
    <div>
      <PageHeader title="Our Cakes" />

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

        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {paginated.map((cake) => (
              <ProductCard key={cake.id} product={cake} />
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
