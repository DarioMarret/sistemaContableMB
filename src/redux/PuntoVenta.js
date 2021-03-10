import axios from 'axios'

//constantes
const dataInicial = {
    array: [],
    ultimaorden: [],
    ordenAnterior: [],
    verPedido: [],
    ordenCliente:[],
    echo: false
}
//tyoe
const OBTENER_PRODUCTO = 'OBTENER_PRODUCTO'
const OBTENER_ORDEN = 'OBTENER_ORDEN'
const OBTENET_ULTIMA_ORDEN = 'OBTENET_ULTIMA_ORDEN'
const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO'
const VER_PEDIDO = 'VER_PEDIDO'
const ELIMINAR_ORDEN = 'ELIMINAR_ORDEN'
const ECHO = 'ECHO'
const ORDEN_CLIENTE = 'ORDEN_CLIENTE'
const ACTUALIZAR_CANTIDAD = 'ACTUALIZAR_CANTIDAD'

//reducer
export default function PuntoVenta(state = dataInicial, action) {

    switch (action.type) {
        case OBTENER_PRODUCTO:
            return { ...state, array: action.payload }
        case OBTENER_ORDEN:
            return { ...state, ultimaorden: action.payload }
        case OBTENET_ULTIMA_ORDEN:
            return { ...state, ordenAnterior: action.payload }
        case AGREGAR_PRODUCTO:
            return { ...state, verPedido: action.payload }
        case VER_PEDIDO:
            return { ...state, verPedido: action.payload }
        case ELIMINAR_ORDEN:
            return { ...state, echo: action.payload }
        case ECHO:
            return { ...state, echo: action.payload }
        case ORDEN_CLIENTE:
            return { ...state, echo: action.payload }
        case ACTUALIZAR_CANTIDAD:
            return { ...state, echo: action.payload }

        default:
            return state
    }
}
//acciones
export const ObtenerProductosVenta = (busqueda,empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/buscarproductoVenta', { busqueda, empresa})
        dispatch({
            type: OBTENER_PRODUCTO,
            payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const ObtenerUltimaOrden = (empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.get('http://localhost:4000/ventaWeb/ObtenerUltimaOrden/'+empresa)
        dispatch({
            type: OBTENER_ORDEN,
            payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const AgregarProductoOrden = (Orden) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/Agregarorden', { Orden })
        dispatch({
            type: OBTENER_ORDEN,
            // payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const VerProductoOrden = (id_orden, empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/VerPedido', { id_orden, empresa })
        dispatch({
            type: VER_PEDIDO,
            payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const Reset = () => async (dispatch, getState) => {
    try {
        let array = []
        dispatch({
            type: VER_PEDIDO,
            payload: array
        })
    } catch (error) {
        console.log(error);
    }
}
export const EliminarPedidoOrden = (id) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/EliminarPedidoOrden', { id })
        if (rest.data === "ok") {
            dispatch({
                type: ELIMINAR_ORDEN,
                payload: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const ActualizarCantidad = (id, cantidad, precioV, empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/ActualizarCantidad', { id, cantidad, precioV, empresa })
        dispatch({
            type: ACTUALIZAR_CANTIDAD,
            payload: true
        })
    } catch (error) {
        
    }
}
export const AgregarCliente = (ruc, id_orden, empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.post('http://localhost:4000/ventaWeb/AgregarCliente', { ruc, id_orden, empresa})
        if (rest.data !== 'no existe') {
            dispatch({
                type: ORDEN_CLIENTE,
                payload: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const Echo = () => async (dispatch, getState) => { dispatch({ type: ECHO, payload: false }) }