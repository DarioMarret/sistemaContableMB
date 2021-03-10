import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function LuieOtros() {
    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const [gastos, setgastos] = useState([])
    // var resFecha = hasta.split("-");
    // var reversedFecha = resFecha.reverse(); 
    // var FechaOb=reversedFecha.join('-');
    // alert(FechaOb);
    console.log(desde,  hasta);

    const Generar = async () => {
        const gasto = await axios.post('http://54.156.16.123:4000/luielei/otros', {desde, hasta} )
        console.log(gasto.data);
        setgastos(gasto.data)
    }
    const Gastos_R = async () => {
        const gasto = await axios.get('http://54.156.16.123:4000/luielei/otros')
        setgastos(gasto.data)
    }
    useEffect(() => {
        Gastos_R()
    }, [])

    var rest = '';

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-plain">
                            <CardHeader>
                                <CardTitle tag="h4">Tabla Reporte de Gastos_Otros</CardTitle>
                                <p className="card-category">
                                    Lui e Lei
                                </p>
                                <div className="bg-transparent" align="center">
                                    <div className="form-group row justify-content-between bg-transparent">
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button btn btn-success btn-ms"
                                            table="gastosId"
                                            filename="Gastos_xls"
                                            sheet="Reporte_Gxls"
                                            buttonText="Download XLS" />
                                        <i>
                                            <input type="date" className="form-control" onChange={(e)=>setdesde(e.target.value)} />
                                            <label htmlFor="" className="font-bold" >Desde:</label>
                                        </i>
                                        <i>
                                            <input type="date" className="form-control" onChange={(e)=>sethasta(e.target.value)} />
                                            <label htmlFor="" className="font-bold" >Hasta: </label>
                                        </i>
                                        <div className="form-group">
                                            <button className="form-control btn btn-primary"  onClick={()=>Generar()}>GENERAR</button>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive id="gastosId">
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Fecha</th>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gastos.map((iten) => (
                                            <tr>
                                                <td>{iten.fecha ? rest = iten.fecha.split("T",1) : ''}</td>
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

export default LuieOtros;
