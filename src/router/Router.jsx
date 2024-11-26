// Router.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../redux/customise/customiseActions';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Routes } from './routes';
import VerticalLayout from '../layout/VerticalLayout';
import HorizontalLayout from '../layout/HorizontalLayout';
import FullLayout from '../layout/FullLayout';
import Error404 from '../view/pages/errors/404';
import Login from '../view/pages/authentication/login';
import { useAuth } from '../network/authContext';
import PrivateRoute from '../network/privateRoute';
import PublicRoute from '../network/publicRoute';
import UserIndex from '../view/pages/users';
import Profile from '../view/pages/profile/index'; // Main user profile container

/**
 * Main Router component to define the application's routing structure.
 * @returns {JSX.Element} - The Router component.
 */
export default function Router() {
  const customise = useSelector((state) => state.customise);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  let themeLocal;

  useEffect(() => {
    if (localStorage) {
      themeLocal = localStorage.getItem('theme');
    }

    if (themeLocal === 'light' || themeLocal === 'dark') {
      document.querySelector('body').classList.add(themeLocal);
      dispatch(theme(themeLocal));
    } else {
      document.querySelector('body').classList.add(customise.theme);
      dispatch(theme(customise.theme));
    }
  }, [customise.theme, dispatch]);

  useEffect(() => {
    if (customise.direction === 'ltr') {
      document.querySelector('html').setAttribute('dir', 'ltr');
    } else if (customise.direction === 'rtl') {
      document.querySelector('html').setAttribute('dir', 'rtl');
    }
  }, [customise.direction]);

  useEffect(() => {
    if (location.search === '?theme=dark') {
      localStorage.setItem('theme', 'dark');
      themeLocal = 'dark';
    } else if (location.search === '?theme=light') {
      localStorage.setItem('theme', 'light');
      themeLocal = 'light';
    }

    if (location.search === '?direction=ltr') {
      document.querySelector('html').setAttribute('dir', 'ltr');
    } else if (location.search === '?direction=rtl') {
      document.querySelector('html').setAttribute('dir', 'rtl');
    }
  }, [location.search]);

  const DefaultLayout = customise.layout;
  const Layouts = { VerticalLayout, HorizontalLayout, FullLayout };

  /**
   * Filters routes based on layout.
   * @param {string} layout - The layout to filter routes for.
   * @returns {{ LayoutRoutes: Array, LayoutPaths: Array }} - The filtered routes and paths.
   */
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      Routes.filter(
          (route) =>
              route.layout === layout &&
              (LayoutRoutes.push(route), LayoutPaths.push(route.path))
      );
    }

    return { LayoutRoutes, LayoutPaths };
  };

  /**
   * Resolves routes based on layout.
   * @returns {JSX.Element} - The resolved routes.
   */
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

      let LayoutTag;
      if (DefaultLayout === 'HorizontalLayout') {
        if (layout === 'VerticalLayout') {
          LayoutTag = Layouts['HorizontalLayout'];
        } else {
          LayoutTag = Layouts[layout];
        }
      } else {
        LayoutTag = Layouts[layout];
      }

      return (
          <Route path={LayoutPaths} key={index}>
            <LayoutTag>
              <Switch>
                {LayoutRoutes.map((route) => {
                  return (
                      <PrivateRoute
                          key={route.path}
                          path={route.path}
                          exact={route.exact === true}
                          component={route.component}
                      />
                  );
                })}
              </Switch>
            </LayoutTag>
          </Route>
      );
    });
  };

  return (
      <Switch>
        {/* Public Route for Login */}
        <PublicRoute restricted={true} component={Login} path="/login" exact />

        {/* Private Routes */}
        {ResolveRoutes()}

        {/* Profile and User Routes */}
        <PrivateRoute path="/users" exact component={UserIndex} />
        <PrivateRoute path="/users/detail/:id" component={Profile} />

        {/* Redirect to dashboard if authenticated */}
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>

        {/* 404 Page */}
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
  );
}
