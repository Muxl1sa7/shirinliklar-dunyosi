import { useEffect, useState } from 'react';
import { adminGetPurchases, type AdminPurchaseOrder } from '../../lib/api';
import { formatPrice } from '../../lib/format';

const STATUS_LABELS: Record<AdminPurchaseOrder['status'], string> = {
  paid: "To'lov qilindi",
  received: 'Qabul qilindi',
};

const STATUS_STYLES: Record<AdminPurchaseOrder['status'], string> = {
  paid: 'bg-amber-100 text-amber-700',
  received: 'bg-green-100 text-green-700',
};

export default function PurchasesList() {
  const [purchases, setPurchases] = useState<AdminPurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetPurchases()
      .then((data) => setPurchases(data.purchases))
      .catch(() => setPurchases([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Oddiy buyurtmalar</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Sana</th>
              <th className="px-4 py-3 font-medium">Mijoz</th>
              <th className="px-4 py-3 font-medium">Mahsulotlar</th>
              <th className="px-4 py-3 font-medium">Manzil</th>
              <th className="px-4 py-3 font-medium">Jami</th>
              <th className="px-4 py-3 font-medium">Karta</th>
              <th className="px-4 py-3 font-medium">Holat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-400">
                  Oddiy buyurtmalar topilmadi.
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase.id} className="border-b border-slate-50 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(purchase.createdAt).toLocaleString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{purchase.userName}</p>
                    <p className="text-xs text-slate-500">{purchase.userEmail}</p>
                    <p className="text-xs text-slate-500">{purchase.userPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <ul className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <li key={index}>
                          {item.name}
                          {item.size && <> · {item.size}</>}
                          {item.flavor && <> · {item.flavor}</>}
                          {' · '}
                          {item.quantity} ta
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-slate-600">{purchase.address}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-800">
                    {formatPrice(purchase.total)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">**** {purchase.cardLast4}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[purchase.status]}`}
                    >
                      {STATUS_LABELS[purchase.status]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
