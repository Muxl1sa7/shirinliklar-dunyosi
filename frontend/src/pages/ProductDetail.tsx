import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiFeather, FiTruck, FiShield, FiMinus, FiPlus } from 'react-icons/fi';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

const features = [
  { icon: FiFeather, label: 'Yangi ingredientlar' },
  { icon: FiTruck, label: 'Tezkor yetkazib berish' },
  { icon: FiShield, label: '100% Sifat' },
];

const sampleReviews = [
  {
    name: 'Dilnoza A.',
    text: "Juda mazali va chiroyli bezatilgan! Oilaviy bayramimiz uchun mukammal bo'ldi.",
    rating: 5,
  },
  {
    name: 'Javlon K.',
    text: 'Yetkazib berish tez va sifat a\'lo darajada. Albatta yana buyurtma beraman.',
    rating: 5,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();

  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [message, setMessage] = useState('');

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-brown-800">Mahsulot topilmadi</h1>
        <Link to="/cakes" className="mt-4 inline-block text-brown-500 hover:underline">
          Tortlarga qaytish
        </Link>
      </div>
    );
  }

  const categoryPath = product.type === 'cake' ? '/cakes' : '/desserts';
  const categoryLabel = product.type === 'cake' ? 'Tortlar' : 'Desertlar';

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
    setMessage("Mahsulot savatga qo'shildi!");
    setTimeout(() => setMessage(''), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, size);
    setMessage('Buyurtma qabul qilindi, rahmat!');
    setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="mb-8 text-sm text-brown-500">
        <Link to="/" className="hover:text-brown-700">
          Bosh sahifa
        </Link>
        <span className="mx-2">›</span>
        <Link to={categoryPath} className="hover:text-brown-700">
          {categoryLabel}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-brown-700">{product.name}</span>
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-cream">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-brown-500">{formatPrice(product.price)}</p>
          <p className="mt-4 leading-relaxed text-brown-600">{product.description}</p>

          {product.sizes && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-brown-700">O'lcham</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      size === s
                        ? 'border-brown-700 bg-brown-700 text-white'
                        : 'border-brown-200 text-brown-600 hover:border-brown-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-brown-700">Miqdor</p>
            <div className="inline-flex items-center gap-4 rounded-full border border-brown-200 px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Kamaytirish"
                className="text-brown-600 hover:text-brown-800"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-6 text-center font-medium text-brown-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Ko'paytirish"
                className="text-brown-600 hover:text-brown-800"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-brown-700 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
            >
              Savatga qo'shish
            </button>
            <button
              onClick={handleBuyNow}
              className="rounded-full border border-brown-700 px-7 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
            >
              Hozir sotib olish
            </button>
          </div>

          {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-brown-50 pt-6">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-2 text-center">
                <feature.icon className="text-brown-500" size={22} />
                <p className="text-xs font-medium text-brown-600">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-8 border-b border-brown-100">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-semibold transition-colors ${
              activeTab === 'description'
                ? 'border-b-2 border-brown-700 text-brown-800'
                : 'text-brown-400 hover:text-brown-600'
            }`}
          >
            Tavsif
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-brown-700 text-brown-800'
                : 'text-brown-400 hover:text-brown-600'
            }`}
          >
            Sharhlar ({sampleReviews.length})
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'description' ? (
            <div className="max-w-2xl space-y-3 leading-relaxed text-brown-600">
              <p>{product.description}</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Tarkibi: yangi sut, shokolad, tuxum, un va shakar.</li>
                <li>Saqlash: 0-4°C da, 3 kungacha.</li>
              </ul>
            </div>
          ) : (
            <div className="max-w-2xl space-y-6">
              {sampleReviews.map((review) => (
                <div key={review.name} className="rounded-2xl bg-cream p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-brown-800">{review.name}</p>
                    <p className="text-sm text-brown-400">{'★'.repeat(review.rating)}</p>
                  </div>
                  <p className="mt-2 text-sm text-brown-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
