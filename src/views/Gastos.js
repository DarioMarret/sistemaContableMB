import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    InputGroupAddon,
    InputGroupText,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    InputGroup,
} from "reactstrap";
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ModalG from "components/ModalG/ModalG";
// import 'components/SerialPort';

const GastosOtros = (props) => {

    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const [gastos, setgastos] = useState([])
    const [OpenModal, setOpenModal] = useState(false)
    // const [cuenta, setcuenta] = useState({rubro:'proveedor',ruc:'0999999999',factura:'0999999999',noIva:0 ,base0:0 ,base12:0 ,iva: 0 ,ice:0 ,total:0})


    var rest;
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
                                <CardTitle tag="h4">Tabla Reporte de Gastos_Otros</CardTitle>
                                <p className="card-category">
                                    Luv n Oven
                                </p>
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
                                        <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-success"
                                                table="gastosId"
                                                filename="Gastos"
                                                sheet="Reporte_Gxls"
                                                buttonText="XLS" />
                                        <input type="button" value="PDF" className="btn btn-danger" />
                                        <input type="button" value="PRINT" className="btn btn-info" />
                                        <input type="button" value="Ingresar gasto" className="btn btn-dark" onClick={() => setOpenModal(!OpenModal)} />
                                        </InputGroup>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive id="gastosId" style={{ padding: "0" }}>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Factura</th>
                                            <th>Ruc:</th>
                                            <th>Razon/SC</th>
                                            <th>Cuenta</th>
                                            <th>Rubro</th>
                                            <th>Total</th>
                                            <th>Iva 12%</th>
                                            <th>B. 12%</th>
                                            <th>B. 0%</th>
                                            <th>No O. Iva</th>
                                            <th>S. Iva</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gastos.map((iten) => (
                                            <tr>
                                                <td>{iten.fecha ? rest = iten.fecha.split("T", 1) : ''}</td>
                                                <td>{iten.factura}</td>
                                                <td>{iten.ruc}</td>
                                                <td>{iten.razon_sc}</td>
                                                <td>{iten.cuenta}</td>
                                                <td>{iten.detalle}</td>
                                                <th className="text-end">{iten.gastos.toFixed(2)}</th>
                                                <th className="text-end">{iten.impuesto.toFixed(2)}</th>
                                                <th className="text-end">{iten.base12.toFixed(2)}</th>
                                                <th className="text-end">{iten.base0.toFixed(2)}</th>
                                                <th className="text-end">{iten.no_objeto_iva.toFixed(2)}</th>
                                                <th className="text-end">{iten.sin_iva.toFixed(2)}</th>
                                            </tr>
                                        ))
                                        }

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            <ModalG
                ListarGasto={ListarGasto}
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}

export default GastosOtros;
