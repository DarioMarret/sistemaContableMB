import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, InputGroup, InputGroupAddon, Button, Card, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux'
import { ActualizarProducto, DesactivarOk } from '../../redux/ModalP'


const ModalP = (props) => {
    const { Title, setTitle, setOpenModal, OpenModal, ListaProductos } = props

    const [categoria, setcategoria] = useState([])
    const [selectCategoria, setselectCategoria] = useState("")
    const [codigo, setcodigo] = useState("")
    const [producto, setproducto] = useState("")
    const [medida, setmedida] = useState("")
    const [sinIva, setsinIva] = useState("")
    const [pciva, setpciva] = useState("")
    const [iventa, setiventa] = useState("")
    const [sventa, setsventa] = useState("")
    const [unidad, setunidad] = useState("")


    const GrabarProducto = async (e) => {
        e.preventDefault()
        const rest = await axios.post('http://34.196.59.251:4000/inventario/nuevo', { selectCategoria, producto, codigo, medida, unidad, sinIva, sventa, iventa, pciva })
        if (rest.data !== "Algo Salio Mal Vuelve a intentar" || rest.data !== "Algo Salio Mal Vuelve a intentar") {
            setOpenModal(!OpenModal)
            ListaProductos()
            swal({
                text: 'Se Ingreso el Producto Con exito',
                icon: "success",
                timer: 3000,
            })
        } else {
            swal({
                text: rest.data,
                icon: "error",
                timer: 3000,
            })
        }
    }

    const Categoria = async (data) => {
        const rest = await axios.get('http://34.196.59.251:4000/inventario/categoria')
        setcategoria(rest.data)
    }
    const UltimoCodigo = async (e) => {
        var id = e.target.value
        setselectCategoria(id);
        const rest = await axios.post('http://34.196.59.251:4000/inventario/codigo', { id })
        setcodigo(parseInt(rest.data[0].codigo) + 1);
    }
    const [medid, setmedid] = useState([])
    const UnidadMedida = async () => {
        const rest = await axios.get('http://34.196.59.251:4000/inventario/unidad')
        setmedid(rest.data)
    }
    const [calcular, setcalcular] = useState(false)
    const Status = () => {
        setcalcular(!calcular)
        if (calcular) {
            let precioConIva = document.getElementById('precio')
            let precioIva = document.getElementById('precioIva')
            // let servicio = document.getElementById('servicio')

            precioConIva.removeAttribute("disabled", "")
            precioIva.removeAttribute("disabled", "")
            // servicio.removeAttribute("disabled", "")

        } else {
            let precioConIva = document.getElementById('precio')
            let precioIva = document.getElementById('precioIva')
            // let servicio = document.getElementById('servicio')

            precioConIva.setAttribute("disabled", "")
            precioIva.setAttribute("disabled", "")

        }
    }
    const handleP = (e) => {
        if (e.target.value) {
            setsinIva(e.target.value)
            let conIva = parseFloat(e.target.value) * 0.12
            let pciva = parseFloat(e.target.value) + conIva
            setpciva(pciva.toFixed(2))
            setiventa(conIva.toFixed(2))
        } else {
            if (e.target.value.length < 1) {
                setpciva("")
                setiventa("")
                setsinIva("")

            }
        }
    }
    const Handle = () => {
        setcodigo("")
        setpciva("")
        setiventa("")
        setproducto("")
        setmedida("")
        setsventa("")
        setsinIva("")
        setunidad("")
        setcalcular(false)
        setTitle("")
        setOpenModal(!OpenModal)
    }

    const [productoE, setproductoE] = useState({
        codigo:'',
        codigo_barra:'',
        iva_venta:'',
        medida:'',
        precio_compra:'',
        precio_venta:'',
        producto:'',
        s_venta:'',
        unidad:'',
    })
    const restRedux = useSelector(store => store.productoE.array)
    useEffect(() => {
        setproductoE(restRedux)
    }, [restRedux])

    const onChangeEditar=(e)=>{
        setproductoE({
            ...productoE,
            [e.target.name] :e.target.value
        })
    }
    const dispatch = useDispatch();
    const ok = useSelector(store => store.productoE.ok)
    const Desactivar =()=>{
       if(ok !== ''){
        ListaProductos()
        setOpenModal(!OpenModal)
        swal({
            text: ok,
            icon: "success",
        }).then((response)=>{
            if(response){
                dispatch(DesactivarOk())
            }
        })  
    } 
    }
    useEffect(()=>{
        Desactivar()
    },[ok])
    
    useEffect(() => {
        Categoria()
        UnidadMedida()
    }, [])

    if (Title === "NuevoProducto") {
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
                                        <Card className="card">
                                            <CardBody>

                                                <Row>
                                                    <Col className="pr-1" md="12">
                                                        <FormGroup>
                                                            <label>CATEGORIA</label>
                                                            <select id="rubro" className="form-control" onChange={(e) => UltimoCodigo(e)}>
                                                                <option value="">Seleccione una Opcion</option>
                                                                {
                                                                    categoria.map((iten) => (
                                                                        <>
                                                                            <option value={iten.id}>{iten.categoria}</option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="12">
                                                        <FormGroup>
                                                            <label>PRODUCTO</label>
                                                            <Input
                                                                type="text"
                                                                onChange={(e) => setproducto(e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="6">
                                                        <FormGroup>
                                                            <label htmlFor="exampleInputEmail1">
                                                                CODIGO
                                                                </label>
                                                            <Input disabled type="text"
                                                                defaultValue={codigo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>UNIDAD</label>
                                                            <select className="form-control" onChange={(e) => setunidad(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {
                                                                    medid.map((iten) => (
                                                                        <option value={iten.medida}>{iten.medida}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>MEDIDA</label>
                                                            <Input
                                                                onChange={(e) => setmedida(e.target.value)}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Col>
                                                    <label >Calcular Iva</label>
                                                    <input className="form-check-input mx-2" type="radio" checked={calcular} value="Gastos Personales" id="flexCheckDefault" onClick={Status} />
                                                </Col>
                                                <Row>
                                                    <Col className="pl-1" md="3">
                                                        <FormGroup>
                                                            <label>PRECIO SIN IVA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    onChange={(e) => handleP(e)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <label>PRECIO CON IVA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    id="precio"
                                                                    defaultValue={pciva}
                                                                    onChange={(e) => setpciva(e.target.value)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>IVA EN VENTA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    id="precioIva"
                                                                    defaultValue={iventa}
                                                                    onChange={(e) => setiventa(e.target.value)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>SERVICIO EN VENTA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    id="servicio"
                                                                    defaultValue={sventa}
                                                                    type="text"
                                                                    onChange={(e) => setsventa(e.target.value)}
                                                                />
                                                            </InputGroup>
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
                                                                onClick={() => Handle()}
                                                            >
                                                                Cerrar Formulario
                                                            </Button>
                                                        </div>
                                                        <div className="update ml-auto mr-auto">
                                                            <Button
                                                                className="btn-round group-control"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={(e) => GrabarProducto(e)}
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
            </>
        )
    }
    if (restRedux) {
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
                                        <Card className="card">
                                            <CardBody>
                                                <Row>
                                                    <Col className="pr-1" md="12">
                                                        <FormGroup>
                                                            <label>PRODUCTO2</label>
                                                            <Input
                                                                type="text"
                                                                name="producto"
                                                                defaultValue={productoE.producto}
                                                                onChange={(e) => onChangeEditar(e)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="6">
                                                        <FormGroup>
                                                            <label htmlFor="exampleInputEmail1">
                                                                CODIGO
                                                                </label>
                                                            <Input disabled type="text" name="codigo"
                                                                defaultValue={productoE.codigo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>UNIDAD</label>
                                                            <select className="form-control" name="unidad" onChange={(e) => onChangeEditar(e)}>
                                                                <option >{productoE.unidad}</option>
                                                                {
                                                                    medid.map((iten) => (
                                                                        <option value={iten.medida}>{iten.medida}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>MEDIDA</label>
                                                            <Input
                                                                name="medida"
                                                                defaultValue={productoE.medida}
                                                                onChange={(e) => onChangeEditar(e)}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                {/* <Col>
                                                    <label >Calcular Iva</label>
                                                    <input className="form-check-input mx-2" type="radio" checked={calcular} value="Gastos Personales" id="flexCheckDefault" onClick={Status} />
                                                </Col> */}
                                                <Row>
                                                    <Col className="pl-1" md="3">
                                                        <FormGroup>
                                                            <label>PRECIO SIN IVA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    name="precio_compra"
                                                                    defaultValue={productoE.precio_compra}
                                                                    onChange={(e) => onChangeEditar(e)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <label>PRECIO CON IVA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    name="precio_venta"
                                                                    defaultValue={productoE.precio_venta}
                                                                    onChange={(e) => onChangeEditar(e)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>IVA EN VENTA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    name="iva_venta"
                                                                    defaultValue={productoE.iva_venta}
                                                                    onChange={(e) => onChangeEditar(e)}
                                                                    type="text"
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="3">
                                                        <FormGroup>
                                                            <label>SERVICIO EN VENTA</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input
                                                                    name="s_venta"
                                                                    defaultValue={productoE.s_venta}
                                                                    type="text"
                                                                    onChange={(e) => onChangeEditar(e)}
                                                                />
                                                            </InputGroup>
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
                                                                onClick={() => Handle()}
                                                            >
                                                                Cerrar Formulario
                                                            </Button>
                                                        </div>
                                                        <div className="update ml-auto mr-auto">
                                                            <Button
                                                                className="btn-round group-control"
                                                                color="primary"
                                                                type="submit"
                                                                onClick={() => dispatch(ActualizarProducto(productoE))}
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
            </>
        )
    }

}
export default ModalP;