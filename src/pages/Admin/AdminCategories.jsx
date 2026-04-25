import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getCategories } from '../../services/CategoryService';
import CategoriesFormModel from '../../components/models/CategoriesFormModel';

export function AdminCategories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch categories
  const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-zinc-400">
            Track how your product groups are growing across the store.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {category.name}
                </h2>

                {/* ممكن تستخدم is_active بدل trend */}
                <Badge variant="secondary">
                  {category.is_active ? 'Active' : 'Hidden'}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-zinc-400">
                {category.description || 'No description'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-lg">

            <CategoriesFormModel
              onSuccess={() => {
                setOpen(false);
                fetchCategories();
              }}
            />

            <div className="text-center mt-3">
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}