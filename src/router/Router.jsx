// Router.js
import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../redux/customise/customiseActions';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { Routes } from './routes';
import VerticalLayout from '../layout/VerticalLayout';
import HorizontalLayout from '../layout/HorizontalLayout';
import FullLayout from '../layout/FullLayout';
import Error404 from '../view/pages/errors/404';
import Exceptions from '../view/pages/exceptions';
import Login from "../view/pages/authentication/login";
import { AuthProvider } from "../network/authContext";
import PrivateRoute from "../network/privateRoute";
import Home from "../view/home";

/**
 * Main Router component to define the application's routing structure.
 * @returns {JSX.Element} - The Router component.
 */
export default function Router() {
  const customise = useSelector((state) => state.customise);
  const dispatch = useDispatch();
  const location = useHistory();

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
  }, []);

  useEffect(() => {
    if (customise.direction === 'ltr') {
      document.querySelector('html').setAttribute('dir', 'ltr');
    } else if (customise.direction === 'rtl') {
      document.querySelector('html').setAttribute('dir', 'rtl');
    }
  }, []);

  useEffect(() => {
    if (location.location.search === '?theme=dark') {
      localStorage.setItem('theme', 'dark');
      themeLocal = 'dark';
    } else if (location.location.search === '?theme=light') {
      localStorage.setItem('theme', 'light');
      themeLocal = 'light';
    }

    if (location.location.search === '?direction=ltr') {
      document.querySelector('html').setAttribute('dir', 'ltr');
    } else if (location.location.search === '?direction=rtl') {
      document.querySelector('html').setAttribute('dir', 'rtl');
    }
  }, []);

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
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {ResolveRoutes()}

            <Route
                exact
                path={'/'}
                render={() => {
                  return DefaultLayout === 'HorizontalLayout' ? (
                      <Layouts.HorizontalLayout>
                        <Login />
                      </Layouts.HorizontalLayout>
                  ) : (
                      <Layouts.FullLayout>
                        <Login />
                      </Layouts.FullLayout>
                  );
                }}
            />

            {/*<PrivateRoute path="/admin" component={AdminPanel} />*/}
            {/*<PrivateRoute path="/home" component={Home} />*/}

            {/*<PrivateRoute path="/admin/user_detail/:id" component={UserDetail} />*/}

            {/* Add more PrivateRoutes as needed */}

            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
  );
}

