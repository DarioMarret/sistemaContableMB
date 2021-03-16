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
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import axios from 'axios'
import { withRouter } from "react-router-dom";
// import { Button } from '@material-ui/core'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Ventas() {

  const [desde, setdesde] = useState('')
  const [hasta, sethasta] = useState('')
  const [venta, setventa] = useState([])
  var rest = 0;
  var base = '';

  const Ventas_R = async () => {
    const ventas = await axios.post('http://54.156.16.123:4000/reporte/ventas', { desde, hasta })
    setventa(ventas.data)
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h4">Tabla Reporte de Ventas</CardTitle>
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
                          onClick={() => Ventas_R()}
                        ></i>
                      </InputGroup>
                    </div>
                    <div className="col-md-5 mb-0" style={{ padding: "0px" }}>
                      <InputGroup className="mb-0">
                        <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-success"
                          table="ventasId"
                          filename="Ventas"
                          sheet="Reporte_Vxls"
                          buttonText="XLS" />
                        <input type="button" value="PDF" className="btn btn-danger" />
                        <input type="button" value="PRINT" className="btn btn-info" />
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive id="ventasId">
                  <thead className="text-primary">
                    <tr>
                      <th>Fecha</th>
                      <th>Factura/Ticke</th>
                      <th>CI/Ruc</th>
                      <th>Razon Social</th>
                      <th>Estado</th>
                      <th>Metodo de Pago</th>
                      <th>Base Imponible</th>
                      <th>Impuesto</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venta.map((iten) => (
                      <tr>
                        <td>{iten.fecha ? rest = iten.fecha.split("T", 1) : ''}</td>
                        <td>TK-{iten.n_factura}</td>
                        <td>{iten.cedula}</td>
                        <td>{iten.nombre}</td>
                        <td>{iten.anuladas}</td>
                        <td>Efectivo</td>
                        <td>{iten.total.toFixed(2) ? base = (iten.total / 1.12).toFixed(2) : ''}</td>
                        <td>{iten.impuesto}</td>
                        <td>{iten.total.toFixed(2)}</td>
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

export default withRouter(Ventas);
