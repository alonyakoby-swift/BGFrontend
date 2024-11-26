// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';
import { message } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const authService = new AuthService();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            setIsAuthenticated(true);
            const userData = {
                id: authService.getUserID(),
                name: authService.getUserName(),
                image: authService.getUserImg(),
                type: authService.getUserType(),
            };
            setUser(userData);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const result = await authService.login(email, password);
        if (result.success) {
            setIsAuthenticated(true);
            setUser({
                id: result.user.id,
                name: result.user.name,
                image: result.user.image,
                type: result.user.type,
            });
        } else {
            message.error(result.message);
        }
        return result;
    };

    const logout = () => {
        authService.logoutUser();
        setIsAuthenticated(false);
        setUser(null);
        message.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
