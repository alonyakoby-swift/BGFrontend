import { Award } from 'iconsax-react';

import IntlMessages from '../../layout/components/lang/IntlMessages';

const pages = [
  {
    header: <IntlMessages id="sidebar-pages" />,
  },
  {
    id: 'dashboard',
    title: <IntlMessages id="sidebar-pages-dashboard" />,
    icon: <i className="ph-fill  ph-gauge" />,
    navLink: '/dashboard',
  },
  {
    id: 'products-page',
    title: <IntlMessages id="sidebar-pages-products" />,
    icon: <i className="ph-fill  ph-squares-four" />,
    navLink: '/products',
  },
  {
    id: 'exceptions-page',
    title: <IntlMessages id="sidebar-pages-exceptions" />,
    icon: <i className="ph-fill ph-translate" />,
    navLink: '/exceptions',
  },
  {
    id: 'users-page',
    title: <IntlMessages id="sidebar-pages-users" />,
    icon: <i className="ph-fill  ph-users" />,
    navLink: '/users',
  }
];

export default pages;


// import { Award } from 'iconsax-react';
//
// import IntlMessages from '../../layout/components/lang/IntlMessages';
//
// const pages = [
//   {
//     header: <IntlMessages id="sidebar-pages" />,
//   },
//
//   {
//     id: 'blank-page',
//     title: <IntlMessages id="sidebar-pages-blank-page" />,
//     icon: <i className="ph-fill ph-note-blank" />,
//     navLink: '/pages/blank-page',
//   },
//
//   {
//     id: 'errors',
//     title: <IntlMessages id="sidebar-pages-error" />,
//     icon: <i className="ph-fill ph-file-x" />,
//     children: [
//       {
//         id: 'error-404',
//         title: '404',
//         navLink: '/pages/error-404',
//       },
//     ],
//   },
// ];
//
// export default pages;
