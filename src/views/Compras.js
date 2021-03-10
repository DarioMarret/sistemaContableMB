import React, { useState, useEffect ,forwardRef} from "react";

// reactstrap components
import {InputGroupAddon,InputGroupText,Input,Card,CardHeader,CardBody,Table,Row,Col,InputGroup} from "reactstrap";
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ModalG from "components/ModalG/ModalG";
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

import ExportExcel from 'react-export-excel'


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const Compras = (props) => {

    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const [gastos, setgastos] = useState([])
    const [OpenModal, setOpenModal] = useState(false)
    var rest;

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
             type: 'date',
        },
        {
            title: 'Facturas',
            field: 'factura',
            type: 'text',
        },
        {
            title: 'Razon/sc',
            field: 'razon_sc',
            type: 'text',
        },
        {
            title: 'Cuenta',
            field: 'cuenta',
        },
        {
            title: 'Rubro',
            field: 'detalle',
            type: 'numeric',
        },
        {
            title: 'Total',
            field: 'gastos',
            type: 'float',
        },
        {
            title: '12%',
            field: 'impuesto',
            type: 'numeric',
        },
        {
            title: 'B.12%',
            field: 'base12',
            type: 'numeric',
        },
        {
            title: 'B.0%',
            field: 'base0',
            type: 'numeric',
        },
        {
            title: 'N.iva',
            field: 'no_objeto_iva',
            type: 'numeric',
        },
        {
            title: 'S.iva',
            field: 'sin_iva',
            type: 'numeric',
        },
    ]

    const ListarGasto = async () => {
        let fecha = new Date()
        var año = fecha.getFullYear()
        var mes = fecha.getMonth() + 1
        var dia = fecha.getDate()
        var mesDia = mes > 9 ? mes : "0" + mes + "-" + dia;
        var fecha_Actual = año + "-" + mesDia
        var Mess = mes > 9 ? mes : "0" + mes
        var fecha_Hasta = año + "-" + Mess + "-01";
        console.log(fecha_Actual);
        console.log(fecha_Hasta);
        const gasto = await axios.get('http://54.156.16.123:4000/reporte/otros/' + fecha_Actual + "/" + fecha_Hasta)
        console.log(gasto.data);
        setgastos(gasto.data)
    }

    const Generar = async () => {
        const gasto = await axios.post('http://54.156.16.123:4000/reporte/otros', { desde, hasta })
        console.log(gasto.data);
        setgastos(gasto.data)
    }
    useEffect(() => {
        ListarGasto()
    }, [])
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <div className="bg-transparent" align="center">
                                    <div className="row justify-content-start">
                                        <div className="col-md-3">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Desde:    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="date" className="form-control" id="desde" onChange={(e) => setdesde(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-3">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Hasta:</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="date" className="form-control" id="hasta" onChange={(e) => sethasta(e.target.value)}  />
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-1 my-1 " style={{height:"10%",width:"5%"}}>
                                            <InputGroup>
                                                <i className="nc-icon nc-zoom-split" role="button" style={{fontSize:"30px"}}
                                                onClick={() => Generar()}
                                                ></i>
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-5 mb-0" style={{padding:"0px"}}>
                                        <InputGroup className="mb-0">
                                        <ExcelFile element={<input type="button" value="PDF" className="btn btn-success" />} filename="Compras">
                                            <ExcelSheet data={gastos} name="Stock">
                                                <ExcelColumn label="Fecha" value="fecha"/>
                                                <ExcelColumn label="Factura" value="factura"/>
                                                <ExcelColumn label="Razon/Sc" value="razon_sc" />
                                                <ExcelColumn label="Cuenta" value="cuenta" />
                                                <ExcelColumn label="Rubro" value="detalle" />
                                                <ExcelColumn label="Total" value="gastos" />
                                                <ExcelColumn label="Iva 12%" value="impuesto" />
                                                <ExcelColumn label="B.12%" value="base12" />
                                                <ExcelColumn label="B.0%" value="base0" />
                                                <ExcelColumn label="N.iva" value="no_objeto_iva" />
                                                <ExcelColumn label="S.iva" value="sin_iva" />
                                            </ExcelSheet>
                                        </ExcelFile>
                                        {/* <input type="button" value="PDF" className="btn btn-danger" />
                                        <input type="button" value="PRINT" className="btn btn-info" /> */}
                                        <input type="button" value="Ingresar gasto" className="btn btn-dark" onClick={() => setOpenModal(!OpenModal)} />
                                        </InputGroup>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
                <MaterialTable id="gastosId" columns={columnas}
                title="Compras"
                    data={gastos}
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
                    }}
                />
            </div>
            <ModalG
                ListarGasto={ListarGasto}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}

export default Compras;
