import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider as RenditionProvider } from 'rendition';
import {IntlProvider} from "react-intl";
import App from './App';
import locale_en from "./translations/en.json";
import locale_nl from "./translations/nl.json";

const data = {
    'nl': locale_nl,
    'en': locale_en
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale={language} messages={data[language]}>
            <RenditionProvider >
                <App />
            </RenditionProvider>
        </IntlProvider>
    </React.StrictMode>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
