import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const fetchUser = async () => {
    try {
      const response = await api.get('/me');
      setUser(response.data.data || response.data);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // LOGIN
  const login = async (credentials) => {

    const response = await api.post('/login', credentials);
    localStorage.setItem('token', response.data.data.token);
    await fetchUser();
    return response.data;
  };

  // REGISTER
  const register = async (data) => {
    const response = await api.post('/register', data);
    localStorage.setItem('token', response.data.data.token);
    await fetchUser();
    return response.data;
  };

  // LOGOUT
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
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, fetchUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};