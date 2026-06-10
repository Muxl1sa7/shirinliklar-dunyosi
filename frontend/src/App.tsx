import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cakes from './pages/Cakes';
import Desserts from './pages/Desserts';
import ProductDetail from './pages/ProductDetail';
import CustomOrder from './pages/CustomOrder';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
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
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
