import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, Button, Card, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useSelector } from 'react-redux'


const ModalMP = (props) => {
    const { Title, setTitle, setOpenModal, OpenModal, ListaProductos } = props

    const [categoria, setcategoria] = useState([])
    const [selectCategoria, setselectCategoria] = useState("")
    const [codigo, setcodigo] = useState("")
    const [producto, setproducto] = useState("")
    const [medid, setmedid] = useState([])
    const [unidad, setunidad] = useState("")
    const [codigoBarra, setcodigoBarra] = useState("")


    function numeroAleatorioDecimales(max) {
        var num = Math.random()*max;
        setcodigoBarra(parseInt(num))
        return num;
    }

    const GrabarProducto = async (e) => {
        e.preventDefault()
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://localhost:4000/inventario/producto_materia_prima', { selectCategoria, producto, codigo, unidad, codigoBarra, empresa })
        if (rest.data !== "Algo Salio Mal Vuelve a intentar") {
            setOpenModal(!OpenModal)
            ListaProductos()
            numeroAleatorioDecimales(999999999)
            Handle()
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
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.get('http://localhost:4000/inventario/categoria_materia_prima/' + empresa)
        setcategoria(rest.data)
    }
    const UltimoCodigo = async (e) => {
        var id = e.target.value
        setselectCategoria(id);
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://localhost:4000/inventario/codigo_categoria_materia_prima', { id, empresa })
        if (rest.data[0].codigo !== null) {
            setcodigo(parseInt(rest.data[0].codigo) + 1);
        } else {
            setcodigo(id+"01")
        }
    }
    const UnidadMedida = async () => {
        const rest = await axios.get('http://localhost:4000/inventario/unidad')
        setmedid(rest.data)
    }

    const Handle = () => {
        setcodigo("")
        setproducto("")
        setunidad("")
        setTitle("")
        setcodigo("")
        setOpenModal(!OpenModal)
    }

    const [productoE, setproductoE] = useState({
        id:'',
        categoria_cmp:'',
        codigo_barra_mp:'',
        codigo_mp:'',
        producto_mp:'',
        id_medida_mp:'',
        estado_mp:'',
        medida:'',
    })
    const editar_MP = useSelector(store => store.editMP.editarM_P)
    useEffect(() => {
        setproductoE(editar_MP)
    }, [editar_MP])
    
    const GrabarEdiMP =async(e)=>{
        e.preventDefault();
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.put('http://localhost:4000/inventario/ObtenerMPrima_IdEdit',{productoE, empresa})
        if (rest.data === "Producto Actualizado") {
            setOpenModal(!OpenModal)
            ListaProductos()
            Handle()
            swal({
                text: 'Se Ingreso el Producto Con exito',
                icon: "success",
                timer: 3000,
            })
        }
    }
    const onChangeEditar = (e) => {
        setproductoE({
            ...productoE,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        Categoria()
        numeroAleatorioDecimales(999999999)
        UnidadMedida()
    }, [])


    if(Title === 'NuevoProducto'){
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
                                                                <option value="NaN">Seleccione una Opcion</option>
                                                                {
                                                                    categoria.map((iten) => (
                                                                        <>
                                                                            <option value={iten.id}>{iten.categoria_cmp}</option>
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
                                                    <Col className="pr-1" md="4">
                                                        <FormGroup>
                                                            <label htmlFor="exampleInputEmail1">
                                                                CODIGO
                                                                    </label>
                                                            <Input disabled type="text"
                                                                defaultValue={codigo}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="4">
                                                        <FormGroup>
                                                            <label>UNIDAD</label>
                                                            <select className="form-control" onChange={(e) => setunidad(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {
                                                                    medid.map((iten) => (
                                                                        <option value={iten.id}>{iten.medida}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <FormGroup>
                                                            <label>CODIGO DE BARRA</label>
                                                            <Input
                                                                disabled
                                                                type="text"
                                                                defaultValue={codigoBarra}
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
    if(editar_MP){
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
                                                            <label>CATEGORIA EDITAR</label>
                                                            <select id="rubro" disabled className="form-control" onChange={(e) => UltimoCodigo(e)}>
                                                                <option value="NaN">{editar_MP.categoria_cmp}</option>
                                                                {/* {
                                                                    categoria.map((iten) => (
                                                                        <>
                                                                            <option value={iten.id}>{iten.categoria_cmp}</option>
                                                                        </>
                                                                    ))
                                                                } */}
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="12">
                                                        <FormGroup>
                                                            <label>PRODUCTO</label>
                                                            <Input
                                                                type="text"
                                                                name="producto_mp"
                                                                defaultValue={productoE.producto_mp}
                                                                onChange={(e) => onChangeEditar(e)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="4">
                                                        <FormGroup>
                                                            <label htmlFor="exampleInputEmail1">
                                                                CODIGO
                                                                    </label>
                                                            <Input 
                                                                disabled 
                                                                type="text"
                                                                defaultValue={productoE.codigo_mp}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pr-1" md="4">
                                                        <FormGroup>
                                                            <label>UNIDAD</label>
                                                            <select className="form-control" name="id_medida_mp" onChange={(e) => onChangeEditar(e)}>
                                                                <option value="">{editar_MP.medida}</option>
                                                                {
                                                                    medid.map((iten) => (
                                                                        <option value={iten.id}>{iten.medida}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <FormGroup>
                                                            <label>CODIGO DE BARRA</label>
                                                            <Input
                                                                disabled
                                                                type="text"
                                                                name="codigo_barra_mp"
                                                                defaultValue={productoE.codigo_barra_mp}
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
                                                                onClick={(e) => GrabarEdiMP(e)}
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
export default ModalMP;