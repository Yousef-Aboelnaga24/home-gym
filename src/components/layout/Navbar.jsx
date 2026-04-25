import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Dumbbell, Heart, User, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

export function Navbar() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors">
          <Dumbbell className="h-8 w-8" />
          <span className="text-xl font-bold tracking-wider text-white">HOMEGYM</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-yellow-500 transition-colors">Shop</Link>
          <Link to="/build-gym" className="hover:text-yellow-500 transition-colors text-yellow-500">Build Your Gym</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative p-2 text-zinc-300 hover:text-yellow-500 transition-colors">
            <Heart className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 text-zinc-300 hover:text-yellow-500 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-zinc-800 mx-2 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/orders" className="p-2 text-zinc-300 hover:text-yellow-500 transition-colors" title="My Orders">
                <ShoppingBag className="h-5 w-5" />
              </Link>
              <Link to="/profile" className="p-2 text-zinc-300 hover:text-yellow-500 transition-colors" title="My Profile">
                <User className="h-5 w-5" />
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="p-2 text-zinc-300 hover:text-yellow-500 transition-colors" title="Admin Panel">
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              )}
              <span className="text-sm font-medium text-zinc-300 hidden sm:block">
                Hi, {user.name?.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-yellow-500 transition-colors">
                Log In
              </Link>
              <Link to="/register" className="text-sm font-medium bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
