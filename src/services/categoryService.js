import api from './api';

const extractData = (response) => response?.data?.data ?? response?.data;

export const getCategories = async () => {
  const response = await api.get('/categories');
  return extractData(response);
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return extractData(response);
};

// Admin Category Methods
export const createCategory = async (data) => {
  const response = await api.post('/admin/categories', data);
  return extractData(response);
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`/admin/categories/${id}`, data);
  return extractData(response);
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return extractData(response);
};
