import React, { useState, useEffect } from 'react';
import { withRouter} from "react-router-dom";
import { Card, Table, FormGroup, Input, CardFooter, 
    CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";
import ModalCompraMP from '../components/ModalG/ModalCompraMP'
import swal from 'sweetalert';
import ModalMP from '../components/ModalG/ModalMP';
import axios from 'axios'

function CompraMateria(props) {
    const {ListaProductos} = props
    //fecha actual
    var fecha = new Date()
    let mes = fecha.getMonth()+1
    let mess = mes.length > 1 ? mes : "0"+mes
    const Fecha_actual = fecha.getFullYear()+"-"+mess+"-"+fecha.getDate();
    //stado tabla
    const [OpenModalCompraMP, setOpenModalCompraMP] = useState(false)
    //obtener state
    const EliminarIdStoragen=(id)=>{
        let array = localStorage.getItem('Local:');
        let CarritoProducto = []
        CarritoProducto = JSON.parse(array).filter(carrito=> carrito.id !== id)
        localStorage.setItem('Local:',JSON.stringify(CarritoProducto));  
        VerPedido()  
    }

    const hanbleGenerarPago=async()=>{
        if(n_factura_kx !== "" && codigo_proveedor_kx !== ""){
            alert('hola')
            let iten = JSON.parse(localStorage.getItem('Local:'))
            const rest = await axios.post('http://localhost:4000/kardex/iten',{iten, n_factura_kx, codigo_proveedor_kx, Fecha_actual})
            if(rest.data === 'ok'){
                swal({
                    text: 'Insumo Con exito',
                    icon: "success",
                    timer: 1000,
                })
                localStorage.removeItem('Local:')
                VerPedido()
            }
        }else{
            swal({
                text: 'Faltan Valores',
                icon: "error",
                timer: 1000,
            })
        }
    }

    var rest = 0.0;   
    const [Total, setTotal] = useState("")   
    const VerPedido = () => {
        let Iten = JSON.parse(localStorage.getItem('Local:'))
        if(Iten){
            Iten.map(iten => rest += parseFloat(iten.precio_kx * iten.cantidad_kx))
            setTotal(rest.toFixed(2))
            return (
                Iten.map((iten) => (
                    <>
                        <tr key={iten.id}>
                            <td>{iten.nombre_producto}</td>
                            <td style={{ width: "100px" }}><Input className="form-control" type="text" defaultValue={iten.cantidad_kx} /></td>
                            <td>{iten.medida}</td>
                            <td>{"$"+iten.precio_kx}</td>
                            <td><button className="btn btn-danger" onClick={()=>EliminarIdStoragen(iten.id)}>
                                <i className="nc-icon nc-simple-remove"></i>
                            </button></td>
                        </tr>
                    </>
                ))
            )
        }else{
            return null;
        }
        
    }
    const [OpenModal, setOpenModal] = useState(false)
    const [Title, setTitle] = useState("NuevoProducto")
    const handleNuevoP=()=>{
        setTitle("NuevoProducto")
        setOpenModal(!OpenModal)
    }
    const [proveedores, setproveedores] = useState([])
    const ListaProveedores=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const res = await axios.get('http://localhost:4000/proveedores/lista/'+empresa)
        if(res.data.length > 0){
            setproveedores(res.data)
        }
    }
    const [ruc, setruc] = useState("")
    const [codigo_proveedor_kx, setcodigo_proveedor_kx] = useState("")
    const [n_factura_kx, setn_factura_kx] = useState("")
    const handleProveedor=(e)=>{
        let value = e.target.value.split(",")
        setcodigo_proveedor_kx(value[0])
        setruc(value[1])
    }
    useEffect(() => {
        ListaProveedores()
    }, [])
    return (
        <div className="content">
            <Card>
                <Row>
                    <Col md="8">
                        <Row>
                            <Col md="2">
                                <input type="button" value="Añadir Iten" className="btn btn-info mt-4" onClick={() => setOpenModalCompraMP(true)} />
                            </Col>
                            <Col md="3">
                                <input type="button" value="Nuevo producto" className="btn btn-info mt-4" onClick={() =>handleNuevoP() } />
                            </Col>
                        </Row>
                        <div className="orden-web">
                            <div className="orden-producto">
                                <Table hover responsive>
                                    <thead className="bg-info p-2" style={{ fontWeight: 'bold' }}>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cant.</th>
                                            <th>U.Medida</th>
                                            <th>Precio.Compra</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                     <VerPedido />
                                    </tbody>
                                </Table>
                            </div>
                            <Row className="d-flex justify-content-center"> 
                                <Col md="4">
                                    <button className="form-control btn btn-info" onClick={()=>hanbleGenerarPago()}>Registra Compra</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    
                    <Col md="4">
                        <CardHeader className="bg-info text-center">
                            <CardTitle><h2>${Total}</h2></CardTitle>
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
                                <Col md="12">
                                    <FormGroup>
                                        <label>N. FACTURA</label>
                                        <Input
                                            placeholder="000-000-000000"
                                            name="factura"
                                            type="text"
                                            onChange={(e)=>setn_factura_kx(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label>PRRVEEDOR</label>
                                        <select name="proveedor" className="form-control" onChange={(e)=>handleProveedor(e)}>
                                        <option>Seleccione Proveedor</option>
                                        {
                                            proveedores.map((iten)=>(
                                            <option value={iten.id+","+iten.ruc}>{iten.razon_social}</option>
                                            ))
                                        }
                                        </select>
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
                                        <label>RUC. DE PROVEEDOR</label>
                                        <Input
                                            name="fecha"
                                            type="text"
                                            disabled
                                            defaultValue={ruc}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>SUB-TOTAL</h6>
                                    <h6>${(Total - Total*0.12).toFixed(2)}</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>IVA (12%)</h6>
                                    <h6>${(Total*0.12).toFixed(2)}</h6>
                                </div>
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <h6>TOTAL</h6>
                                    <h6>${Total}</h6>
                                </div>
                            </Col>
                        </CardFooter>
                    </Col>
                </Row>
            </Card>
            <ModalCompraMP
            OpenModalCompraMP={OpenModalCompraMP}
            setOpenModalCompraMP={setOpenModalCompraMP}
            />
            <ModalMP
                OpenModal={OpenModal}
                setOpenModal={setOpenModal}
                Title={Title}
                setTitle={setTitle}
                ListaProductos={ListaProductos}
            />
        </div>
    );
}

export default withRouter(CompraMateria);