import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/me');
      setUser(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const res = await api.post('/login', credentials);

    const data = res.data.data ?? res.data;

    localStorage.setItem('token', data.token);

    await fetchUser();

    return data;
  };

  // REGISTER
  const register = async (data) => {
    const res = await api.post('/register', data);

    const payload = res.data.data ?? res.data;

    localStorage.setItem('token', payload.token);

    await fetchUser();

    return payload;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        fetchUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};