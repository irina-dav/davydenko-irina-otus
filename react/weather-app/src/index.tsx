import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import * as redux from "redux";
import {applyMiddleware, Dispatch, Middleware} from "redux";
import thunk from "redux-thunk";
import App from './components/App';
import {weatherReducer} from "./store/reducers";

import {ADD_FAVORITE, DELETE_FAVORITE, SET_FAVORITES} from "./store/types";

const cacheMiddleware: Middleware<Dispatch> = store => {
    return (next: redux.Dispatch) => (action: redux.AnyAction) => {
        const result = next(action);
        if (action.type === ADD_FAVORITE || action.type === DELETE_FAVORITE) {
            localStorage.setItem('favorites', JSON.stringify(store.getState().favorites));
        }
        return result;
    };
};

const readFavoritesFromLS = () => {
    if (localStorage.getItem('favorites') !== null) {
        return JSON.parse(localStorage.getItem('favorites'))
    }
    return [];
}

const store = redux.createStore(weatherReducer, applyMiddleware(thunk, cacheMiddleware));

store.dispatch({
    type: SET_FAVORITES,
    payload: readFavoritesFromLS()
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);