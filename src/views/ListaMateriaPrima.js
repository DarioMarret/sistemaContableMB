import React, { forwardRef, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import MaterialTable from 'material-table'
import ExportExcel from 'react-export-excel'


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
import {useDispatch} from 'react-redux'
import {ObtenerMPrima_IdEdit} from '../redux/ModalMP'

import axios from 'axios';
import ModalMP from '../components/ModalG/ModalMP';
import ModalCMP from '../components/ModalG/ModalCMP';

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const ListaMateriaPrima = (props) => {
    const { history} = props;
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
            title: 'Codigo', 
            field: 'codigo_mp', 
            type: 'text', 
        },
        {
            title: 'Producto',
            field: 'producto_mp',
            type: 'text',
        },
        {
            title: 'Medida',
            field: 'medida',
        },
        {
            title: 'Codigo de Barra',
            field: 'codigo_barra_mp',
        },
        {
            title: 'Estado',
            field: 'estado_mp',
        },
    ]


    const DeleteProducto = async (id) => {
        alert(id)
        swal({
            text: 'Seguro de Eliminar el Producto',
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result) {
                let empresa = localStorage.getItem('empresa:')
                const rest = axios.delete('http://localhost:4000/inventario/delete_materia_prima/'+id+"/"+empresa)
                if (rest.data === 'ok') {
                    ListaProductos()
                } else {
                    ListaProductos()
                    swal({
                        text: 'El producto Fue Eliminado',
                        icon: "success",
                        timer: 3000,
                    })
                }
            }else{
                ListaProductos()
            }

        })
    }

    const dispatch = useDispatch()
   
    const [productos, setproductos] = useState([])
    const ListaProductos = async () => {
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.get('http://localhost:4000/inventario/materia_prima/'+empresa)
        setproductos(rest.data)
    }
    const [OpenModal, setOpenModal] = useState(false)
    const [OpenModalCMP, setOpenModalCMP] = useState(false)
    const [Title, setTitle] = useState("")
    const handleNuevoP=()=>{
        setTitle("NuevoProducto")
        setOpenModal(!OpenModal)
    }
    const handleEditarProducto=(id)=>{
        let empresa = localStorage.getItem('empresa:')
        dispatch(ObtenerMPrima_IdEdit(id, empresa))
        setTitle("Editar")
        setOpenModal(!OpenModal)
    }

    useEffect(() => {
        ListaProductos()
    }, [])

    return (
        <div className="content">
            <Card className="">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick={() =>handleNuevoP() }>Nuevo productos</button>
                    <button className="btn btn-primary" onClick={() =>setOpenModalCMP(!OpenModalCMP) }>Nueva categoria</button>
                    <ExcelFile element={<button className="btn btn-primary">Exportar productos</button>} filename="Lista de Productos">
                    <ExcelSheet data={productos} name="Stock">
                        <ExcelColumn label="Codigo" value="codigo"/>
                        <ExcelColumn label="Producto" value="producto"/>
                        <ExcelColumn label="Stock" value="stock" />
                        <ExcelColumn label="Ventas" value="venta" />
                    </ExcelSheet>
                </ExcelFile>
                </Col>
            </Card>
            <Card>
                <MaterialTable columns={columnas}
                    title="Lista de Materia Prima"
                    data={productos}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: "Editar",
                            onClick: (event, rowData) =>handleEditarProducto(rowData.id)
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
                        },
                    }}
                />
            </Card>
            <ModalMP
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                Title={Title}
                setTitle={setTitle}
                ListaProductos={ListaProductos}
            />
            <ModalCMP
                OpenModalCMP={OpenModalCMP}
                setOpenModalCMP={setOpenModalCMP}
            />
        </div>
    );
};

export default withRouter(ListaMateriaPrima);