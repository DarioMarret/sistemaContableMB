import React, {useState, useEffect} from 'react';
import { Modal, ModalBody, Row, Col, Card, CardBody, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios'

function ModalCompraMP(props) {

    const { OpenModalCompraMP, setOpenModalCompraMP} = props
    const [codigoP, setcodigoP] = useState("")
    const [medida, setmedida] = useState("")
    const [productos, setproductos] = useState([])
    const [cantidad, setcantidad] = useState("")
    const [precio, setprecio] = useState("")
    const [nombreP, setnombreP] = useState("")
    const [id, setid] = useState("")

    const ListaProductos = async () => {
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.get('http://localhost:4000/inventario/materia_prima/'+empresa)
        setproductos(rest.data)
    }
    const SeleccionMP = async (e) => {
        let medida = e.target.value.split(",")
        setid(medida[3])
        setnombreP(medida[2])
        setmedida(medida[1]);
        setcodigoP(medida[0])
    }
    let Local = []
    function GuardarLocal(){
        VerLocal()
        const info = {
        id:id,
        medida:medida,
        nombre_producto:nombreP,
        codigo_producto_kx:codigoP,
        movimiento_kx:'Compra',
        cantidad_kx:cantidad,
        precio_kx:precio,
        empresa:localStorage.getItem('empresa:'),
        responsable:localStorage.getItem('usuario:')
        }
        Local =[...Local,info];
        localStorage.setItem('Local:',JSON.stringify(Local));
        setOpenModalCompraMP(false)
    }
    function VerLocal() {
        let iten = JSON.parse(localStorage.getItem('Local:'));
            if(iten !== null){
              Local = iten;
            }
      }
    useEffect(()=>{
        ListaProductos()
    },[])
    return (
        <Modal isOpen={OpenModalCompraMP}
            size="lg"
        >
            <ModalBody>
                <div className="container">
                    <div className="content">
                        <Row>
                            <Col md="12">
                                <Card className="card">
                                    <CardBody>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>PRODUCTO MATERIA PRIMA</label>
                                                    <select name="producto" id="producto" className="form-control" onChange={(e)=>SeleccionMP(e)}>
                                                        <option value="">Seleccione un Producto</option>
                                                        {
                                                            productos.map((iten)=>(
                                                                <option value={iten.codigo_mp+","+iten.medida+","+iten.producto_mp+","+iten.id}> {iten.producto_mp} </option>
                                                            ))
                                                        }
                                                    </select>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="3">
                                                <FormGroup>
                                                    <label>CANTIDAD</label>
                                                    <Input
                                                    name="cantidad"
                                                    onChange={(e)=>setcantidad(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="3">
                                                <FormGroup>
                                                    <label>SALDO</label>
                                                    <Input
                                                    name="saldo"
                                                    disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="3">
                                                <FormGroup>
                                                    <label>PRECIO</label>
                                                    <Input
                                                    name="saldo"
                                                    onChange={(e)=>setprecio(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="3">
                                                <FormGroup>
                                                    <label>MEDIDA</label>
                                                    <Input
                                                    disabled
                                                    defaultValue={medida}  
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
                                                        onClick={()=>setOpenModalCompraMP(!OpenModalCompraMP)}
                                                    >
                                                        Cerrar
                                                    </Button>
                                                </div>
                                                <div className="update ml-auto mr-auto">
                                                    <Button
                                                        className="btn-round group-control"
                                                        color="primary"
                                                        type="submit"
                                                        onClick={()=>GuardarLocal()}
                                                    >
                                                        Ingresar Producto
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
    );
}

export default ModalCompraMP;