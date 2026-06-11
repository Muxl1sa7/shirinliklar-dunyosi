import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { getPriceForSize } from '../lib/pricing';

export default function Cart() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div>
      <PageHeader title="Savatcha" />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {items.length > 0 ? (
          <div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-brown-50 bg-white p-4 shadow-sm"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    className="block h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                  >
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-display text-base font-semibold text-brown-800 hover:text-brown-500"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-brown-500">
                      {item.size && <>O'lcham: {item.size} </>}
                      {item.flavor && <>· Ta'm: {item.flavor} </>}
                      · Soni: {item.quantity}
                    </p>
                    <p className="mt-1 text-sm font-medium text-brown-700">
                      {formatPrice(getPriceForSize(item.product.price, item.size) * item.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    aria-label={`${item.product.name} savatchadan o'chirish`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brown-50 text-brown-500 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-cream p-6">
              <span className="font-display text-lg font-semibold text-brown-800">Jami</span>
              <span className="text-2xl font-bold text-brown-800">{formatPrice(total)}</span>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Link
                to="/custom-order"
                className="rounded-full border border-brown-700 px-8 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-700 hover:text-white"
              >
                Maxsus buyurtma
              </Link>
              <Link
                to="/checkout"
                className="rounded-full bg-brown-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600"
              >
                To'lovga o'tish
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </section>
    </div>
  );
}
