import api from './api';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  // Handle standard generic api response or Laravel resource collections
  return response.data.data || response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data || response.data;
};

export const getProductReviews = async (id) => {
  const response = await api.get(`/products/${id}/reviews`);
  return response.data.data || response.data;
};
