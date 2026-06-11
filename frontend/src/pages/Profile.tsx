import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLogOut } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/format';
import {
  getMyOrders,
  getMyPurchases,
  receivePurchase,
  submitReview,
  type OrderRecord,
  type PurchaseOrder,
} from '../lib/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const [receivingId, setReceivingId] = useState<string | null>(null);
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, { rating: number; text: string }>>({});
  const [reviewStatus, setReviewStatus] = useState<Record<string, 'success' | 'duplicate'>>({});
  const [reviewErrors, setReviewErrors] = useState<Record<string, string>>({});
  const [reviewSubmittingKey, setReviewSubmittingKey] = useState<string | null>(null);

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));

    getMyPurchases()
      .then((data) => setPurchases(data.purchases))
      .catch(() => setPurchases([]))
      .finally(() => setPurchasesLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleReceive = async (orderId: string) => {
    setReceivingId(orderId);
    try {
      const result = await receivePurchase(orderId);
      if (result.success && result.order) {
        setPurchases((prev) => prev.map((order) => (order.id === orderId ? result.order! : order)));
      }
    } catch {
      // ignore - admin can leave the order as-is and the customer can retry
    } finally {
      setReceivingId(null);
    }
  };

  const handleReviewChange = (key: string, change: Partial<{ rating: number; text: string }>) => {
    setReviewDrafts((prev) => ({
      ...prev,
      [key]: { rating: prev[key]?.rating ?? 5, text: prev[key]?.text ?? '', ...change },
    }));
  };

  const handleReviewSubmit = async (orderId: string, productId: string) => {
    const key = `${orderId}-${productId}`;
    const draft = reviewDrafts[key] ?? { rating: 5, text: '' };

    if (!draft.text.trim()) {
      setReviewErrors((prev) => ({ ...prev, [key]: 'Sharh matnini kiriting' }));
      return;
    }

    setReviewSubmittingKey(key);
    setReviewErrors((prev) => ({ ...prev, [key]: '' }));

    try {
      await submitReview({ orderId, productId, rating: draft.rating, text: draft.text.trim() });
      setReviewStatus((prev) => ({ ...prev, [key]: 'success' }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Xatolik yuz berdi';
      if (message === 'Siz bu mahsulotga sharh qoldirgansiz') {
        setReviewStatus((prev) => ({ ...prev, [key]: 'duplicate' }));
      } else {
        setReviewErrors((prev) => ({ ...prev, [key]: message }));
      }
    } finally {
      setReviewSubmittingKey(null);
    }
  };

  const statusLabel = (status: PurchaseOrder['status']) =>
    status === 'received' ? 'Qabul qilindi' : "To'lov qilindi";

  return (
    <div>
      <PageHeader title="Profil" />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brown-50 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-brown-800">{user?.name}</h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-brown-200 px-5 py-2.5 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-50"
            >
              <FiLogOut size={16} />
              Chiqish
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <p className="flex items-center gap-3 text-sm text-brown-600">
              <FiUser className="text-brown-400" size={18} />
              {user?.name}
            </p>
            <p className="flex items-center gap-3 text-sm text-brown-600">
              <FiMail className="text-brown-400" size={18} />
              {user?.email}
            </p>
            <p className="flex items-center gap-3 text-sm text-brown-600">
              <FiPhone className="text-brown-400" size={18} />
              {user?.phone}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold text-brown-800">Mening buyurtmalarim</h3>

          {loading ? (
            <p className="mt-4 text-sm text-brown-400">Yuklanmoqda...</p>
          ) : orders.length === 0 ? (
            <p className="mt-4 text-sm text-brown-400">Hozircha buyurtmalar yo'q.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="rounded-2xl border border-brown-50 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-brown-800">
                      {order.size} &middot; {order.flavor}
                    </p>
                    <p className="text-xs text-brown-400">
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-brown-500">Tadbir sanasi: {order.eventDate}</p>
                  {order.note && <p className="mt-2 text-sm text-brown-600">{order.note}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold text-brown-800">Mening xaridlarim</h3>

          {purchasesLoading ? (
            <p className="mt-4 text-sm text-brown-400">Yuklanmoqda...</p>
          ) : purchases.length === 0 ? (
            <p className="mt-4 text-sm text-brown-400">Hozircha xaridlar yo'q.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {purchases.map((order) => (
                <div key={order.id} className="rounded-2xl border border-brown-50 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-brown-400">{new Date(order.createdAt).toLocaleString('uz-UZ')}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === 'received' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {statusLabel(order.status)}
                    </span>
                  </div>

                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => {
                      const key = `${order.id}-${item.productId}`;
                      return (
                        <div key={key} className="rounded-xl bg-cream p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-brown-800">{item.name}</p>
                              <p className="text-xs text-brown-500">
                                {item.size && <>O'lcham: {item.size} </>}
                                {item.flavor && <>· Ta'm: {item.flavor} </>}
                                · Soni: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-brown-700">{formatPrice(item.lineTotal)}</p>
                          </div>

                          {order.status === 'received' && (
                            <div className="mt-3 border-t border-brown-100 pt-3">
                              {reviewStatus[key] === 'success' ? (
                                <p className="text-sm font-medium text-green-600">Rahmat! Sharhingiz yuborildi.</p>
                              ) : reviewStatus[key] === 'duplicate' ? (
                                <p className="text-sm font-medium text-brown-500">
                                  Siz bu mahsulotga sharh qoldirgansiz.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  <StarRating
                                    value={reviewDrafts[key]?.rating ?? 5}
                                    onChange={(rating) => handleReviewChange(key, { rating })}
                                  />
                                  <textarea
                                    rows={2}
                                    value={reviewDrafts[key]?.text ?? ''}
                                    onChange={(e) => handleReviewChange(key, { text: e.target.value })}
                                    placeholder="Mahsulot haqida fikringiz..."
                                    className="w-full rounded-xl border border-brown-200 px-3 py-2 text-sm text-brown-800 outline-none focus:border-brown-400"
                                  />
                                  {reviewErrors[key] && (
                                    <p className="text-sm font-medium text-red-600">{reviewErrors[key]}</p>
                                  )}
                                  <button
                                    type="button"
                                    disabled={reviewSubmittingKey === key}
                                    onClick={() => handleReviewSubmit(order.id, item.productId)}
                                    className="rounded-full bg-brown-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
                                  >
                                    {reviewSubmittingKey === key ? 'Yuborilmoqda...' : 'Sharh qoldirish'}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-brown-50 pt-4">
                    <p className="font-display text-base font-semibold text-brown-800">
                      Jami: {formatPrice(order.total)}
                    </p>
                    {order.status === 'paid' && (
                      <button
                        type="button"
                        disabled={receivingId === order.id}
                        onClick={() => handleReceive(order.id)}
                        className="rounded-full bg-brown-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
                      >
                        {receivingId === order.id ? 'Yuborilmoqda...' : 'Qabul qilish'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
