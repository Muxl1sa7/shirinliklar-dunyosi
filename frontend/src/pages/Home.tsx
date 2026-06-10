import { Link } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { FiTruck, FiAward, FiFeather } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../data/products';
import { subscribeNewsletter } from '../lib/api';

const categories = [
  {
    name: 'Cakes',
    count: '12 Items',
    to: '/cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Cupcakes',
    count: '18 Items',
    to: '/desserts',
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Desserts',
    count: '20 Items',
    to: '/desserts',
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Macarons',
    count: '15 Items',
    to: '/desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80',
  },
];

const features = [
  {
    icon: FiFeather,
    title: 'Fresh Ingredients',
    description: 'Faqat eng yangi va sifatli mahsulotlardan foydalanamiz.',
  },
  {
    icon: FiTruck,
    title: 'Fast Delivery',
    description: 'Buyurtmalaringizni tez va ishonchli yetkazib beramiz.',
  },
  {
    icon: FiAward,
    title: 'Premium Quality',
    description: 'Har bir shirinligimiz katta sevgi bilan tayyorlanadi.',
  },
];

const bestSellerIds = ['chocolate-dream', 'red-velvet-cake', 'caramel-cake', 'ferrero-rocher-cake'];

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
            <p className="text-sm font-semibold uppercase tracking-widest text-brown-400">Handmade with love</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-brown-800 sm:text-5xl lg:text-6xl">
              Delicious Cakes For Every Occasion
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
                Order Now
              </Link>
              <Link
                to="/cakes"
                className="rounded-full border border-brown-700 px-7 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
              >
                View Menu
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
          Popular Categories
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
        <h2 className="text-center font-display text-3xl font-bold text-brown-800 sm:text-4xl">Best Sellers</h2>
        <div className="mx-auto mt-2 mb-10 h-1 w-16 rounded-full bg-brown-300" />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {bestSellerIds.map((id) => {
            const product = getProductById(id);
            if (!product) return null;
            return <ProductCard key={id} product={product} />;
          })}
        </div>
      </section>

      {/* Special Offer */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=1400&q=80"
            alt="Maxsus taklif"
            className="h-72 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center bg-brown-900/60 px-8 sm:px-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-brown-100">Special Offer</p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-bold text-white sm:text-4xl">
              Get 20% Off On Your First Order
            </h2>
            <Link
              to="/cakes"
              className="mt-6 rounded-full bg-white px-7 py-3 text-sm font-semibold text-brown-800 transition-colors hover:bg-brown-100"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-cream lg:grid-cols-2">
          <div className="px-8 py-12 sm:px-12">
            <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">
              Subscribe To Our Newsletter
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
                placeholder="Your email address"
                className="w-full rounded-full border border-brown-200 bg-white px-5 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
              <button
                type="submit"
                className="rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
              >
                Subscribe
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
