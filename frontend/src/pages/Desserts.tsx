import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { desserts } from '../data/products';
import type { DessertCategory } from '../types';

const tabs: { label: string; value: DessertCategory | 'all' }[] = [
  { label: 'Barchasi', value: 'all' },
  { label: 'Makaronlar', value: 'macarons' },
  { label: 'Kapkeyklar', value: 'cupcakes' },
  { label: 'Braunilar', value: 'brownies' },
  { label: 'Pechenelar', value: 'cookies' },
  { label: 'Donutlar', value: 'donuts' },
  { label: 'Kremli desertlar', value: 'creamy' },
];

export default function Desserts() {
  const [activeTab, setActiveTab] = useState<DessertCategory | 'all'>('all');

  const filtered = useMemo(
    () => (activeTab === 'all' ? desserts : desserts.filter((item) => item.category === activeTab)),
    [activeTab],
  );

  return (
    <div>
      <PageHeader title="Desertlar" />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
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

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-brown-400">Bu kategoriyada hozircha mahsulot yo'q.</p>
        )}
      </section>
    </div>
  );
}
