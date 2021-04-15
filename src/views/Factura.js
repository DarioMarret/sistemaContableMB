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


function Factura(props) {


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
            title: 'T. Documento', 
            field: 'documento_fc',
        },
        {
            title: 'Cedula/RUC',
            field: 'ruc_fc',
        },
        {
            title: 'Emision',
            field: 'punto_emision_fc',
        },
        {
            title: 'N. Factura',
            field: 'numero_factura',
        },
        {
            title: 'Total',
            field: 'Total',
            render: rowData => rowData.Total.toFixed(2)
        },
        {
          title: 'Fecha Emision',
          field: 'fecha_fc',
          type: 'date'
        },
        {
          title: 'E.',
          field: 'estado',
          render: rowData => rowData.estado === 'A'? "Ok":"Anulado"
      },
    ]

    const DeleteProducto = async (id, estado) => {
        swal({
          text: 'Seguro de Anular Esta Factura',
          icon: "warning",
          showDenyButton: true,
          showCancelButton: true,
        }).then(async(result) => {
        if (result) {
            let empresa = localStorage.getItem('empresa:')
            const rest = await axios.put('http://34.196.59.251:4000/pagos/anular',{id,empresa,estado})
            console.log(rest)
            if (rest.data != 'Error') {
              ListaClientes()
            }
        }
      })
    }

    const dispatch = useDispatch()
    
    const [cliente, setcliente] = useState([])
    const ListaClientes = async () => {
        let empresa = localStorage.getItem('empresa:')
        const {data} = await axios.post('http://34.196.59.251:4000/pagos/lista',{empresa})
        setcliente(data)
    } 

    const handleDescarga=async(id)=>{
        let empresa = localStorage.getItem('empresa:')
        let factura = id;
        const {data} = await axios.post("http://34.196.59.251:4000/pagos/descargaPdf",{empresa,factura})
        if (data.length > 0){
          console.log(data)
          window.open('http://34.196.59.251/impresora/prueba.php?datos='+JSON.stringify(data)+'&factura='+id, '_blank');
        }
      }

    const handleEditar=(id)=>{
      let empresa = localStorage.getItem('empresa:')
     
  }
    useEffect(() => {
        ListaClientes()
    }, [])

    return (
        <div className="content">
            <Card>
                <MaterialTable columns={columnas}
                    title="Facturas Emitidas"
                    data={cliente}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <SaveAlt />,
                            tooltip: "Descargar",
                            onClick: (event, rowData) => handleDescarga(rowData.numero_factura)
                        },
                        {
                            icon: () => <AddBox />,
                            tooltip: "Re-Imprimir",
                            onClick: (event, rowData) => handleEditar(rowData.numero_factura)
                        },
                        {
                            icon: () => <Remove />,
                            tooltip: "Anular",
                            onClick: (event, rowData) => DeleteProducto(rowData.numero_factura, rowData.estado)
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
                        pageSize:20,
                        exportButton: true,
                    }}
                />
            </Card>
        </div>
    );
}

export default withRouter(Factura);