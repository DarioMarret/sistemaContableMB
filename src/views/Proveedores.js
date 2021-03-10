import React, {useEffect, useState, useRef, forwardRef} from 'react';
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from 'reactstrap'
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
import axios from 'axios';
import  MaterialTable from 'material-table'

function Proveedores(props) {
    const { history }=props
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
            title: 'RUC',
            field: 'ruc',
        },
        {
            title: 'Razon Social',
            field: 'razon_social',
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Direccion',
            field: 'direccion',
        },
        {
            title: 'Telefono',
            field: 'telefono',
        }
    ]
    const [proveedores, setproveedores] = useState([])
    const ListaProveedores=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const res = await axios.get('http://localhost:4000/proveedores/lista/'+empresa)
        if(res.data.length > 0){
            setproveedores(res.data)
        }
    }
    useEffect(()=>{
        ListaProveedores()
    },[])

    return (
        <div className="content">
            <Card className="p-2">
                <Col className="justify-content-start">
                    <button className="btn btn-primary">Nuevo Proveedor</button>
                </Col>
            </Card>
            <Card>
            <MaterialTable
                    title="Lista de Proveedores"
                    icons={tableIcons}
                    columns={columnas}
                    data={proveedores}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: "Editar",
                            onClick: (event, rowData) => history.push("/admin/proveedoresEdit/"+rowData.id)
                        },
                        {
                            icon: () => <Delete />,
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => alert("Eliminar producto")
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

export default withRouter(Proveedores);