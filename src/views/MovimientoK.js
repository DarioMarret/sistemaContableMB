import React, { forwardRef, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Card, Col } from "reactstrap";
import axios from 'axios';

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


function MovimientoK(props) {
    const { location, history } = props


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
            title: 'Fecha', 
            field: 'fecha',
            type:'date'
        },
        {
            title: 'Producto',
            field: 'producto_mp',
        },
        {
            title: 'U. Medida',
            field: 'medida',
        },
        {
            title: 'Factura',
            field: 'n_factura_kx',
        },
        {
            title: 'P. Promedio',
            field: 'precio_kx',
            render: rowData => rowData.precio_kx.toFixed(2)
        },
        {
            title: 'Egreso',
            field: 'cat_venta_kc',
        },
        {
            title: 'Ingreso',
            field: 'cat_compra_kx',
        },
        {
            title: 'Saldo',
            render: rowData => rowData.cantidad_kx  
        },
    ]

    const [productK, setproductK] = useState([])
    const ListarkardexP=async()=>{
        let path = location.pathname
        let id = path.split("/")
        let codigo=id[3]
        let empresa = localStorage.getItem('empresa:')
        const {data} = await axios.post('http://34.196.59.251:4000/kardex/listaProduct',{empresa, codigo})
        console.log(data)
        setproductK(data)
    }
    useEffect(() => {
        ListarkardexP()
    },[])
    return (
        <div className="content">
            <Card className="">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick="">Saldo Inicial</button>
                </Col>
            </Card>
            <Card>
                <MaterialTable columns={columnas}
                    title="Kardex"
                    data={productK}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <ChevronRight />,
                            tooltip: "Ver-Movimientos",
                            onClick: (event, rowData) => history.push("/admin/kardexEdit/"+rowData.codigo_producto_kx)
                        },
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
                        pageSize:20,
                    }}
                />
            </Card>

        </div>
    );
}

export default withRouter(MovimientoK);