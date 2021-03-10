import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import ModalPE from './ModalP'
import PuntoVenta from './PuntoVenta'
import ModalC from './ModalCliente'
import ModalMP from './ModalMP'

const rootReducer = combineReducers({
    productoE:ModalPE,
    venta:PuntoVenta,
    cliente:ModalC,
    editMP:ModalMP
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}