import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom'
import ReactToPrint from 'react-to-print';
import axios from 'axios'
import { Card, Row, Col, CardBody, CardHeader, CardFooter } from 'reactstrap'


function Rol(props) {
    const { location,history } = props;
    let path = location.pathname
    let id = path.split("/")
    let desde = id[4]
    let hasta = id[5]

    const [role, setrole] = useState({
        dias:'',
        recibe:'',
        anticipo:'',
        fecha:'',
        cargo:'',
        cedula:'',
        iess:'',
        nombre:'',
        sueldo:'',
        observacion:''
    })
    const RolCedula=async()=>{
        let path = location.pathname
        let id = path.split("/")
        let cedula = id[3]
        let desde = id[4]
        let hasta = id[5]
        let empresa = localStorage.getItem('empresa:');
        const rest = await axios.post('http://34.196.59.251:4000/nomina/RolCedula',{ empresa, cedula, desde, hasta })
        setrole(rest.data)
    }
    useEffect(()=>{
        RolCedula()
    },[])
    const componentRef = useRef();

    return (
        <div className="content">
            <Card>
                <Col>
                    <ReactToPrint
                        trigger={() => <button className="bg-info btn">Print / Pdf</button>}
                        content={() => componentRef.current}
                    />
                </Col>
            </Card>
            <Card >
                <Row className="d-flex justify-content-center">
                    <div style={{ border: "2px solid #C9CBC5", padding: "10px", width: "70%" }}>
                        <div ref={componentRef}>
                                <Row className="d-flex justify-content-center">
                                    <Col md="8" className="d-flex justify-content-between">
                                        <h5><b>Restaurante Luv n Oven</b></h5> <p><b>No<th>___1</th></b></p>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Col md="8" className="d-flex justify-content-between">
                                        <p>ROL DE PAGO INDIVIDUAL</p> <p>DESDE : {desde}  / HASTA : {hasta}</p>
                                    </Col>
                                    <Col md="8" className="d-flex justify-content-start">
                                        <p>EMPLEADO: {role.nombre}</p>
                                    </Col>
                                    <Col md="8" className="d-flex justify-content-start">
                                        <p>CARGO: {role.cargo}</p>
                                    </Col>
                                </Row>
                            <CardBody>
                                <Row className="d-flex justify-content-center">
                                    <Col md="8" className="d-flex justify-content-around">
                                        <th>INGRESO</th>
                                        <th></th>
                                        <th>DESCUENTOS</th>
                                    </Col>
                                    <Col md="8" className="d-flex justify-content-between">
                                        <tbody>
                                            <tr>
                                                <td>SUELDO</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">${role.sueldo}</td>
                                            </tr>
                                            <tr>
                                                <td>HORAS EXTRAS</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">$0.0</td>
                                            </tr>
                                            <tr>
                                                <td>COMISIONES</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">$0.0</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td>APORTACIONES</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">$35.33</td>
                                            </tr>
                                            <tr>
                                                <td>P. QUIROGR. IESS</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">$0.0</td>
                                            </tr>
                                            <tr>
                                                <td>ANTICIPOS</td>
                                                <td style={{width:'50px'}}></td>
                                                <td className="text-center">${role.anticipo}</td>
                                            </tr>
                                        </tbody>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                <Col md="8" className="d-flex justify-content-between bg-primary">
                                    <tbody className="bg-primary">
                                        <tr>
                                            <th>TOTAL INGRESO</th>
                                            <td style={{width:'50px'}}></td>
                                            <th className="texte-center">$ {role.recibe}</th>
                                        </tr>
                                    </tbody>
                                    <tbody className="bg-primary">
                                        <tr>
                                            <th>TOTAL DESCUENTO </th>
                                            <td style={{width:'50px'}}></td>
                                            <th className="text-center">$ 5.00</th>
                                        </tr>
                                    </tbody>
                                </Col>
                                </Row>
                            </CardBody>
                        </div>
                    </div>
                </Row>
            </Card>
        </div>
    );
}

export default withRouter(Rol);