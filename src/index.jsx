import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/storeConfig';
import Root from './containers/root';
import Modal from './components/modal';
import '../public/styles/index.scss';

const store = configureStore();

window.store = store;

render(
    <div>
        <Provider store={store} >
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
        <Modal  ref={(Modal) => {window.modal = Modal}} />
    </div>
    ,
    document.getElementById('app')
);