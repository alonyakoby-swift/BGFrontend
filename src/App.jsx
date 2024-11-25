// App.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import AppLocale from './languages';
import Router from './router/Router';
import { AuthProvider } from './network/authContext';

export default function App() {
    // Redux
    const customise = useSelector((state) => state.customise);

    // Lang
    const currentAppLocale = AppLocale[customise.language];

    useEffect(() => {
        document.querySelector('html').setAttribute('lang', customise.language);
    }, [customise]);

    return (
        <ConfigProvider locale={currentAppLocale.antd} direction={customise.direction}>
            <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </IntlProvider>
        </ConfigProvider>
    );
}
