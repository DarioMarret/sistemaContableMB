import axios from 'axios'

//constantes
const dataInicial = {
    array: [],
    ok: ''
}
//tyoe
const OBTENER_CLIENTE_ID = 'OBTENER_CLIENTE_ID'
const ACTUALIZAR = 'ACTUALIZAR'
const DESACTIVAR = 'DESACTIVAR'
//reducer
export default function ModalCliente(state = dataInicial, action) {

    switch (action.type) {
        case ACTUALIZAR:
            return { ...state, ok: action.payload }
        case OBTENER_CLIENTE_ID:
            return { ...state, array: action.payload }
        case DESACTIVAR:
            return { ...state, ok: action.payload }
        default:
            return state
    }
}

//acciones
export const EditarCliente = (id, empresa, EditClient) => async (dispatch, getState) => {
    try {
        const rest = await axios.put('http:/34.196.59.251/:4000/clientes/EditarCliente', { id, empresa, EditClient })
        dispatch({
            type: OBTENER_CLIENTE_ID,
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