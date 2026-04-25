import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { createCategory } from '../../services/CategoryService';

export default function CategoriesFormModel({ initialData = null, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: null,
    is_active: true,
  });

  const [loading, setLoading] = useState(false);

  // Edit mode
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        image: null,
        is_active: initialData.is_active ?? true,
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
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('slug', form.slug || generateSlug(form.name));
      formData.append('description', form.description || '');
      formData.append('is_active', form.is_active ? 1 : 0);

      if (form.image) {
        formData.append('image', form.image);
      }

      await createCategory(formData);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error creating category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
    >
      <h2 className="text-white text-xl font-bold">
        {initialData ? 'Edit Category' : 'Create Category'}
      </h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Category Name"
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

      {/* Image */}
      <input
        type="file"
        onChange={handleFileChange}
        className="text-white"
      />

      {/* Active */}
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
        />
        Active
      </label>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Category'}
      </Button>
    </form>
  );
}