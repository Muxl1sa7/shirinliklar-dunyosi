import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiShoppingBag, FiCreditCard, FiMail, FiUsers, FiUser } from 'react-icons/fi';
import {
  adminGetProducts,
  adminGetOrders,
  adminGetPurchases,
  adminGetMessages,
  adminGetSubscribers,
  adminGetUsers,
} from '../../lib/api';

interface Stats {
  products: number;
  orders: number;
  purchases: number;
  messages: number;
  subscribers: number;
  users: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      adminGetProducts(),
      adminGetOrders(),
      adminGetPurchases(),
      adminGetMessages(),
      adminGetSubscribers(),
      adminGetUsers(),
    ])
      .then(([products, orders, purchases, messages, subscribers, users]) =>
        setStats({
          products: products.products.length,
          orders: orders.orders.length,
          purchases: purchases.purchases.length,
          messages: messages.messages.length,
          subscribers: subscribers.subscribers.length,
          users: users.users.length,
        }),
      )
      .catch(() => setStats({ products: 0, orders: 0, purchases: 0, messages: 0, subscribers: 0, users: 0 }));
  }, []);

  const cards = [
    { label: 'Mahsulotlar', value: stats?.products, icon: FiBox, to: '/admin/products' },
    { label: 'Maxsus buyurtmalar', value: stats?.orders, icon: FiShoppingBag, to: '/admin/orders' },
    { label: 'Oddiy buyurtmalar', value: stats?.purchases, icon: FiCreditCard, to: '/admin/purchases' },
    { label: 'Foydalanuvchilar', value: stats?.users, icon: FiUser, to: '/admin/users' },
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
