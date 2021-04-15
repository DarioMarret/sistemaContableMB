import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { Card, Button, InputGroupText, Row, Col, Input, FormGroup,InputGroup,InputGroupAddon } from 'reactstrap'

function NuevoProveedor(props) {
    const { history } = props


    const [proveedores, setproveedores] = useState({
        empresa: localStorage.getItem('empresa:'),
        ruc: '',
        razon_social: '',
        telefono: '',
        direccion: '',
        email: '',
        credito: '',
        pagina_web: '',
        celular: '',
        contacto: '',
        banco: '',
        tipo_cuenta: '',
        numero_cuenta: ''
    })
    
    const handleNuevoProduct=(e)=>{
        setproveedores({
            ...proveedores,
            [e.target.name]:e.target.value
        })
    }
    const ListaProveedores=async()=>{
        const {data} = await axios.post('http://34.196.59.251:4000/proveedores/proveedor',{proveedores})
        if(data === "ok"){
            history.push('/admin/proveedores')
        }
    }

    return (
        <div className="content">
            <Card className="p-2">
                <Col className="justify-content-start">
                    <button className="btn btn-primary" onClick={()=>history.push('/admin/proveedores')}>REGRESAR</button>
                </Col>
            </Card>
            <Card className="p-4">
                <Row>
                    <Col md="3">
                        <FormGroup>
                            <label>CEDULA/RUC</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-badge mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="ruc"
                                defaultValue={proveedores.ruc}
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>RAZON SOCIAL</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-istanbul mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="razon_social"
                                defaultValue={proveedores.razon_social}
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            /></InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>TELEFONO</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-headphones mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="telefono"
                                defaultValue={proveedores.telefono}
                                type="text"  
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>DIRECCION</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-world-2 mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="direccion"
                                defaultValue={proveedores.direccion}
                                type="text" 
                                className="p-2"  
                                onChange={(e)=>handleNuevoProduct(e)}                           
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>EMAIL</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="nc-icon nc-send mx-3"></i></InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="email"
                                defaultValue={proveedores.email}
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>DIAS DE CREDITO</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-button-pause mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="credito"
                                defaultValue={proveedores.credito}
                                type="text" 
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>PAGINA WEB</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-globe mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="pagina_web"
                                defaultValue={proveedores.pagina_web}
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>CELULAR</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-mobile mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="celular"
                                defaultValue={proveedores.celular}
                                type="text" 
                                className="p-2" 
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>CONTACTO</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-circle-10 mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="contacto"
                                defaultValue={proveedores.contacto}
                                type="text"  
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>BANCO</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-bank mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="banco"
                                defaultValue={proveedores.banco}
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>TIPO DE CUENTA</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-credit-card mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="tipo_cuenta"
                                type="text"
                                defaultValue={proveedores.tipo_cuenta}
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>NUMERO DE CUENTA</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-check-2 mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                name="numero_cuenta"
                                defaultValue={proveedores.numero_cuenta}
                                type="text" 
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>TIPO DE PROVEEDOR</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-tag-content mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                id="razon"
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                    <FormGroup>
                            <label>CUENTA DEFAULT COMPRAS</label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-credit-card mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                            <Input
                                id="razon"
                                type="text"
                                className="p-2"
                                onChange={(e)=>handleNuevoProduct(e)}
                            />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Col className="d-flex justify-content-end">
                    <Button
                        className="btn-round group-control"
                        color="primary"
                        type="submit"
                        onClick={() =>ListaProveedores() }
                    >
                        Grabar Cambios
                    </Button>
                </Col>
            </Card>
        </div>
    );
}

export default withRouter(NuevoProveedor);