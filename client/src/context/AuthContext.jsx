import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AuthService from '../utils/auth'; // Adjust as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.loggedIn());
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check if there's a valid token before trying to decode
        const token = AuthService.getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setCurrentUser(decoded);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (idToken) => {
        if (idToken) {
            try {
                AuthService.login(idToken);
                const decoded = jwtDecode(idToken);
                setCurrentUser(decoded);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid token during login:', error);
            }
        } else {
            console.error('No token provided for login.');
        }
    };

    const logout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;