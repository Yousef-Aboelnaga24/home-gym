import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Box, DollarSign, Loader2 } from 'lucide-react';
import { bundles } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { getProducts } from '../services/ProductService';

export function BuildGym() {
  const [searchParams] = useSearchParams();
  const presetBundleId = searchParams.get('preset');

  const [space, setSpace] = useState('medium');
  const [budget, setBudget] = useState('mid');
  const [showResults, setShowResults] = useState(!!presetBundleId);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const result = await getProducts({ per_page: 50 });
        const items = result.data || result;
        setProducts(items.map(p => ({
          ...p,
          category: p.category?.name || 'Uncategorized',
          rating: p.average_rating || 5.0,
          reviews: p.reviews_count || 0
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchApiProducts();
  }, []);

  const activeBundle = useMemo(() => {
    if (presetBundleId) {
      return bundles.find(b => b.id === presetBundleId) || bundles[1];
    }
    // Find closest bundle based on answers
    return bundles.find(b => b.space === space && b.budget === budget) || bundles[1];
  }, [space, budget, presetBundleId]);

  const bundleProducts = useMemo(() => {
    if (!products.length) return [];
    return activeBundle.products
      .map(id => products.find(p => String(p.id) === String(id)))
      .filter(Boolean);
  }, [activeBundle, products]);

  const handleAddBundleToCart = () => {
    bundleProducts.forEach(product => {
      addToCart(product);
    });
  };

  const handleFind = () => {
    setShowResults(true);
  };

  return (
    <>
      <Helmet>
        <title>Build Your Gym | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[80vh]">
        {!showResults ? (
          <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-2xl">
            <h1 className="text-4xl font-extrabold text-white mb-4">Build Your Dream Gym</h1>
            <p className="text-zinc-400 mb-10 text-lg">Tell us about your space and budget, and we'll recommend the perfect setup for you.</p>

            <div className="space-y-10">
              {/* Space Selection */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-white mb-6">
                  <Box className="mr-3 text-yellow-500" />
                  1. How much space do you have?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['small', 'medium', 'large'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpace(s)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${space === s
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-800/50'
                        }`}
                    >
                      <h4 className="text-white font-bold capitalize mb-1">{s} Area</h4>
                      <p className="text-zinc-500 text-sm">
                        {s === 'small' && 'Apartment corner/spare room'}
                        {s === 'medium' && 'Single car garage/large room'}
                        {s === 'large' && 'Double garage/basement'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Selection */}
              <div>
                <h3 className="flex items-center text-xl font-bold text-white mb-6">
                  <DollarSign className="mr-3 text-yellow-500" />
                  2. What's your total budget?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['low', 'mid', 'high'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${budget === b
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-800/50'
                        }`}
                    >
                      <h4 className="text-white font-bold capitalize mb-1">{b} Budget</h4>
                      <p className="text-zinc-500 text-sm">
                        {b === 'low' && 'Under $500'}
                        {b === 'mid' && '$500 - $1,500'}
                        {b === 'high' && '$1,500+'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-800 flex justify-end">
                <Button size="lg" className="px-10 text-lg" onClick={handleFind}>
                  Show My Setup <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-yellow-500 hover:text-yellow-400 text-sm font-semibold mb-4 block"
                >
                  ← Edit Preferences
                </button>
                <h1 className="text-4xl font-extrabold text-white mb-2">Your Recommended Setup</h1>
                <p className="text-zinc-400 text-lg">"{activeBundle.name}"</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center gap-8">
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Bundle Total</p>
                  <p className="text-3xl font-bold text-yellow-500">${activeBundle.price.toFixed(2)}</p>
                </div>
                <Button size="lg" onClick={handleAddBundleToCart}>
                  Add All to Cart
                </Button>
              </div>
            </div>

            <div className="mb-12 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Why this setup?</h3>
              <p className="text-zinc-300 leading-relaxed max-w-4xl">{activeBundle.description}</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 font-heading border-b border-zinc-800 pb-4">
              Included Equipment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loadingProducts ? (
                <div className="col-span-4 flex justify-center py-10">
                  <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
                </div>
              ) : bundleProducts.length > 0 ? (
                bundleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-4 text-zinc-400">Products for this bundle are currently unavailable.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
