// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import AuthService from '../utils/auth'; // Adjust as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());

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

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;