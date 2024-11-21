import { lazy } from 'react';

const PagesRoutes = [
  // PAGES
  {
    path: '/pages/blank-page',
    component: lazy(() => import('../../view/pages/blank')),
    layout: 'VerticalLayout',
  },
  {
    path: '/dashboard',
    exact: true,
    component: lazy(() => import('../../view/home')),
    layout: 'VerticalLayout',
  },
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../view/pages/authentication/login')),
    layout: 'FullLayout',
  },
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../../view/pages/authentication/login')),
    layout: 'FullLayout',
  },
  {
    path: '/pages/error-404',
    exact: true,
    component: lazy(() => import('../../view/pages/errors/404')),
    layout: 'FullLayout',
  },
  {
    path: '/admin',
    exact: true,
    component: lazy(() => import('../../view/home')),
    layout: 'VerticalLayout',
  },
  {
    path: "/products",
    exact: true,
    component: lazy(() => import("../../view/pages/products/index")),
    layout: "VerticalLayout",
  },
  {
    path: "/products/detail/:id",
    exact: true,
    component: lazy(() => import("../../view/pages/products/detail")),
    layout: "VerticalLayout",
  },
  {
    path: "/settings/exceptions",
    exact: true,
    component: lazy(() => import("../../view/pages/exceptions")),
    layout: "VerticalLayout",
  },
  {
    path: "/users",
    exact: true,
    component: lazy(() => import("../../view/pages/users")),
    layout: "VerticalLayout",
  },

];

export default PagesRoutes;
