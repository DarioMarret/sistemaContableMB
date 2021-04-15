import { Card } from '@material-ui/core';
import React from 'react';
import { withRouter, NavLink } from "react-router-dom";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    CardFooter,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";


const PVenta = (props) => {

    return (
        <div className="content">
            <Card className="card-user">
                <CardHeader>
                    <div className="text-center">
                        <h2>Sistema de Punto de Venta</h2>
                        <hr />
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="4" className="d-flex justify-content-center" >
                            <img src="https://warescolombia.net/wp-content/uploads/2019/02/Desktop-pos-restaurant.png" alt="punto de venta desktop" width="300px" />
                        </Col>
                        <Col md="4" className="d-flex justify-content-center" >
                            <img src="https://i.pinimg.com/originals/7e/71/84/7e71848a389c81a4ca6a02dec225c6a6.png" alt="punto de venta web" width="300px" />
                        </Col>
                        <Col md="4" className="d-flex justify-content-center" >
                            <img src="https://inteligensa.us/wp-content/uploads/2015/12/id816.jpg" alt="punto de venta movil" width="300px" />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col md="4" className="d-flex justify-content-center">
                            <button className="btn btn-info group-control">Descarga</button>
                        </Col>
                        <Col md="4" className="d-flex justify-content-center">
                        <NavLink to="/admin/punto_venta" className="btn btn-info group-control">Punto de Venta</NavLink>
                        </Col>
                        <Col md="4" className="d-flex justify-content-center">
                        <button className="btn btn-info group-control">Descarga</button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </div>
    );
}

export default withRouter(PVenta);