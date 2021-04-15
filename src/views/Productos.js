
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
import { useDispatch, useSelector } from 'react-redux'
import {ObtenerProductosAccion} from '../redux/ModalP'

import axios from 'axios';
import ModalP from '../components/ModalG/ModalP';

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const Productos = (props) => {
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
            title: 'Producto', 
            field: 'producto', 
            type: 'text', validate: rowData => rowData.producto !== '' ? 'Name cannot be empty' : '',
        },
        {
            title: 'Codigo',
            field: 'codigo',
            type: 'numeric',
        },
        {
            title: 'Unidad',
            field: 'unidad',
            type: 'numeric',
        },
        {
            title: 'Medida',
            field: 'medida',
            type: 'numeric',
        },
        {
            title: 'Precio S.Impueto',
            field: 'precio_compra',
            render: rowData => rowData.precio_compra.toFixed(2)
        },
        {
            title: 'Precio C.Impueto',
            field: 'precio_venta',
            render: rowData => rowData.precio_venta.toFixed(2)

        },
        {
            title: 'Iva en venta',
            field: 'iva_venta',
            render: rowData => rowData.iva_venta.toFixed(2)

        },
        {
            title: 'Servicio en Venta',
            field: 's_venta',
            render: rowData => rowData.s_venta.toFixed(2)
        },
    ]


    const DeleteProducto = async (id) => {
        swal({
            text: 'Seguro de Eliminar el Producto',
            icon: "warning",
            showDenyButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result) {
                const rest = axios.delete('http://34.196.59.251:4000/inventario/delete/'+id)
                if (rest.data === 'Producto No Pudo ser Eliminado') {
                    swal({text:rest.data})
                } else {
                    swal({
                        text: 'El producto Fue Eliminado',
                        icon: "success",
                        timer: 3000,
                    })
                    ListaProductos()
                }
            }

        })
    }

    const dispatch = useDispatch()
   

    const [productos, setproductos] = useState([])
    const ListaProductos = async () => {
        const rest = await axios.get('http://34.196.59.251:4000/inventario/productos')
        setproductos(rest.data)
    }
    const [OpenModal, setOpenModal] = useState(false)
    const [Title, setTitle] = useState("")
    const handleNuevoP=()=>{
        setTitle("NuevoProducto")
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
                    <button className="btn btn-primary" onClick={() =>history.push('/admin/costeo') }>Costeo por producto</button>
                    <button className="btn btn-primary" onClick={() =>history.push("/admin/costeoreceta")}>Productos Costeados</button>
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
                    title="Lista de Productos"
                    data={productos}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: "Editar",
                            onClick: (event, rowData) => dispatch(ObtenerProductosAccion(rowData.id))+setOpenModal(!OpenModal)
                        },
                        {
                            icon: () => <Delete />,
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => DeleteProducto(rowData.id)
                        }
                    ]}
                    options={{
                        selectionProps: rowData => ({
                            disabled: rowData.venta === 34,
                            color: '#313131',
                        }),
                        headerStyle: {
                            backgroundColor: '#51cbce',
                            color: '#313131',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        },
                        bodyStyle: {
                            padding: '0'
                        },
                        pageSize:10
                    }}
                />
            </Card>
            <ModalP
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                Title={Title}
                setTitle={setTitle}
                ListaProductos={ListaProductos}
            />
        </div>
    );
};

export default withRouter(Productos);