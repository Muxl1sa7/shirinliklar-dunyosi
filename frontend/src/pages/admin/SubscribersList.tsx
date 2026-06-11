import { useEffect, useState } from 'react';
import { adminGetSubscribers, type SubscriberRecord } from '../../lib/api';

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetSubscribers()
      .then((data) => setSubscribers(data.subscribers))
      .catch(() => setSubscribers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Obunachilar</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Sana</th>
              <th className="px-4 py-3 font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-slate-400">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-slate-400">
                  Obunachilar topilmadi.
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b border-slate-50 last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(subscriber.createdAt).toLocaleString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{subscriber.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
