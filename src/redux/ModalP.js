import axios from 'axios'

//constantes
const dataInicial = {
    array: [],
    ok: ''
}
//tyoe
const OBTENER_PRODUCTO = 'OBTENER_PRODUCTO'
const ACTUALIZAR = 'ACTUALIZAR'
const DESACTIVAR = 'DESACTIVAR'
//reducer
export default function ModalPE(state = dataInicial, action) {

    switch (action.type) {
        case OBTENER_PRODUCTO:
            return { ...state, array: action.payload }
        case ACTUALIZAR:
            return { ...state, ok: action.payload }
        case DESACTIVAR:
            return { ...state, ok: action.payload }
        default:
            return state
    }
}

//acciones
export const ObtenerProductosAccion = (id) => async (dispatch, getState) => {
    try {
        const rest = await axios.put('http://54.156.16.123:4000/inventario/actualizar', { id })
        dispatch({
            type: OBTENER_PRODUCTO,
            payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const ActualizarProducto = (productoE) => async (dispatch, getState) => {
    try {
        const rest = await axios.put('http://54.156.16.123:4000/inventario/actualizar', { productoE })
        dispatch({
            type: ACTUALIZAR,
            payload: rest.data
        })
    } catch (error) {
        console.log(error);
    }
}
export const DesactivarOk = () => (dispatch, getState) => {
    try {
        let rest = ''
        dispatch({
            type: DESACTIVAR,
            payload: rest
        })
    } catch (error) {
        console.log(error);
    }
}