import {
    createStore,
    applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    createLogger
} from 'redux-logger';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import {
    createBrowserHistory
} from 'history';
import createRootReducer from '../_reducers';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const loggerMiddleware = createLogger();


export function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                loggerMiddleware
            ))
    )

    return store
}
