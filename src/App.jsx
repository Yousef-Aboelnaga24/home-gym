import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OfflineBanner } from './components/OfflineBanner';
import { NotFound } from './pages/NotFound';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { BuildGym } from './pages/BuildGym';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Verification } from './pages/Verification';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Admin
import { AdminProtectedRoute } from './routes/AdminProtectedRoute';
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminProducts } from './pages/Admin/AdminProducts';
import { AdminCategories } from './pages/Admin/AdminCategories';
import { AdminOrders } from './pages/Admin/AdminOrders';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <OfflineBanner />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            {/* Public App Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/build-gym" element={<BuildGym />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/verify-email" element={<Verification />} />
            {/* Admin Layout - Protected */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<div className="p-8 text-white"><h2>Settings</h2></div>} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>

  );
}

export default App;
