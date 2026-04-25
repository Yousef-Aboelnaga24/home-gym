import api from './api';

const extractData = (response) => response?.data?.data ?? response?.data;

export const getOrders = async () => {
  const response = await api.get('/orders');
  return extractData(response);
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return extractData(response);
};

export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return extractData(response);
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return extractData(response);
};
