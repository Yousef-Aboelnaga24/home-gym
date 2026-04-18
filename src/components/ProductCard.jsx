import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10">
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute right-3 top-3 z-10 rounded-full p-2 bg-zinc-950/50 backdrop-blur-md text-zinc-400 hover:text-yellow-500 transition-colors"
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
      </button>

      {/* Image Link */}
      <Link to={`/product/${product.id}`} className="block aspect-4/3 overflow-hidden bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary">{product.category}</Badge>
          <span className="flex items-center text-sm font-medium text-yellow-500">
            ★ {product.rating}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-lg font-semibold text-zinc-100 hover:text-yellow-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xl font-bold text-white mb-4">
          ${product.price.toFixed(2)}
        </p>

        <Button
          className="w-full gap-2"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          Quick Add
        </Button>
      </div>
    </div>
  );
}
