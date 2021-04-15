import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Button, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useDispatch,useSelector } from 'react-redux'
import {EditarCliente} from '../../redux/ModalCliente'


function ModalC(props) {
    const { Title, setOpenModal, OpenModal,ListaClientes} = props
    const dispatch = useDispatch()

    const [Cliente, setCliente] = useState({
        nombre:'',
        cedula:'',
        correo:'',
        contacto:'',
        direccion:''
    })
    const handleCliente=(e)=>{
        setCliente({
            ...Cliente,
            [e.target.name]:e.target.value,
        })
    }
    const [EditClient, setEditClient] = useState({
        id:'',
        empresa:'',
        nombre:'',
        cedula:'',
        email:'',
        telefono:'',
        direccion:'',
        estado:'',
    })
    const Edit = useSelector(store => store.cliente.array)
    useEffect(() => {
        setEditClient(Edit)
        console.log(Edit);
    }, [Edit])
    const onChangeEditar=(e)=>{
        setEditClient({
            ...EditClient,
            [e.target.name] :e.target.value
        })
    }
    const GrabarCliente=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://34.196.59.251:4000/clientes/GrabarCliente',{empresa, Cliente})
        if(rest.data === 'ok'){
            swal({
                text: 'Cliente registrado con Exito',
                icon: "success",
                timer: 2000,
            })
            setOpenModal(!OpenModal)
            setCliente({
                nombre:'',
                cedula:'',
                correo:'',
                contacto:'',
                direccion:''
            })
            setEditClient({
                id:'',
                empresa:'',
                nombre:'',
                cedula:'',
                email:'',
                telefono:'',
                direccion:'',
                estado:'',
            })
        }else{
            swal({
                text: rest.data,
                icon: "warning",
                timer: 2000,
            }) 
        }
    }
    const GrabarEdit=async()=>{
        const rest = await axios.put('http://34.196.59.251:4000/clientes/Editar',{EditClient})
        if(rest.data === 'ok'){
            ListaClientes()
            setOpenModal(!OpenModal)
            swal({
                text: 'Cliente registrado con Exito',
                icon: "success",
                timer: 2000,
            })
            setEditClient({
                id:'',
                empresa:'',
                nombre:'',
                cedula:'',
                email:'',
                telefono:'',
                direccion:'',
                estado:'',
            })
        }
    }
    if(Title === 'Editar'){
        return (
            <>
                <Modal isOpen={OpenModal}
                    size="lg"
                >
                    <ModalBody>
                        <div className="container">
                            <div className="content">
                                <Row>
                                    <Col md="12">
                                        <CardBody>
    
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>NOMBRE</label>
                                                        <Input
                                                            name="nombre"
                                                            type="text"
                                                            defaultValue={EditClient.nombre}
                                                            onChange={(e)=>onChangeEditar(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CEDULA/RUC</label>
                                                        <Input
                                                            name="cedula"
                                                            type="text"
                                                            defaultValue={EditClient.cedula}
                                                            onChange={(e)=>onChangeEditar(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CORREO</label>
                                                        <Input
                                                        name="correo"
                                                        type="email"
                                                        defaultValue={EditClient.email}
                                                        onChange={(e)=>onChangeEditar(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CONTACTO</label>
                                                        <Input
                                                            type="text"
                                                            name="telefono"
                                                            defaultValue={EditClient.telefono}
                                                            onChange={(e)=>onChangeEditar(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>DIRECCION</label>
                                                        <Input
                                                            type="text"
                                                            name="direccion"
                                                            defaultValue={EditClient.direccion}
                                                            onChange={(e)=>onChangeEditar(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12" className="d-flex justify-content-between">
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round group-control"
                                                            color="danger"
                                                            onClick={() => setOpenModal(!OpenModal)}
                                                        >
                                                            Cerrar Formulario
                                                                </Button>
                                                    </div>
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round group-control"
                                                            color="primary"
                                                            type="submit"
                                                            onClick={() =>GrabarEdit()}
                                                        >
                                                            Crear nuevo cliente
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }else{
        return (
            <>
    
                <Modal isOpen={OpenModal}
                    size="lg"
                >
                    <ModalBody>
                        <div className="container">
                            <div className="content">
                                <Row>
                                    <Col md="12">
                                        <CardBody>
    
                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>NOMBRE</label>
                                                        <Input
                                                            name="nombre"
                                                            type="text"
                                                            onChange={(e)=>handleCliente(e)}
    
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CEDULA/RUC</label>
                                                        <Input
                                                            name="cedula"
                                                            type="text"
                                                            onChange={(e)=>handleCliente(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CORREO</label>
                                                        <Input
                                                        name="correo"
                                                        type="email"
                                                        onChange={(e)=>handleCliente(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>CONTACTO</label>
                                                        <Input
                                                            type="text"
                                                            name="contacto"
                                                            onChange={(e)=>handleCliente(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>DIRECCION</label>
                                                        <Input
                                                            type="text"
                                                            name="direccion"
                                                            onChange={(e)=>handleCliente(e)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12" className="d-flex justify-content-between">
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round group-control"
                                                            color="danger"
                                                            onClick={() => setOpenModal(!OpenModal)}
                                                        >
                                                            Cerrar Formulario
                                                                </Button>
                                                    </div>
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round group-control"
                                                            color="primary"
                                                            type="submit"
                                                            onClick={() =>GrabarCliente()}
                                                        >
                                                            Crear nuevo cliente
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default ModalC;