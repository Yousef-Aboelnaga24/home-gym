import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShoppingCart, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/ProductCard';
import { getProductById, getProducts } from '../services/productService';

export function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDual = async () => {
      try {
        setLoading(true);
        const pResult = await getProductById(id);
        const p = pResult.data || pResult;
        setProduct({
          ...p,
          category: p.category?.name || 'Uncategorized',
          rating: p.average_rating || 5.0,
          reviews: p.reviews_count || 0
        });

        const rResult = await getProducts({ per_page: 5 });
        const items = rResult.data || rResult;
        setRelatedProducts(items.filter(item => item.id != p.id).map(r => ({
          ...r,
          category: r.category?.name || 'Uncategorized',
          rating: r.average_rating || 5.0,
          reviews: r.reviews_count || 0
        })));
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDual();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/shop" replace />;
  }

  const isLiked = isInWishlist(product.id);

  return (
    <>
      <Helmet>
        <title>{product.name} | Home Gym Store</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center text-zinc-400 hover:text-yellow-500 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8 relative">
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute right-6 top-6 z-10 rounded-full p-3 bg-zinc-950/80 backdrop-blur-md text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </button>
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <Badge className="w-fit mb-4">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500 font-medium">
                ★ {product.rating} <span className="text-zinc-500 ml-2">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-4xl font-extrabold text-yellow-500 mb-8">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-invert border-y border-zinc-800 py-8 mb-8">
              <p className="text-lg text-zinc-300 leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-4 space-y-2 text-zinc-400">
                <li>• Commercial grade materials</li>
                <li>• Ideal for {product.spaceRequired} spaces</li>
                <li>• Free shipping over $500</li>
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full md:w-auto h-14 text-lg font-bold"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-3 h-6 w-6" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinc-800 pt-16">
            <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
