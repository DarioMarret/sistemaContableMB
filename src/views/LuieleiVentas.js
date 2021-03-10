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

function LuiVentas() {
  const [desde, setdesde] = useState('')
  const [hasta, sethasta] = useState('')
  const [venta, setventa] = useState([])
  const Ventas_R = async () => {
    const ventas = await axios.post('http://54.156.16.123:4000/luielei/ventas',{desde, hasta})
    setventa(ventas.data)
  }
  var rest = '';
  var base ;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Tabla Reporte de Ventas</CardTitle>
                <p className="card-category">
                  Lui e Lei
                  </p>

                <div className="bg-transparent" align="center">
                  <div className="form-group row justify-content-between bg-transparent">
                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                      className="download-table-xls-button btn btn-success"
                      table="ventasId"
                      filename="Ventas_xls"
                      sheet="Reporte_Vxls"
                      buttonText="Download XLS" />
                    <i>
                      <input type="date" className="form-control" onChange={(e) => setdesde(e.target.value)} />
                      <label htmlFor="" className="font-bold" >Desde:</label>
                    </i>
                    <i>
                      <input type="date" className="form-control" onChange={(e) => sethasta(e.target.value)} />
                      <label htmlFor="" className="font-bold" >Hasta: </label>
                    </i>
                    <div className="form-group">
                      <button className="form-control btn btn-primary" onClick={() => Ventas_R()}>GENERAR</button>
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
                        <td>{iten.fecha ? rest = iten.fecha.split("T",1) : ''}</td>
                        <td>TK{iten.n_factura}</td>
                        <td>{iten.cedula}</td>
                        <td>{iten.nombre}</td>
                        <td>{iten.anuladas}</td>
                        <td>Efectivo</td>  
                        <td>${iten.total.toFixed(2) ? base = (iten.total / 1.12).toFixed(2) : '' }</td>
                        <td>${iten.impuesto}</td>
                        <td>${iten.total.toFixed(2)}</td>
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

export default LuiVentas;
