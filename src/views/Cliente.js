import React, { forwardRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Card, Col } from "reactstrap";
import MaterialTable from 'material-table'

import Edit from '@material-ui/icons/Edit'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Search from '@material-ui/icons/Search'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Delete } from '@material-ui/icons'
import swal from 'sweetalert';
import { useDispatch } from 'react-redux'
import {EditarCliente} from '../redux/ModalCliente'

import axios from 'axios';
import ModalC from '../components/ModalG/ModalC';

function Cliente(props) {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }
    const columnas = [
        {
            title: 'Nombre', 
            field: 'nombre',
        },
        {
            title: 'Cedula/RUC',
            field: 'cedula',
        },
        {
            title: 'Correo',
            field: 'email',
        },
        {
            title: 'Contacto',
            field: 'telefono',
        },
        {
            title: 'Direccion',
            field: 'direccion',
        },
    ]


    const DeleteProducto = async (id) => {
        swal({
            text: 'Seguro de Eliminar el Cliente',
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result) {
                const rest = axios.delete('http://localhost:4000/clientes/delete/'+id)
                if (rest.data === 'Producto No Pudo ser Eliminado') {
                    swal({text:rest.data})
                } else {
                    swal({
                        text: 'El producto Fue Eliminado',
                        icon: "success",
                        timer: 3000,
                    })
                    ListaClientes()
                }
            }

        })
    }

    const dispatch = useDispatch()
    
    const [cliente, setcliente] = useState([])
    const ListaClientes = async () => {
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://localhost:4000/clientes/lista',{empresa})
        setcliente(rest.data)
    }

    const [OpenModal, setOpenModal] = useState(false)
    const [Title, setTitle] = useState("")
    const handleNuevoP=()=>{
        setTitle("NuevoProducto")
        setOpenModal(!OpenModal)
    }

    const handleEditar=(id)=>{
        let empresa = localStorage.getItem('empresa:')
        dispatch(EditarCliente(id,empresa))
        setTitle("Editar")
        setOpenModal(!OpenModal)
    }
    useEffect(() => {
        ListaClientes()
    }, [])

    return (
        <div className="content">
            <Card className="">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick={() =>handleNuevoP() }>Nuevo Cliente</button>
                </Col>
            </Card>
            <Card>
                <MaterialTable columns={columnas}
                    title="Lista de Clientes"
                    data={cliente}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: "Editar",
                            onClick: (event, rowData) => handleEditar(rowData.id)
                        },
                        {
                            icon: () => <Delete />,
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => DeleteProducto(rowData.id)
                        }
                    ]}
                    options={{
                        headerStyle: {
                            backgroundColor: '#51cbce',
                            color: '#313131',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        },
                        bodyStyle: {
                            padding: '0'
                        }
                    }}
                />
            </Card>
            <ModalC
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                Title={Title}
                ListaClientes={ListaClientes}
            />
        </div>
    );
}

export default withRouter(Cliente);