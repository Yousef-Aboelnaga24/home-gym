import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Zap, Target, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { bundles } from '../data/products';
import { getFeaturedProducts } from '../services/productService';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProducts();
        const items = data.data || data;
        setFeaturedProducts(items.slice(0, 4).map(p => ({
          ...p,
          category: p.category?.name || 'Uncategorized',
          rating: p.average_rating || 5.0,
          reviews: p.reviews_count || 0
        })));
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home Gym Store | Premium Fitness Equipment</title>
        <meta name="description" content="Build your perfect home gym with our premium selection of weights, racks, and cardio machines." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-black">
        <div className="absolute inset-0">
          <img
            src="/images/hero_bg.png"
            alt="Dark modern home gym"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 font-semibold mb-6 tracking-wide text-sm">
              NEW COLLECTION ARRIVED
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">ULTIMATE GYM</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-lg">
              Professional-grade equipment designed for your space. Don't compromise on your fitness goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8 whitespace-nowrap" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 whitespace-nowrap" asChild>
                <Link to="/build-gym">Build Your Gym</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg text-yellow-500">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Premium Quality</h3>
                <p className="text-zinc-400 text-sm">Commercial grade materials built to last a lifetime.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg text-yellow-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Lifetime Warranty</h3>
                <p className="text-zinc-400 text-sm">We stand behind every piece of equipment we sell.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg text-yellow-500">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Smart Sizing</h3>
                <p className="text-zinc-400 text-sm">Use our planner to find what fits your exact space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Gear</h2>
              <p className="text-zinc-400">Our most popular equipment, trusted by thousands of athletes.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-yellow-500 hover:text-yellow-400 font-medium group">
              View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-4 flex justify-center py-10">
                <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
              </div>
            ) : featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">
              <Link to="/shop">View All Gear</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bundles Highlight */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Space-Saving Bundles</h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">Get everything you need in one package. Designed specifically for apartments, garages, and dedicated gym rooms.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {bundles.map(bundle => (
              <div key={bundle.id} className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-yellow-500/50 transition-colors flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                <p className="text-zinc-400 mb-6 flex-1">{bundle.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-yellow-500">${bundle.price}</span>
                  <Button asChild>
                    <Link to={`/build-gym?preset=${bundle.id}`}>View Bundle</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
