// index.js
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import './assets/icons/remixicon.css';
import './assets/less/yoda-theme.less';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Suspense fallback="loading">
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Suspense>
);
