import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, Table, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from "reactstrap";
import axios from 'axios'

function CosteoProducto(props) {

    const [Costeo, setCosteo] = useState([])
    let Costo =[];

    function handleCosteoValue(){
        
        let ingrediente = document.getElementById('ingrediente')
        let cantidad = document.getElementById('cantidad')
        let und_med = document.getElementById('und_med')
        let presentacion = document.getElementById('presentacion')
        let p_compra = document.getElementById('p_compra')
        let p_porcion = parseFloat(cantidad.value) * parseFloat(p_compra.value) / parseFloat(presentacion.value)
        
        const info = {
            ingrediente:ingrediente.value,
            cantidad:cantidad.value,
            und_med:und_med.value,
            presentacion:presentacion.value,
            p_compra:p_compra.value,
            p_porcion:p_porcion
        }
        setCosteo([...Costeo,info]);
        console.log(Costeo);
        ingrediente.value = ""
        cantidad.value = ""
        und_med.value = ""
        presentacion.value = ""
        p_compra.value = ""

    }

    var total =0;
    Costeo.map(iten=>(total+=iten.p_porcion))

    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h3>Costeo de Producto Terminado</h3>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                            <label>Busca un producto</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-badge mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="buscar"
                                    defaultValue=""
                                    type="text"
                                    className="p-2"
                                />
                                </InputGroup>
                        </FormGroup>
                    </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="2">
                        <FormGroup>
                            <label>Ingrediente</label>
                                <Input
                                    name="ingrediente"
                                    id="ingrediente"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1">
                        <FormGroup>
                            <label>Cantidad</label>
                                <Input
                                    name="cantidad"
                                    id="cantidad"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1">
                        <FormGroup>
                            <label>Und Med</label>
                                <Input
                                    name="und_med"
                                    id="und_med"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1">
                        <FormGroup>
                            <label>Presentacion</label>
                                <Input
                                    name="presentacion"
                                    id="presentacion"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1">
                        <FormGroup>
                            <label>Precio Compra</label>
                                <Input
                                    name="p_compra"
                                    id="p_compra"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1" className="p-2">
                        <FormGroup>
                            <button className="btn btn-info" onClick={()=>handleCosteoValue()}>Ingrediente</button>
                        </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody>
                <Row>
                    <Col md="6">
                    <Table responsive>
                        <thead className="bg-info">
                            <tr>
                                <th>Ingrediente</th>
                                <th>Cantidad</th>
                                <th>Und Medida</th>
                                <th>Presentacion</th>
                                <th>P. Compra</th>
                                <th>P. Por Porcion</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Costeo.map((iten)=>(
                                <tr>
                                    <td>{iten.ingrediente}</td>
                                    <td>{iten.cantidad}</td>
                                    <td>{iten.und_med}</td>
                                    <td>{iten.presentacion}</td>
                                    <td>{iten.p_compra}</td>
                                    <td>{iten.p_porcion.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                        <tr style={{ padding:'0px'}}>
                            <th colspan="2" className="table-active "></th>
                            <th colspan="1" className="table-active "></th>
                            <th colspan="1" className="table-active "></th>
                            <th colspan="1" className="table-active text-center fs-4">Costeo</th>
                            <th colspan="1" className="table-active text-start fs-4">${total.toFixed(2)}</th>
                        </tr>
                        </tbody>
                    </Table>
                    </Col>
                    <Col md="6">
                    <div className="d-flex justify-content-end">
                        <div style={{width:'50%'}}>
                        
                        </div>
                    </div>
                    </Col>
                </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default withRouter(CosteoProducto);