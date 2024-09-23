import React, { createContext, useState, useEffect } from 'react';
import AuthService from './auth'; // Import AuthService

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = AuthService.loggedIn();
    setIsAuthenticated(loggedIn);
  }, []);

  const login = (idToken) => {
    AuthService.login(idToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};