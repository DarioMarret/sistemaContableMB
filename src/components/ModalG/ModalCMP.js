import React, {useState} from 'react';
import axios from 'axios'
import { ModalBody, Modal, Row, Col, Card, CardBody, Input, FormGroup, Button } from 'reactstrap'

function ModalCMP(props) {
    const { OpenModalCMP, setOpenModalCMP } = props
    const [categoria, setcategoria] = useState("")
    const hanbleCategoria=(e)=>{
        let Categoria = e.target.value
        setcategoria(Categoria)
    }
    const GrabarCategoriaMP=async(e)=>{
        e.preventDefault();
        let empresa = localStorage.getItem('empresa:')
        const resp = await axios.post('http://localhost:4000/inventario/categoriaMP',{empresa, categoria})
        if (resp){
            setOpenModalCMP(false)
        }
    }

    return (
        <>
            <Modal isOpen={OpenModalCMP}
                size="md"
            >
                <ModalBody>
                    <div className="container">
                        <div className="content">
                            <Row>
                                <Col md="12">
                                    <Card className="card">
                                        <CardBody>
                                            <Row>
                                                <Col className="pr-1" md="12">
                                                    <FormGroup>
                                                        <label>CATEGORIA PRODUCTO MATERIA PRIMA</label>
                                                        <Input
                                                            type="text"
                                                            name="nombre_categoria"
                                                            onChange={(e)=>hanbleCategoria(e)}
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
                                                            type="submit"
                                                            onClick={()=>setOpenModalCMP(false)}
                                                        >
                                                            Cerrar 
                                                            </Button>
                                                    </div>
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round group-control"
                                                            color="primary"
                                                            type="submit"
                                                            onClick={(e)=>GrabarCategoriaMP(e)}
                                                        >
                                                            Ingresar Categoria
                                                            </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalCMP;