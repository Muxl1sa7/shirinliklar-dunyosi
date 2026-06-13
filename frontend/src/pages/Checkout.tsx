import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiGift } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { getPriceForSize } from '../lib/pricing';
import { checkout, getMyPurchases, type CheckoutItemInput } from '../lib/api';

const FIRST_ORDER_DISCOUNT_RATE = 0.2;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holder, setHolder] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(false);

  useEffect(() => {
    getMyPurchases()
      .then((data) => setIsFirstOrder(data.purchases.length === 0))
      .catch(() => setIsFirstOrder(false));
  }, []);

  const discount = isFirstOrder ? Math.round(total * FIRST_ORDER_DISCOUNT_RATE) : 0;
  const payableTotal = total - discount;

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title="To'lov" />
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <FiShoppingCart size={48} className="text-brown-200" />
            <p className="text-brown-400">Savatchangiz bo'sh.</p>
            <Link
              to="/cakes"
              className="rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
            >
              Tortlarni ko'rish
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const checkoutItems: CheckoutItemInput[] = items.map((item) => ({
      productId: item.product.id,
      size: item.size,
      flavor: item.flavor,
      quantity: item.quantity,
    }));

    try {
      const result = await checkout(
        checkoutItems,
        {
          number: cardNumber,
          expiry,
          cvv,
          holder,
        },
        address,
      );

      if (result.success) {
        clearCart();
        navigate('/profile', { replace: true });
      } else {
        setError(result.message ?? 'Xatolik yuz berdi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="To'lov" />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-brown-800">Buyurtma xulosasi</h2>
            <div className="mt-4 space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-brown-50 bg-white p-4 shadow-sm"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold text-brown-800">{item.product.name}</p>
                    <p className="mt-1 text-xs text-brown-500">
                      {item.size && <>O'lcham: {item.size} </>}
                      {item.flavor && <>· Ta'm: {item.flavor} </>}
                      · Soni: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-brown-700">
                    {formatPrice(getPriceForSize(item.product.price, item.size) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {isFirstOrder && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                <FiGift size={22} className="shrink-0" />
                <p className="text-sm font-semibold">
                  Tabriklaymiz! Birinchi buyurtmangiz uchun 20% chegirma qo'llanildi.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-2 rounded-2xl bg-cream p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brown-600">Mahsulotlar narxi</span>
                <span className="text-sm font-semibold text-brown-800">{formatPrice(total)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">Birinchi buyurtma chegirmasi (-20%)</span>
                  <span className="text-sm font-semibold text-green-600">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-brown-100 pt-2">
                <span className="font-display text-lg font-semibold text-brown-800">Jami</span>
                <span className="text-2xl font-bold text-brown-800">{formatPrice(payableTotal)}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-brown-800">Yetkazib berish va to'lov</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Yetkazib berish manzili</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shahar, tuman, ko'cha, uy raqami"
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Karta raqami</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brown-700">Amal qilish muddati</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brown-700">CVV</label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Karta egasining ismi</label>
                <input
                  type="text"
                  required
                  value={holder}
                  onChange={(e) => setHolder(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                />
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brown-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
              >
                {submitting ? "Yuborilmoqda..." : `${formatPrice(payableTotal)} to'lash`}
              </button>

              <p className="text-center text-xs text-brown-400">
                Bu - demo to'lov tizimi. Haqiqiy pul yechilmaydi.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
