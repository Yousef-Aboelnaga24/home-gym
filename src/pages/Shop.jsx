import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { getProducts } from '../services/ProductService';
import { getCategories } from '../services/CategoryService';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  // 🔥 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts({ per_page: 50 });
        const items = result.data || result;

        const formatted = items.map((p) => ({
          ...p,
          category: p.category?.name || 'Uncategorized',
          rating: p.average_rating || 5.0,
          reviews: p.reviews_count || 0,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Fetch categories (dynamic)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || res);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // 🔥 Filtering (fixed dependency issue)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchCategory =
        activeCategory === 'All' || p.category === activeCategory;

      const matchPrice = p.price <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });
  }, [searchTerm, activeCategory, maxPrice, products]);

  return (
    <>
      <Helmet>
        <title>Shop Gym Equipment | Home Gym Store</title>
        <meta
          name="description"
          content="Browse our complete collection of home gym equipment."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Shop Equipment
            </h1>
            <p className="text-zinc-400">
              Everything you need, built to last.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6 text-white font-semibold border-b border-zinc-800 pb-4">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </div>

              {/* Category */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-zinc-300 mb-4">
                  Category
                </h3>

                <div className="space-y-2 text-zinc-400">
                  {['All', ...categories.map((c) => c.name)].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer hover:text-yellow-500 transition-colors"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(cat)}
                        className="accent-yellow-500 w-4 h-4 bg-zinc-800 border-zinc-700"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-sm font-medium text-zinc-300 mb-4">
                  Max Price: ${maxPrice}
                </h3>

                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                />
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                <h3 className="text-xl font-semibold text-white mb-2">
                  No products found
                </h3>
                <p className="text-zinc-400">
                  Try adjusting your filters or search term.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}