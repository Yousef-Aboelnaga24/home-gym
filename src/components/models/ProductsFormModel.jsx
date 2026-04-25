import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { createProduct, updateProduct } from '../../services/ProductService';
import { getCategories } from '../../services/CategoryService';

export default function ProductsFormModel({ initialData = null, onSuccess }) {
  const [form, setForm] = useState({
    category_id: '',
    name: '',
    slug: '',
    description: '',
    price: '',
    sale_price: '',
    stock: 0,
    sku: '',
    is_featured: false,
    is_active: true,
    image: null,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  // 🔥 Edit Mode fix
  useEffect(() => {
    if (initialData) {
      setForm({
        category_id: initialData.category?.id || '',
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        price: initialData.price || '',
        sale_price: initialData.sale_price || '',
        stock: initialData.stock || 0,
        sku: initialData.sku || '',
        is_featured: !!initialData.is_featured,
        is_active: !!initialData.is_active,
        image: null,
        images: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (e.target.name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, images: files }));
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === 'images') return;
        if (key === 'image' && !form.image) return;

        formData.append(key, form[key]);
      });

      formData.set('slug', form.slug || generateSlug(form.name));
      formData.set('is_featured', form.is_featured ? 1 : 0);
      formData.set('is_active', form.is_active ? 1 : 0);

      form.images.forEach((img) => {
        formData.append('images[]', img);
      });

      if (initialData) {
        await updateProduct(initialData.id, formData); // ✏️ Edit
      } else {
        await createProduct(formData); // ➕ Create
      }

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error('Error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-h-[90vh] overflow-y-auto space-y-4"
    >
      <h2 className="text-white text-xl font-bold">
        {initialData ? 'Edit Product' : 'Create Product'}
      </h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white"
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug (optional)"
        value={form.slug}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white"
      />

      {/* Category (🔥 FIXED) */}
      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-800 text-white"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Price */}
      <div className="grid grid-cols-2 gap-3">
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />

        <input
          name="sale_price"
          type="number"
          placeholder="Sale Price"
          value={form.sale_price}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      {/* Stock & SKU */}
      <div className="grid grid-cols-2 gap-3">
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />

        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      {/* Images */}
      <input type="file" name="image" onChange={handleFileChange} className="text-white" />
      <input type="file" name="images" multiple onChange={handleFileChange} className="text-white" />

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} />
          Featured
        </label>

        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          Active
        </label>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
}