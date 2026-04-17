import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Configure Axios to fetch CSRF cookie before the first request, 
// usually handled by components on mount, but we can also just let Laravel handle it
// via AuthContext.

export default api;
