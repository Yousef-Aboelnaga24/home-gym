import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineBanner } from './components/OfflineBanner';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { BuildGym } from './pages/BuildGym';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Admin
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
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
            </Route>

            {/* Admin Layout - Protected */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                {/* Placeholders for future admin pages */}
                <Route path="products" element={<div className="p-8 text-white"><h2>Products</h2></div>} />
                <Route path="categories" element={<div className="p-8 text-white"><h2>Categories</h2></div>} />
                <Route path="orders" element={<div className="p-8 text-white"><h2>Orders</h2></div>} />
                <Route path="users" element={<div className="p-8 text-white"><h2>Users</h2></div>} />
                <Route path="settings" element={<div className="p-8 text-white"><h2>Settings</h2></div>} />
              </Route>
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
