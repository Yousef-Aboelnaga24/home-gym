import api from './api';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return response.data || response.data.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data || response.data;
};

export const getProductReviews = async (id) => {
  const response = await api.get(`/products/${id}/reviews`);
  return response.data.data || response.data;
};
