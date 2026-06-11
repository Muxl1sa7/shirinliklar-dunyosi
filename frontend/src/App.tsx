import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import RequireAdminAuth from './components/admin/RequireAdminAuth';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import ProductDetail from './pages/ProductDetail';
import CustomOrder from './pages/CustomOrder';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProductsList from './pages/admin/ProductsList';
import ProductForm from './pages/admin/ProductForm';
import OrdersList from './pages/admin/OrdersList';
import MessagesList from './pages/admin/MessagesList';
import SubscribersList from './pages/admin/SubscribersList';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="cakes" element={<Cakes />} />
                <Route path="desserts" element={<Desserts />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="custom-order" element={<CustomOrder />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="cart" element={<Cart />} />
              </Route>

              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<RequireAdminAuth />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<ProductsList />} />
                  <Route path="products/new" element={<ProductForm />} />
                  <Route path="products/:id/edit" element={<ProductForm />} />
                  <Route path="orders" element={<OrdersList />} />
                  <Route path="messages" element={<MessagesList />} />
                  <Route path="subscribers" element={<SubscribersList />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
