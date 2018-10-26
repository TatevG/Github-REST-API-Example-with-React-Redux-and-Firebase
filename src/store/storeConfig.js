import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let array_middleware = [];
array_middleware.push(thunk);

function getcompose() {
    if (process.env.NODE_ENV.trim() !== 'production') {
        return composeWithDevTools(applyMiddleware(...array_middleware));
    } else {
        return applyMiddleware(...array_middleware);
    }
}

let initialState = {};

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        getcompose(),
    );
};