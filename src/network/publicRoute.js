// PublicRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';

/**
 * PublicRoute component to handle routes accessible to all users.
 * @param {Object} props - Component properties.
 * @param {React.ComponentType} props.component - The component to render.
 * @param {boolean} props.restricted - If true, redirects authenticated users to the dashboard.
 * @returns {JSX.Element} - A Route component.
 */
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && restricted ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
