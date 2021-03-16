import React, { useState, useEffect } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { Card, Table, FormGroup, Input, CardFooter, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
    ObtenerProductosVenta, ObtenerUltimaOrden, AgregarProductoOrden,
    VerProductoOrden, Reset, EliminarPedidoOrden, Echo, AgregarCliente,ActualizarCantidad
} from '../redux/PuntoVenta'
import swal from 'sweetalert';


function PuntoVenta(props) {
    //fecha actual
    var fecha = new Date()
    let mes = fecha.getMonth()+1
    let mess = mes.length > 1 ? mes : "0"+mes
    let Fecha_actual = fecha.getFullYear()+"-"+mess+"-"+fecha.getDate();
    //stado tabla
    const [status, setstatus] = useState(false)

    //obtener state
    const [OrdenV, setOrdenV] = useState([])
    const resultado = useSelector(store => store.venta.array)
    const orden = useSelector(store => store.venta.ultimaorden)
    const VerOrden = useSelector(store => store.venta.verPedido)
    const estado = useSelector(store => store.venta.echo)
    const [echo, setecho] = useState(false)
    useEffect(() => {
        setecho(!echo)
    }, [estado])
    //dispatch
    const dispatch = useDispatch()
    const handlebuscarProducto = (e) => {
        if (e.charCode === 13){
            let busqueda = e.target.value
            let empresa =  localStorage.getItem('empresa:')
            dispatch(ObtenerProductosVenta(busqueda,empresa))
            dispatch(Reset())
            setstatus(false)
        }
    }
    const handleVerPedido = () => {
        let id_orden = document.getElementById('orden')
        let empresa =  localStorage.getItem('empresa:')
        dispatch(VerProductoOrden(id_orden.value, empresa))
        setstatus(true)
    }
    const [cantidad, setcantidad] = useState("1")
    const AgregarOrden = (producto, precio_venta) => {
        let id_orden = document.getElementById('orden')
        let empleado = sessionStorage.getItem('usuario:');
        let estado_orden = "pendiente"
        let empresa =  localStorage.getItem('empresa:')
        const Orden = [id_orden.value, cantidad, producto, precio_venta, empleado, estado_orden, empresa];
        dispatch(AgregarProductoOrden(Orden))
        console.log(Orden);
    }
    const EliminarOrden = (id) => {
        let id_orden = document.getElementById('orden')
        dispatch(EliminarPedidoOrden(id))
        if (echo) {
            swal({
                text: "Producto Eliminado",
                icon: "success",
            }).then((response) => {
                if (response) {
                    dispatch(Echo())
                    let empresa =  localStorage.getItem('empresa:')
                    dispatch(VerProductoOrden(id_orden.value, empresa))
                }
            })
        }
    }
    const ActualizarCantidad1 = (e, id, precioV) => {
        if(e.charCode === 13){
            let cantidad = e.target.value
            console.log(id, cantidad, precioV);
            let empresa =  localStorage.getItem('empresa:')
            dispatch(ActualizarCantidad(id, cantidad, precioV,empresa))
            if(echo){
                let id_orden = document.getElementById('orden')
                let empresa =  localStorage.getItem('empresa:')
                dispatch(VerProductoOrden(id_orden.value,empresa))
                dispatch(Echo())
            }
        }
    }
    const [cliente, setcliente] = useState(false)
    const handleCliente=(e)=>{
        if(e.charCode === 13){
            if(e.target.value !== ''){
                let ruc = e.target.value
                let id_orden = document.getElementById('orden')
                let empresa =  localStorage.getItem('empresa:')
                dispatch(AgregarCliente(ruc,id_orden.value, empresa))
                dispatch(VerProductoOrden(id_orden.value,empresa))
                if(echo){
                    setcliente(true)
                    dispatch(Echo())
                }
            }else{
                setcliente(false)
            }
            
        }
    }
    const hanbleGenerarPago=()=>{
        let id_orden = document.getElementById('orden')
        let empresa =  localStorage.getItem('empresa:')
    }
    useEffect(() => {
        let empresa =  localStorage.getItem('empresa:')
        dispatch(ObtenerUltimaOrden(empresa))
    }, [])
    useEffect(() => {
        setOrdenV(orden)
    }, [orden])

    var rest = 0.0;
    let nombre = [];
    nombre =  VerOrden.map(iten => {
        return iten.cliente
    },0)
    

    VerOrden.map(iten => rest += iten.total)

    const VerPedido = () => {
        return (
            VerOrden.map((iten) => (
                <>
                    <tr key={iten.id}>
                        <td style={{ width: "15px" }}><button className="btn btn-dark" onClick={() => EliminarOrden(iten.id)}><i className="nc-icon nc-simple-remove" /></button></td>
                        <td style={{ width: "100px" }}><Input className="form-control" type="text" defaultValue={iten.cantidad} onKeyPress={(e) => ActualizarCantidad1(e,iten.id,iten.precio_venta)} /></td>
                        <td>{iten.producto}</td>
                        <td>{iten.unidad}</td>
                        <td>{iten.precio_venta.toFixed(2)}</td>
                        <td>{iten.total.toFixed(2)}</td>
                    </tr>
                </>
            ))
        )
    }
    const Busqueda = () => {
        if(resultado !== 'Producto no Existe'){
            return (
                <>
                    <tr key={resultado.id}>
                        <td><button className="btn btn-info" onClick={() => AgregarOrden(resultado.producto, resultado.precio_venta)}>Agregar</button></td>
                        <td style={{ width: "15px" }}><Input className="form-control" type="text" placeholder="1" onChange={(e) => setcantidad(e.target.value)} /></td>
                        <td>{resultado.producto}</td>
                        <td>{resultado.unidad}</td>
                        <td>{resultado.precio_venta}</td>
                    </tr>
                </>
            )
        }else{
            return null;
        }
    }
    //momento

    return (
        <div className="content">
            <Card>
                <Row>
                    <Col md="8">
                        <Row>
                            <Col md="5" className="">
                                <FormGroup>
                                    <label>BUSQUEDA DE PRODUCTO</label>
                                    <Input
                                        placeholder="Busca por Codigo o nombre de Producto"
                                        name="producto"
                                        type="text"
                                        onKeyPress={(e) => handlebuscarProducto(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <input type="button" value="Ver Pedido" className="btn btn-info mt-4" onClick={() => handleVerPedido()} />
                            </Col>
                            <Col md="1">
                                <label>ORDEN</label>
                                <select id="orden" className="form-control text-center mt-0">
                                    {
                                        OrdenV.map((iten) => (
                                            <option value={iten.orden}>{iten.orden}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col md="1">
                                <button className="btn btn-info mt-4"><i className="nc-icon nc-minimal-right" /></button>
                            </Col>
                        </Row>
                        <div className="orden-web">
                            <div className="orden-producto">
                                <Table hover responsive>
                                    <thead className="bg-info p-2" style={{ fontWeight: 'bold' }}>
                                        <tr>
                                            <th>Accion</th>
                                            <th>Cant.</th>
                                            <th>Producto</th>
                                            <th>UND</th>
                                            <th>P.VENTA</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            status
                                                ? <VerPedido />
                                                : <Busqueda />
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <Row className="d-flex justify-content-center"> 
                                <Col md="4">
                                    <button className="form-control btn btn-info">Pago por link</button>
                                </Col>
                                <Col md="4">
                                    <button className="form-control btn btn-info" onClick={()=>hanbleGenerarPago()}>Generar Factura</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md="4">
                        <CardHeader className="bg-info text-center">
                            <CardTitle><h2>{rest === 0 ? "$0.0" : "$" + rest.toFixed(2)}</h2></CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label>DOCUMENTO</label>
                                        <select name="documento" className="form-control">
                                            <option value="factura">FACTURA</option>
                                            <option value="ticket">TICKET</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>TIPO DE PAGO</label>
                                        <select name="tipo_pago" className="form-control">
                                            <option value="efectivo">EFECTIVO</option>
                                            <option value="tarjeta">TARJETA</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <label>SERIE</label>
                                        <Input
                                            placeholder="001"
                                            name="serie"
                                            disabled
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <label>P. EMISION</label>
                                        <Input
                                            placeholder="001"
                                            name="local"
                                            disabled
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>FECHA DE COMPRA</label>
                                        <Input
                                            defaultValue={Fecha_actual}
                                            name="fecha"
                                            type="text"
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="12">
                                    <FormGroup>
                                        <label>NOMBRE CLIENTE</label>
                                        <Input
                                        defaultValue={nombre[0] === '' ? '' : nombre[0] }
                                            name="fecha"
                                            type="text"
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="9">
                                    <FormGroup>
                                        <label>RUC/CI.</label>
                                        <Input
                                            placeholder="Ingresar RUC/CI."
                                            name="ruc"
                                            type="text"
                                            onKeyPress={(e)=>handleCliente(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                {
                                    !cliente ? <Col md="1" className="d-flex align-items-center mt-1 px-0">
                                        <i className="nc-icon nc-simple-remove" style={{ fontSize: '20px', color: '#C70039', fontWeight: 'bold' }}></i>
                                    </Col>
                                        : <Col md="1" className="d-flex align-items-center mt-1 px-0">
                                            <i className="nc-icon nc-check-2" style={{ fontSize: '20px', color: '#51cbce', fontWeight: 'bold' }}></i>
                                        </Col>
                                }
                                <Col md="1" className="d-flex align-items-center mt-1">
                                    <i className="nc-icon nc-simple-add" role="button" style={{ fontSize: '20px', color: '#51cbce', fontWeight: 'bold' }}></i>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>SUB-TOTAL</h6>
                                    <h6>$31.30</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>IVA (12%)</h6>
                                    <h6>$4.26</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>TOTAL</h6>
                                    <h6>$35.53</h6>
                                </div>
                            </Col>
                        </CardFooter>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default withRouter(PuntoVenta);