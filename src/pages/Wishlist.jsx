import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';

export function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <>
      <Helmet>
        <title>Your Wishlist | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12 min-h-[60vh]">
        <div className="flex items-center gap-3 mb-10 border-b border-zinc-800 pb-6">
          <Heart className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold text-white">Your Wishlist</h1>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
            <Heart className="h-16 w-16 mx-auto text-zinc-700 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Save your favorite equipment here while you plan out your dream gym space.
            </p>
            <Button asChild size="lg">
              <Link to="/shop">Explore Gear</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
