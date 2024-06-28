import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for an existing token on initial load
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        setUser({ email, roles, id });
      } catch (error) {
        console.error('Invalid token format:', error);
        setUser(null);
        localStorage.removeItem('jwt'); // Remove invalid token
      }
    }
  }, []); // Empty dependency array means this effect runs once after the first render

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      setUser({ email, roles, id });
      localStorage.setItem('jwt', token);
      navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error('Invalid token format:', error);
      setUser(null);
      localStorage.removeItem('jwt'); // Remove invalid token
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    navigate('/login'); // Chuyển hướng sau khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
