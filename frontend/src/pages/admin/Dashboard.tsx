import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiShoppingBag, FiMail, FiUsers } from 'react-icons/fi';
import { adminGetProducts, adminGetOrders, adminGetMessages, adminGetSubscribers } from '../../lib/api';

interface Stats {
  products: number;
  orders: number;
  messages: number;
  subscribers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([adminGetProducts(), adminGetOrders(), adminGetMessages(), adminGetSubscribers()])
      .then(([products, orders, messages, subscribers]) =>
        setStats({
          products: products.products.length,
          orders: orders.orders.length,
          messages: messages.messages.length,
          subscribers: subscribers.subscribers.length,
        }),
      )
      .catch(() => setStats({ products: 0, orders: 0, messages: 0, subscribers: 0 }));
  }, []);

  const cards = [
    { label: 'Mahsulotlar', value: stats?.products, icon: FiBox, to: '/admin/products' },
    { label: 'Buyurtmalar', value: stats?.orders, icon: FiShoppingBag, to: '/admin/orders' },
    { label: 'Xabarlar', value: stats?.messages, icon: FiMail, to: '/admin/messages' },
    { label: 'Obunachilar', value: stats?.subscribers, icon: FiUsers, to: '/admin/subscribers' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <card.icon size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold text-slate-800">{card.value ?? '—'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
