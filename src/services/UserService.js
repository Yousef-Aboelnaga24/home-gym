import api from './api';

const extractData = (response) => response?.data?.data ?? response?.data;

export const getProfile = async () => {
  const response = await api.get('/me');
  return extractData(response);
};

export const updateProfile = async (data) => {
  const response = await api.put('/me', data);
  return extractData(response);
};

// Admin User Methods
export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return extractData(response);
};

export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return extractData(response);
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return extractData(response);
};

export const getAdminStats = async () => {
  const response = await api.get('/admin/dashboard');
  return extractData(response);
};
