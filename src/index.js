import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducer/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

// ReactDOM.render(<App />, document.getElementById('root'));
const rootEl = document.getElementById('root');
ReactDOM.render(
    <Provider store = {store}>
         <App />
    </Provider>
, rootEl);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
