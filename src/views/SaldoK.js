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

function SaldoK(props) {
    const { history } = props;

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
            field: 'fecha_kxs',
            type: 'date',
        },
        {
            title: 'Producto',
            render: rowData => rowData.producto_mp
        },
        {
            title: 'Saldo',
            field: 'saldo_kxs',
            type:'numeric',
        },
    ]

    const Redurect = () => {
        history.push("/admin/kardex")
    }

    const [Saldo, setSaldo] = useState([])
    const ListaKardex = async () => {
        let empresa = localStorage.getItem('empresa:')
        const { data } = await axios.post('http://34.196.59.251:4000/kardex/SaldoInicial', { empresa })
        setSaldo(data)
    }
    const ActualizarSaldo=async(saldo,id)=>{
        let empresa = localStorage.getItem('empresa:')  
        const { data } = await axios.put('http://34.196.59.251:4000/kardex/SaldoInicial', { empresa, id, saldo })
        if(data){
            ListaKardex()
        }
    }
    useEffect(() => {
        ListaKardex()
    }, [])


    return (
        <div className="content">
            <Card className="">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick={() => Redurect()}>Regresar</button>
                </Col>
            </Card>
            <Card>
                <MaterialTable columns={columnas}
                    title="Kardex"
                    data={Saldo}
                    icons={tableIcons}
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
                        pageSize: 20,
                    }}
                    editable={{
                        // onRowAdd: newData =>
                        //     new Promise((resolve, reject) => {
                        //         setTimeout(() => {
                        //             setData([...data, newData]);
                        //             resolve();
                        //         }, 1000)
                        //     }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                    console.log(newData)
                                setTimeout(() => {
                                    ActualizarSaldo(newData.saldo_kxs,newData.id)
                                    resolve();
                                }, 1000)
                            }),
                    }}
                />
            </Card>
        </div>
    );
}

export default SaldoK;