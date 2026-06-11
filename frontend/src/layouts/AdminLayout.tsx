import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiBox, FiShoppingBag, FiMail, FiUsers, FiUser, FiStar, FiCreditCard, FiLogOut } from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Mahsulotlar', icon: FiBox, end: false },
  { to: '/admin/orders', label: 'Maxsus buyurtmalar', icon: FiShoppingBag, end: false },
  { to: '/admin/purchases', label: 'Oddiy buyurtmalar', icon: FiCreditCard, end: false },
  { to: '/admin/reviews', label: 'Sharhlar', icon: FiStar, end: false },
  { to: '/admin/users', label: 'Foydalanuvchilar', icon: FiUser, end: false },
  { to: '/admin/messages', label: 'Xabarlar', icon: FiMail, end: false },
  { to: '/admin/subscribers', label: 'Obunachilar', icon: FiUsers, end: false },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="px-6 py-5">
          <p className="text-lg font-bold text-slate-800">Admin panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            <FiLogOut size={18} />
            Chiqish
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
