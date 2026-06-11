import { Link } from 'react-router-dom';
import { useEffect, useState, type SubmitEvent } from 'react';
import { FiTruck, FiAward, FiFeather } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getProducts, subscribeNewsletter } from '../lib/api';
import type { Product } from '../types';

const categories = [
  {
    name: 'Tortlar',
    count: '12 ta mahsulot',
    to: '/cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kapkeyklar',
    count: '18 ta mahsulot',
    to: '/desserts',
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Desertlar',
    count: '20 ta mahsulot',
    to: '/desserts',
    image: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Makaronlar',
    count: '15 ta mahsulot',
    to: '/desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80',
  },
];

const features = [
  {
    icon: FiFeather,
    title: 'Yangi ingredientlar',
    description: 'Faqat eng yangi va sifatli mahsulotlardan foydalanamiz.',
  },
  {
    icon: FiTruck,
    title: 'Tezkor yetkazib berish',
    description: 'Buyurtmalaringizni tez va ishonchli yetkazib beramiz.',
  },
  {
    icon: FiAward,
    title: 'Yuqori sifat',
    description: 'Har bir shirinligimiz katta sevgi bilan tayyorlanadi.',
  },
];

const bestSellerIds = ['chocolate-dream', 'red-velvet-cake', 'caramel-cake', 'ferrero-rocher-cake'];

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const ordered = bestSellerIds
          .map((id) => data.products.find((product) => product.id === id))
          .filter((product): product is Product => Boolean(product));
        setBestSellers(ordered);
      })
      .catch(() => setBestSellers([]));
  }, []);

  const handleSubscribe = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brown-400">Sevgi bilan qo'lda tayyorlangan</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-brown-800 sm:text-5xl lg:text-6xl">
              Har Bir Bayram Uchun Mazali Tortlar
            </h1>
            <p className="mt-5 max-w-md text-brown-600">
              Biz eng sifatli mahsulotlardan foydalanib, siz uchun mazali shirinliklarni
              eng nafis tarzda tayyorlaymiz.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/custom-order"
                className="rounded-full bg-brown-700 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
              >
                Hozir buyurtma bering
              </Link>
              <Link
                to="/cakes"
                className="rounded-full border border-brown-700 px-7 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
              >
                Menyuni ko'rish
              </Link>
            </div>
            <div className="mt-10 flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${i === 0 ? 'w-6 bg-brown-700' : 'w-2 bg-brown-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
              alt="Shokoladli tort"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-brown-800 sm:text-4xl">
          Mashhur Kategoriyalar
        </h2>
        <div className="mx-auto mt-2 mb-10 h-1 w-16 rounded-full bg-brown-300" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.to}
              className="group overflow-hidden rounded-2xl border border-brown-50 bg-white text-center shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-brown-800">{category.name}</h3>
                <p className="text-sm text-brown-400">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <feature.icon size={26} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-brown-800">{feature.title}</h3>
              <p className="mt-1 text-sm text-brown-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-brown-800 sm:text-4xl">Eng Ko'p Sotilganlar</h2>
        <div className="mx-auto mt-2 mb-10 h-1 w-16 rounded-full bg-brown-300" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offer */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1542124948-dc391252a940?auto=format&fit=crop&w=1400&q=80"
            alt="Maxsus taklif"
            className="h-72 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center bg-brown-900/60 px-8 sm:px-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-brown-100">Maxsus Taklif</p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-bold text-white sm:text-4xl">
              Birinchi Buyurtmangizga 20% Chegirma Oling
            </h2>
            <Link
              to="/cakes"
              className="mt-6 rounded-full bg-white px-7 py-3 text-sm font-semibold text-brown-800 transition-colors hover:bg-brown-100"
            >
              Hozir buyurtma bering
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-cream lg:grid-cols-2">
          <div className="px-8 py-12 sm:px-12">
            <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">
              Yangiliklarga Obuna Bo'ling
            </h2>
            <p className="mt-3 max-w-md text-brown-500">
              Yangiliklar va chegirmalar haqida birinchilardan bo'lib xabardor bo'ling.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                className="w-full rounded-full border border-brown-200 bg-white px-5 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
              <button
                type="submit"
                className="rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
              >
                Obuna bo'lish
              </button>
            </form>
            {subscribed && <p className="mt-3 text-sm font-medium text-green-600">Obuna bo'lganingiz uchun rahmat!</p>}
          </div>
          <div className="hidden h-full lg:block">
            <img
              src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80"
              alt="Cupcake"
              className="h-full max-h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
