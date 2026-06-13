import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import RequireAdminAuth from './components/admin/RequireAdminAuth';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import CustomOrder from './pages/CustomOrder';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProductsList from './pages/admin/ProductsList';
import ProductForm from './pages/admin/ProductForm';
import OrdersList from './pages/admin/OrdersList';
import MessagesList from './pages/admin/MessagesList';
import SubscribersList from './pages/admin/SubscribersList';
import ReviewsList from './pages/admin/ReviewsList';
import UsersList from './pages/admin/UsersList';
import PurchasesList from './pages/admin/PurchasesList';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="cakes" element={<Cakes />} />
                  <Route path="desserts" element={<Desserts />} />
                  <Route path="search" element={<Search />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="custom-order" element={<CustomOrder />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route element={<RequireAuth />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="checkout" element={<Checkout />} />
                  </Route>
                </Route>

                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin" element={<RequireAdminAuth />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductsList />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id/edit" element={<ProductForm />} />
                    <Route path="orders" element={<OrdersList />} />
                    <Route path="purchases" element={<PurchasesList />} />
                    <Route path="messages" element={<MessagesList />} />
                    <Route path="subscribers" element={<SubscribersList />} />
                    <Route path="reviews" element={<ReviewsList />} />
                    <Route path="users" element={<UsersList />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
