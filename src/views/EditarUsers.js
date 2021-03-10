import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';
import { Card,  Button, InputGroupText, Row, Col, Input, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap'

function EditarUsers(props) {
    const { location, history } = props


    const [EditEmpleado, setEditEmpleado] = useState({
        id: '',
        empresa: '',
        cargo: '',
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        direccion: '',
        sueldo: '',
        tipo: '',
        tipo_cuenta: '',
        cuenta: '',
        estatus: '',
    })
    const EditarEmpleado = async () => {
        let path = location.pathname
        let id = path.split("/")
        let empresa = localStorage.getItem('empresa:')
        const res = await axios.get('http://localhost:4000/empleado/id/' + id[3] + '/' + empresa)
        if (res.data) {
            setEditEmpleado(res.data)
        }
    }
    useEffect(() => {
        EditarEmpleado()
    }, [])
    const handleEdit=(e)=>{
        setEditEmpleado({
            ...EditEmpleado,
            [e.target.name]:e.target.value
        })
    }
    const GrabarEmpleadoEdit=async()=>{
        const rest = await axios.post('http://localhost:4000/empleado/GrabarEmpleadoEdit',{EditEmpleado})
        if(rest.data === 'ok'){
            swal({
                text: 'Empleado Editado correctamente',
                icon: "success",
                timer: 2000,
            })
            EditarEmpleado()
            setEditEmpleado({
                id: '',
                empresa: '',
                cargo: '',
                nombre: '',
                apellido: '',
                cedula: '',
                telefono: '',
                direccion: '',
                sueldo: '',
                tipo: '',
                tipo_cuenta: '',
                cuenta: '',
                estatus: '',
            })
        }else{
            swal({
                text: rest.data,
                icon: "warning",
                timer: 2000,
            }) 
        }
    }

    return (
        <div className="content">
            <Card className="p-2">
                <Col className="justify-content-start">
                    <button className="btn btn-primary" onClick={() => history.push('/admin/lista_user')}>REGRESAR</button>
                </Col>
            </Card>
            <Card className="p-4">
                <Row>
                    <Col md="3">
                        <FormGroup>
                            <label>Nombre</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-badge mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="nombre"
                                    defaultValue={EditEmpleado.nombre}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Apellido</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-istanbul mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="apellido"
                                    defaultValue={EditEmpleado.apellido}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                /></InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Telefono</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-headphones mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="telefono"
                                    defaultValue={EditEmpleado.telefono}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
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
                                    defaultValue={EditEmpleado.direccion}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Sueldo</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="nc-icon nc-send mx-3"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="sueldo"
                                    defaultValue={EditEmpleado.sueldo}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Tipo de Trabajo</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-button-pause mx-3" ></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="tipo"
                                    defaultValue={EditEmpleado.tipo}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Tipo de Cuenta</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-globe mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="tipo_cuenta"
                                    defaultValue={EditEmpleado.tipo_cuenta}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Cuenta</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-mobile mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="cuenta"
                                    defaultValue={EditEmpleado.cuenta}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label>Estado</label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="nc-icon nc-circle-10 mx-3"></i>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="estatus"
                                    defaultValue={EditEmpleado.estatus}
                                    type="text"
                                    className="p-2"
                                    onChange={(e)=>handleEdit(e)}
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
                        onClick={() =>GrabarEmpleadoEdit() }
                    >
                        Grabar Cambios
                    </Button>
                </Col>
            </Card>
        </div>
    );
}

export default withRouter(EditarUsers);