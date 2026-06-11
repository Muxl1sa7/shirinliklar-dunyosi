import { useEffect, useState } from 'react';
import { adminGetOrders, type OrderRecord } from '../../lib/api';

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetOrders()
      .then((data) => setOrders(data.orders))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Maxsus buyurtmalar</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Sana</th>
              <th className="px-4 py-3 font-medium">Mijoz</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Tadbir sanasi</th>
              <th className="px-4 py-3 font-medium">O'lcham</th>
              <th className="px-4 py-3 font-medium">Ta'm</th>
              <th className="px-4 py-3 font-medium">Izoh</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Maxsus buyurtmalar topilmadi.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index} className="border-b border-slate-50 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(order.createdAt).toLocaleString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{order.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{order.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{order.eventDate}</td>
                  <td className="px-4 py-3 text-slate-600">{order.size}</td>
                  <td className="px-4 py-3 text-slate-600">{order.flavor}</td>
                  <td className="px-4 py-3 text-slate-600">{order.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
