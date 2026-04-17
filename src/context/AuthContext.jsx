import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to initialize CSRF cookie
  const csrf = () => axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

  const fetchUser = async () => {
    try {
      const response = await api.get('/me');
      setUser(response.data.data || response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    await csrf();
    const response = await api.post('/login', credentials);
    setUser(response.data.user || response.data.data);
    return response.data;
  };

  const register = async (data) => {
    await csrf();
    const response = await api.post('/register', data);
    setUser(response.data.user || response.data.data);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
