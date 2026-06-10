import { useState, type SubmitEvent } from 'react';
import PageHeader from '../components/PageHeader';
import { submitCustomOrder } from '../lib/api';

const sizes = ['1 kg', '1.5 kg', '2 kg', '3 kg', '5 kg+'];
const flavors = ['Shokolad', 'Vanil', 'Qulupnay', 'Karamel', 'Red Velvet'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CustomOrder() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitCustomOrder({ fullName, phone, eventDate, size, flavor, note });
      setStatus('success');
      setFullName('');
      setPhone('');
      setEventDate('');
      setSize('');
      setFlavor('');
      setNote('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    }
  };

  return (
    <div>
      <PageHeader title="Maxsus buyurtma" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">To'liq ism</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">Telefon raqami</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">Tadbir sanasi</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Tort o'lchami</label>
                <select
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                >
                  <option value="" disabled>
                    O'lchamni tanlang
                  </option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brown-700">Ta'm</label>
                <select
                  required
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
                >
                  <option value="" disabled>
                    Ta'mni tanlang
                  </option>
                  {flavors.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-700">Dizayn / Izoh</label>
              <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Qo'shimcha izoh yoki dizayn g'oyangiz..."
                className="w-full rounded-xl border border-brown-200 px-4 py-3 text-sm text-brown-800 outline-none focus:border-brown-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-brown-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-60"
            >
              {status === 'loading' ? 'Yuborilmoqda...' : 'Buyurtmani yuborish'}
            </button>

            {status === 'success' && (
              <p className="text-sm font-medium text-green-600">
                Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
              </p>
            )}
            {status === 'error' && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}
          </form>

          <div className="hidden overflow-hidden rounded-3xl lg:block">
            <img
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80"
              alt="Custom cake"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
