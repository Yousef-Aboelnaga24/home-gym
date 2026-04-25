import api from './api';

const extractData = (response) => response?.data?.data ?? response?.data;

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return extractData(response);
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return extractData(response);
};

export const getProductById = async (id) => {
  if (!id) throw new Error('Product ID is required');
  const response = await api.get(`/products/${id}`);
  return extractData(response);
};

export const getProductReviews = async (id) => {
  if (!id) throw new Error('Product ID is required');
  const response = await api.get(`/products/${id}/reviews`);
  return extractData(response);
};

// Admin Product Methods
export const createProduct = async (data) => {
  const isFormData = data instanceof FormData;
  const response = await api.post('/admin/products', data, {
    headers: isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' },
  });
  return extractData(response);
};

export const updateProduct = async (id, data) => {
  const isFormData = data instanceof FormData;
  // Laravel often requires POST with _method=PUT for multipart/form-data
  const method = isFormData ? 'post' : 'put';
  if (isFormData && !data.has('_method')) {
    data.append('_method', 'PUT');
  }

  const response = await api[method](`/admin/products/${id}`, data, {
    headers: isFormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' },
  });
  return extractData(response);
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/products/${id}`);
  return extractData(response);
};