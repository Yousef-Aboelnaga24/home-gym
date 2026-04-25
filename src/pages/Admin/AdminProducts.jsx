import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getProducts, deleteProduct } from '../../services/ProductService';
import ProductsFormModel from '../../components/models/ProductsFormModel';
import { Pencil, Trash2 } from 'lucide-react';

export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStockStatus = (stock, isActive) => {
    if (!isActive) return 'Inactive';
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'In Stock':
        return 'default';
      case 'Low Stock':
        return 'secondary';
      case 'Out of Stock':
      case 'Inactive':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-zinc-400">Manage your catalog 🚀</p>
        </div>

        <Button onClick={() => setOpen(true)}>
          + Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/80">

        <table className="w-full text-sm text-left text-zinc-300">

          {/* Head */}
          <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-zinc-400">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-zinc-400">
                  No products found 🚀
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const status = getStockStatus(p.stock, p.is_active);

                return (
                  <tr
                    key={p.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || '/placeholder.png'}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">
                            {p.name}
                          </p>

                          {p.is_featured && (
                            <span className="text-xs text-yellow-400">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-6 py-4">{p.sku}</td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      {p.sale_price ? (
                        <>
                          <span className="text-green-400">
                            ${p.sale_price}
                          </span>{' '}
                          <span className="line-through text-zinc-500 text-xs">
                            ${p.price}
                          </span>
                        </>
                      ) : (
                        `$${p.price}`
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">{p.stock}</td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {p.category?.name || '—'}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge variant={getBadgeVariant(status)}>
                        {status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        {/* Edit */}
                        <button
                          onClick={() => {
                            setOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-zinc-800 transition"
                        >
                          <Pencil size={16} className="text-blue-400" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition disabled:opacity-50"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-full max-w-lg">

            <ProductsFormModel
              onSuccess={() => {
                setOpen(false);
                fetchProducts();
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