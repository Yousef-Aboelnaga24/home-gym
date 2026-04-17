import { Link } from 'react-router-dom';
import { ShoppingCart, Dumbbell, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Badge } from './ui/Badge';

export function Navbar() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

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
        </div>
      </div>
    </header>
  );
}
