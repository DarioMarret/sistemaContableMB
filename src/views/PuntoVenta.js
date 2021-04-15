import React, { useState, useEffect, useRef } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { Card, Table, FormGroup, Input, CardFooter, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
    ObtenerProductosVenta, ObtenerUltimaOrden, GenerarPdf,
    Reset, AgregarCliente,
} from '../redux/PuntoVenta'
import swal from 'sweetalert';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
const empty = require('is-empty');

function PuntoVenta(props) {
    const componentRef = useRef();

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
    const [producto, setproducto] = useState("")
    const dispatch = useDispatch()
    const handlebuscarProducto = (e) => {
        // if (e.charCode === 13){
        // }
        setproducto(e.target.value)
        let busqueda = e.target.value
        let empresa =  localStorage.getItem('empresa:')
        dispatch(ObtenerProductosVenta(busqueda,empresa))
        dispatch(Reset())  
       
    }
    useEffect(()=>{
        // Busqueda()
        // setstatus(true)
        console.log(resultado)
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

        if( !empty(iten) && !empty(datos)){
            const {data} = await axios.post("http://34.196.59.251:4000/pagos/factura",{datos, iten, documento, tipo_pago, Fecha_actual,id_orden,Total})
            if(data !== 'Error'){
                const {numero_factura,datos,iten} = data
                await axios.get('http://localhost/impresora/factura.php', {
                    params: {
                        'numero_factura': JSON.stringify(numero_factura),
                        'datos': JSON.stringify([datos]),
                        'iten': JSON.stringify(iten),
                    }
                })
                localStorage.removeItem('Orden_'+id_orden+':')
                localStorage.removeItem('Datos:')
                swal({
                    text: "Listo Factura Generada",
                    icon: "success",
                    timer: 2000,           
                })
                setListarIten([])
                setdata([])
                let empresa =  localStorage.getItem('empresa:')
                dispatch(ObtenerUltimaOrden(empresa))
            }else{
                swal({
                    text: "Faltan Valores Datos de clienente",
                    icon: "warning",
                    timer: 2000,           
                })    
            }
        }else{
            swal({
                text: "Faltan Valores Datos de clienente o producto",
                icon: "warning",
                timer: 2000,           
            }) 
        }
    
    }
    useEffect(() => {
        let empresa =  localStorage.getItem('empresa:')
        dispatch(ObtenerUltimaOrden(empresa))
    }, [])
    useEffect(() => {
        setOrdenV(orden)
        handleVerPedido()
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
    function TiendaIten(codigo,empresa,id,iva_venta,precio_venta,producto,unidad){
        let pro = document.getElementById('producto')
        pro.value = ""
        if(resultado ){
            VerTienda()
            const info = {
                codigo: codigo,
                cantidad:cantidad,
                empresa: empresa,
                id: id,
                iva_venta: iva_venta,
                precio_venta: precio_venta,
                producto: producto,
                unidad: unidad,
                emision: pemision.establecimiento_de +"-"+ pemision.punto_emision_de
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
                if(!empty(orden.value)){
                    PViten = [...Product];
                    localStorage.setItem('Orden_'+orden.value+':',JSON.stringify(PViten))
                    let array = JSON.parse(localStorage.getItem('Orden_'+orden+':'))
                    setListarIten(array)
                }
            }else{
                //Agregamos a la tienda
                let orden = document.getElementById('orden')
                if(!empty(orden.value)){
                    localStorage.setItem('Orden_'+orden.value+':',JSON.stringify([...PViten,info]))
                    let array = JSON.parse(localStorage.getItem('Orden_'+orden.value+':'))
                    setListarIten(array)
                }
            }
            setproducto("")
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
        const rest = await axios.post("http://34.196.59.251:4000/orden/despacho",{iten, ordenn})
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
    const [pemision, setpemision] = useState([])
    const PuntoEmision=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const {data} = await axios.get("http://34.196.59.251:4000/ventaWeb/datosempresa/"+empresa)
        if(data){
            setpemision(data)
        }
    }
    useEffect(()=>{
        PuntoEmision()
    },[])

    return (
        <div className="content">
            <Card>
                <Row>
                    <Col md="8">
                        <Row >
                            <Col md="5" className="" >
                                <FormGroup >
                                    <label>BUSQUEDA DE PRODUCTO</label>
                                    <Input
                                        placeholder="Busca por Codigo o nombre de Producto"
                                        name="producto"
                                        id="producto"
                                        type="text"
                                        autocomplete="off"
                                        onChange={(e) => handlebuscarProducto(e)}
                                    />
                                    {
                                         
                                        
                                        producto ?<Table className="" style={{position:"absolute", zIndex:2, listStyle:"none", cursor:"pointer"}} hover responsive>
                                           <tbody className="form-control" style={{maxHeight:"300px", overflowY:"auto"}}>
                                            {
                                                resultado.map((iten)=>(
                                                    <tr key={iten.id}>
                                                    <td onClick={()=>TiendaIten(iten.codigo,iten.empresa,iten.id,iten.iva_venta,iten.precio_venta,iten.producto,iten.unidad)}
                                                    className="py-2"
                                                    >{iten.producto}</td>
                                                    </tr>                                                  
                                                ))
                                            }
                                           </tbody>
                                        </Table>
                                        : null
                                    }
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <input type="button" value="Ver Pedido" className="btn btn-info mt-4" onClick={() => handleVerPedido()} />
                            </Col>
                            <Col md="1">
                                <label>ORDEN</label>
                                <select id="orden" className="form-control text-center mt-0" onChange={()=>handleVerPedido()}>
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
                        <div className="orden-web" style={{zIndex:1,position:"static"}}>
                            <div className="orden-producto" >
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
                                        <label>LOCAL</label>
                                        <Input
                                            defaultValue={pemision.establecimiento_de}
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
                                            defaultValue={pemision.punto_emision_de}
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