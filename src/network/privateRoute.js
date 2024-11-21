// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';

/**
 * PrivateRoute component to protect routes that require authentication.
 * @param {Object} props - Component properties.
 * @param {React.ComponentType} props.component - The component to render if authenticated.
 * @returns {JSX.Element} - A Route component that either renders the given component or redirects to root.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
