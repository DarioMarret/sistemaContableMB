import React, {useEffect, useState, useRef, forwardRef} from 'react';
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from 'reactstrap'
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
import axios from 'axios';

function Users(props) {
    const {history} = props;

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
            title: 'Cargo',
            field: 'cargo',
        },
        {
            title: 'Nombre',
            field: 'nombre',
        },
        {
            title: 'Apellido',
            field: 'apellido'
        },
        {
            title: 'Direccion',
            field: 'direccion',
        },
        {
            title: 'Telefono',
            field: 'telefono',
        },
        {
            title: 'Tipo',
            field: 'tipo',
        }
    ]

    const [empleado, setempleado] = useState([])
    const ListaEmpleado=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.get('http://34.196.59.251:4000/empleado/lista/'+empresa)
        setempleado(rest.data)
    }
    useEffect(() => {
        ListaEmpleado()
    }, [])
    const EliminarEmpleado=async(id)=>{
        await axios.delete('http://34.196.59.251:4000/empleado/delete/'+id)
        ListaEmpleado()
    }
    const DetallarEmpleado=(id)=>{
        history.push('/admin/editar/'+id)
    }
    return (
        <div className="content">
            <Card className="card-user">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick={()=>history.push('/admin/EmpledoNuevo')}>Nuevo Empleado</button>
                </Col>
            </Card>
            <Card className="card-user">
            <MaterialTable
                    title=""
                    data={empleado}
                    icons={tableIcons}
                    columns={columnas}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: "Editar",
                            onClick: (event, rowData) => DetallarEmpleado(rowData.id)
                        },
                        {
                            icon: () => <Delete />,
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => EliminarEmpleado(rowData.id)
                        }
                    ]}
                    options={
                        {
                            pageSize:10,
                        }
                    }
                />
            </Card>
        </div>
    );
}

export default withRouter(Users);