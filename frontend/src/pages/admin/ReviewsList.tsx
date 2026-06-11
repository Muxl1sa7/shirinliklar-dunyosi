import { useEffect, useState } from 'react';
import { adminGetReviews, adminGetProducts, adminReplyToReview, type Review } from '../../lib/api';

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productNames, setProductNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminGetReviews(), adminGetProducts()])
      .then(([reviewsData, productsData]) => {
        setReviews(reviewsData.reviews);
        const map: Record<string, string> = {};
        productsData.products.forEach((product) => {
          map[product.id] = product.name;
        });
        setProductNames(map);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const handleReply = async (id: string) => {
    const reply = (replyDrafts[id] ?? '').trim();
    if (!reply) return;

    setSubmittingId(id);
    try {
      const result = await adminReplyToReview(id, reply);
      if (result.success && result.review) {
        setReviews((prev) => prev.map((review) => (review.id === id ? result.review! : review)));
      }
    } catch {
      // ignore - leave the form as-is so the admin can retry
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Sharhlar</h1>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-slate-400">Yuklanmoqda...</p>
        ) : reviews.length === 0 ? (
          <p className="text-slate-400">Sharhlar topilmadi.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-800">
                    {productNames[review.productId] ?? review.productId}
                  </p>
                  <p className="text-sm text-slate-500">{review.userName}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-500">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </p>
                  <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString('uz-UZ')}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600">{review.text}</p>

              {review.adminReply ? (
                <div className="mt-3 rounded-lg border-l-2 border-slate-300 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-700">Admin javobi:</p>
                  <p className="mt-1 text-sm text-slate-600">{review.adminReply}</p>
                  {review.adminReplyAt && (
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(review.adminReplyAt).toLocaleDateString('uz-UZ')}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <textarea
                    rows={2}
                    value={replyDrafts[review.id] ?? ''}
                    onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    placeholder="Javob yozing..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  />
                  <button
                    type="button"
                    disabled={submittingId === review.id}
                    onClick={() => handleReply(review.id)}
                    className="shrink-0 rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
                  >
                    {submittingId === review.id ? 'Yuborilmoqda...' : 'Javob yuborish'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
