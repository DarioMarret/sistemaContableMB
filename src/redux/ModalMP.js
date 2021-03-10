import axios from 'axios'

//constantes
const dataInicial = {
    editarM_P: [],
    ok: ''
}
//type
const OBTENER_ID_MP = 'OBTENER_ID_MP'
const DESACTIVAR_MP = 'DESACTIVAR_MP'
//reducer
export default function ModalMPrima(state = dataInicial, action) {

    switch (action.type) {
        case OBTENER_ID_MP:
            return { ...state, editarM_P: action.payload }
        case DESACTIVAR_MP:
            return { ...state, ok: action.payload }
        default:
            return state
    }
}
//acciones
export const ObtenerMPrima_IdEdit = (id, empresa) => async (dispatch, getState) => {
    try {
        const rest = await axios.put('http://localhost:4000/inventario/ObtenerMPrima_IdEdit', { id, empresa })
        dispatch({
            type: OBTENER_ID_MP,
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
            type: DESACTIVAR_MP,
            payload: rest
        })
    } catch (error) {
        console.log(error);
    }
}