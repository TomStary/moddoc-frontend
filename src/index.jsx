import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next'
import { CookiesProvider } from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';


import i18n from 'i18next';
import { store } from './_store';
import { App } from './App';

render(
    <CookiesProvider>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    </CookiesProvider>,
    document.getElementById('app')
);