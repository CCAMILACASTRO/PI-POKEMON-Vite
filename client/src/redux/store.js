import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Permite conectar nuestro proyecto con la extension del navegador 'Redux Dev Tools'


const store = createStore(reducer, composeEnhancer(applyMiddleware(thunkMiddleware)));
//Permite hacer peticiones a una API/servidor.

export default store;