import React, { useState, useEffect } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { Card, Table, FormGroup, Input, CardFooter, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
    ObtenerProductosVenta, ObtenerUltimaOrden, AgregarProductoOrden,
    Reset, AgregarCliente,
} from '../redux/PuntoVenta'
import swal from 'sweetalert';
import axios from 'axios';


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
    const clienteStore = useSelector(store => store.venta.cliente)
    
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
            
        }
    }
    useEffect(()=>{
        Busqueda()
        setstatus(true)
    },[resultado])
    const handleVerPedido = () => {
        VerTienda()
        setstatus(true)
    }
    const [cliente, setcliente] = useState(false)
    const handleCliente=(e)=>{
        if(e.charCode === 13){
            if(e.target.value !== ''){
                let ruc = e.target.value
                let empresa =  localStorage.getItem('empresa:')
                dispatch(AgregarCliente(ruc, empresa))
                setcliente(true)
            }else{
                setcliente(false)
            }
            
        }
    }
    const [data, setdata] = useState({
        nombre:'',
        cedula:''
    })
    useEffect(()=>{
        ClienteHandle()
    },[clienteStore])
    const ClienteHandle=()=>{
        localStorage.setItem('Datos:',JSON.stringify(clienteStore))
        let data = JSON.parse(localStorage.getItem('Datos:'))
        setdata(data)
    }
    const hanbleGenerarPago=async()=>{
        let id_orden = document.getElementById('orden').value
        let datos = JSON.parse(localStorage.getItem('Datos:'))
        let iten = JSON.parse(localStorage.getItem('Orden_'+id_orden+':'))
        let documento = document.getElementById('documento').value
        let tipo_pago = document.getElementById('tipo_pago').value
        const rest = await axios.post("http://localhost:4000/pagos/factura",{datos, iten, documento, tipo_pago, Fecha_actual})
        if(rest.data === 'ok'){
            localStorage.removeItem('Orden_'+id_orden+':')
            localStorage.removeItem('Datos:')
            swal({
                text: "Listo Factura Generada",
                icon: "success",
                timer: 2000,           
            })
            setListarIten([])
        }
    
    }
    useEffect(() => {
        let empresa =  localStorage.getItem('empresa:')
        dispatch(ObtenerUltimaOrden(empresa))
    }, [])
    useEffect(() => {
        setOrdenV(orden)
    }, [orden])

    let rest = 0;
    let nombre = [];
    nombre =  VerOrden.map(iten => {
        return iten.cliente
    },0)

    const [ListarIten, setListarIten] = useState([])
    const VerPedido = () => {

        if(ListarIten){
            ListarPrecio(ListarIten)
            return (
                ListarIten.map((iten) => (
                    <>
                        <tr key={iten.id}>
                            <td style={{ width: "10px" }}><button className="btn btn-dark" onClick={() => EliminarDStora(iten.id)}>
                            <i className="nc-icon nc-simple-remove" /></button></td>
                            <td style={{ width: "100px" }}>
                            <Input className="form-control" type="text" defaultValue={iten.cantidad} onKeyPress={(e) => ActualizarCantidad1(e,iten.id,iten.precio_venta)} /></td>
                            <td>{iten.producto}</td>
                            <td>{iten.unidad}</td>
                            <td>{iten.precio_venta.toFixed(2)}</td>
                            <td>{(iten.precio_venta * iten.cantidad).toFixed(2)}</td>
                        </tr>
                    </>
                ))
            )
        }else{
            return null;
        }
    }
    const [Total, setTotal] = useState(0)
    const ListarPrecio=(ListarIten)=>{
        ListarIten.forEach (function(numero){
            rest += numero.precio_venta * numero.cantidad
        });
        setTotal(rest)
    }
    const [cantidad, setcantidad] = useState("1")
    const Busqueda = () => {
        if(resultado.length === 0){
            return null
        }else{
            TiendaIten(resultado)
        }
    }
    //momento
    let PViten = []
    function TiendaIten(resultado){
        VerTienda()

        const info = {
            codigo: resultado.codigo,
            cantidad:cantidad,
            empresa: resultado.empresa,
            id: resultado.id,
            iva_venta: resultado.iva_venta,
            precio_venta: resultado.precio_venta,
            producto: resultado.producto,
            unidad: resultado.unidad,
        }

        const existe = PViten.some(iten => iten.id === info.id)
        if(existe){
            //Actualizar Cantidad
            const Product = PViten.map(iten =>{
                if(iten.id === info.id){
                    iten.cantidad++;
                    return iten; // restorna la cantidad actualizada
                }else{
                    return iten; //retorna la objetos que no son actualizado
                }
            })
            let orden = document.getElementById('orden')
            PViten = [...Product];
            localStorage.setItem('Orden_'+orden.value+':',JSON.stringify(PViten))
            let array = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'))
            setListarIten(array)
        }else{
            //Agregamos a la tienda
            let orden = document.getElementById('orden')
            localStorage.setItem('Orden_'+orden.value+':',JSON.stringify([...PViten,info]))
            let array = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'))
            setListarIten(array)
        }
    }
    function VerTienda() {
        let orden = document.getElementById('orden')
        let iten = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'));
            if(iten !== null){
                PViten = iten;
                setListarIten(PViten)
            }
    }
    const EliminarDStora=(id)=>{
        let orden = document.getElementById('orden')
        let iten = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'));
        let Cost = []
        Cost = iten.filter(tienda=> tienda.id !== id)
        localStorage.setItem('Orden_'+orden.value+':',JSON.stringify(Cost));
        VerTienda()
    }
    const ActualizarCantidad1 = (e, id) => {
        if(e.charCode === 13){
            VerTienda()
            const existe = PViten.some(iten => iten.id === id)
            if(existe){
                const Actualizar = PViten.map(iten =>{
                    if(iten.id === id){
                        iten.cantidad = e.target.value;
                        return iten; // restorna la cantidad actualizada
                    }else{
                        return iten; //retorna la objetos que no son actualizado
                    }
                })
                let orden = document.getElementById('orden')
                PViten = [...Actualizar];
                localStorage.setItem('Orden_'+orden.value+':',JSON.stringify(PViten))
                let array = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'))
                setListarIten(array)
            }
        }
    }
    const OrdenDespacho=async()=>{
        let orden = document.getElementById('orden')
        let ordenn = orden.value;
        let iten = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'))
        const rest = await axios.post("http://localhost:4000/orden/despacho",{iten, ordenn})
        if(rest.data === 'ok'){
            swal({
                text: "Listo su orden esta siendo procesada",
                icon: "success",
                timer: 2000,           
            })
        }else{
            swal({
                text: "!Upss algo salio mal! ",
                icon: "warning",
                timer: 2000,           
            })

        }
    }

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
                                            <th>Eliminar</th>
                                            <th>Cant.</th>
                                            <th>Producto</th>
                                            <th>UND</th>
                                            <th>P.VENTA</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        status ? <VerPedido /> : ''
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
                                <Col md="4">
                                    <button className="form-control btn btn-info" onClick={()=>OrdenDespacho()}>Orden Despacho</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md="4">
                        <CardHeader className="bg-info text-center">
                            <CardTitle><h2>{Total === 0 ? "$0.0" : "$" + Total.toFixed(2)}</h2></CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label>DOCUMENTO</label>
                                        <select name="documento" id="documento" className="form-control">
                                            <option value="factura">FACTURA</option>
                                            <option value="ticket">TICKET</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>TIPO DE PAGO</label>
                                        <select name="tipo_pago" id="tipo_pago" className="form-control">
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
                                            defaultValue={data.nombre}
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
                                    <h6>{Total === 0 ? "$0.0" : "$" + (Total / 1.12).toFixed(2)}</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>IVA (12%)</h6>
                                    <h6>{Total === 0 ? "$0.0" : "$" + (Total - Total / 1.12).toFixed(2)}</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>TOTAL</h6>
                                    <h6>{Total === 0 ? "$0.0" : "$" + Total.toFixed(2)}</h6>
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