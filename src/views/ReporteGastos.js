import React, { useState, useEffect } from "react";

// reactstrap components
import {
    InputGroup,
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
} from "reactstrap";
import axios from 'axios'
import { withRouter } from "react-router-dom";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Gastos() {

    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const [gastos, setgastos] = useState([])
    const Gastos_R = async () => {
        const gasto = await axios.post('http://54.156.16.123:4000/reporte/gastos', { desde, hasta })
        setgastos(gasto.data)
    }
    var rest = '';

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h4">Tabla Reporte de Gastos</CardTitle>
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
                                                <Input type="date" className="form-control" id="hasta" onChange={(e) => sethasta(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-1 my-1 " style={{ height: "10%", width: "5%" }}>
                                            <InputGroup>
                                                <i className="nc-icon nc-zoom-split" role="button" style={{ fontSize: "30px" }}
                                                    onClick={() => Gastos_R()}
                                                ></i>
                                            </InputGroup>
                                        </div>
                                        <div className="col-md-5 mb-0" style={{ padding: "0px" }}>
                                            <InputGroup className="mb-0">
                                                <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-success"
                                                table="gastosId"
                                                filename="Gastos"
                                                sheet="Reporte_Gxls"
                                                buttonText="XLS" />
                                                <input type="button" value="PDF" className="btn btn-danger" />
                                                <input type="button" value="PRINT" className="btn btn-info" />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive id="gastosId">
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Factura</th>
                                            <th>Ruc:</th>
                                            <th>Razon/SC</th>
                                            <th>Autorizacion</th>
                                            <th>Detalle</th>
                                            <th>Total</th>
                                            <th>Iva 12%</th>
                                            <th>Base 12%</th>
                                            <th>Base 0%</th>
                                            <th>No Objeto Iva</th>
                                            <th>Sin Iva</th>
                                            <th>Fecha</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gastos.map((iten) => (
                                            <tr>
                                                <td>{iten.factura}</td>
                                                <td>{iten.ruc}</td>
                                                <td>{iten.razon_sc}</td>
                                                <td>{iten.autorizacion}</td>
                                                <td>{iten.detalle}</td>
                                                <td>${iten.gastos.toFixed(2)}</td>
                                                <td>${iten.impuesto.toFixed(2)}</td>
                                                <td>${iten.base12.toFixed(2)}</td>
                                                <td>${iten.base0.toFixed(2)}</td>
                                                <td>${iten.no_objeto_iva.toFixed(2)}</td>
                                                <td>${iten.sin_iva.toFixed(2)}</td>
                                                <td>{iten.fecha ? rest = iten.fecha.split("T", 1) : ''}</td>
                                                <td></td>
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
        </>
    );
}

export default withRouter(Gastos);
