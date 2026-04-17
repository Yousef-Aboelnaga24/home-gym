import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-yellow-500 mb-4">
            <Dumbbell className="h-6 w-6" />
            <span className="text-xl font-bold tracking-wider text-white">HOMEGYM</span>
          </Link>
          <p className="text-zinc-400 text-sm max-w-sm">
            Premium home gym equipment for serious athletes. Build your perfect workout space without compromises.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link to="/shop" className="hover:text-yellow-500 transition-colors">Shop</Link></li>
            <li><Link to="/build-gym" className="hover:text-yellow-500 transition-colors">Build Your Gym</Link></li>
            <li><Link to="/cart" className="hover:text-yellow-500 transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-yellow-500 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Shipping Returns</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500 text-center">
        © {new Date().getFullYear()} HomeGym Store. All rights reserved.
      </div>
    </footer>
  );
}
