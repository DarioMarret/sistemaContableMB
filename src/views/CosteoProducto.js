import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, Table, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from "reactstrap";
import axios from 'axios'
import swal from 'sweetalert';


function CosteoProducto(props) {

    const [ListaCosteo, setListaCosteo] = useState([])
    let Costo =[];
    function handleCosteoValue(){
        
        VerCosteo()
        let ingrediente = document.getElementById('ingrediente')
        let cantidad = document.getElementById('cantidad')
        let und_med = document.getElementById('und_med')

        let split = ingrediente.value.split(',')
        let medida = und_med.value.split(',')
     
        const info = {
            ingrediente_cst:split[1],
            unidadMedida:medida[1],
            cantidad_cst:cantidad.value,
            id_unidad_medida_cst:medida[0],
            codigo_producto_kx_cst:split[0],
            empresa: localStorage.getItem('empresa:')
        }
        localStorage.setItem('Costeo:',JSON.stringify([...Costo,info]));
        ingrediente.value = ""
        cantidad.value = ""
        und_med.value = ""
        let array = JSON.parse(localStorage.getItem('Costeo:'))
        setListaCosteo(array)
    }
    function VerCosteo() {
        let iten = JSON.parse(localStorage.getItem('Costeo:'));
            if(iten !== null){
              Costo = iten;
              setListaCosteo(Costo)
            }
      }

    const [producto, setproducto] = useState({
        codigo:'',
        producto:''
    })
    const hanbleBusqueda=async()=>{
        let producto = document.getElementById('buscar').value;
        let empresa = localStorage.getItem('empresa:')
        const resp = await axios.post('http://localhost:4000/costeo/producto',{producto, empresa})
        console.log(resp.data)
        if (resp.data === null){
            swal({
                text: "El Producto no se encuentra en Base",
                icon: "warning",
                timer: 2000,
            }) 
        }else{
            setproducto(resp.data)
            localStorage.setItem('codigo_producto_cst:',resp.data.codigo)
            localStorage.setItem('producto:',resp.data.producto)
        }
    }

    const [SelectProdutc, setSelectProdutc] = useState([])
    const ProdutoMP=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const resp = await axios.get('http://localhost:4000/costeo/producto/'+ empresa)
        setSelectProdutc(resp.data)
    }
    const [medida, setmedida] = useState([])
    const UnidadMedida = async () => {
        const rest = await axios.get('http://localhost:4000/inventario/unidad')
        setmedida(rest.data)
    }

    const EliminarDStora=async(ingrediente)=>{
        let array = localStorage.getItem('Costeo:');
        let Cost = []
        Cost = JSON.parse(array).filter(carrito=> carrito.ingrediente_cst !== ingrediente)
        await localStorage.setItem('Costeo:',JSON.stringify(Cost));
        VerCosteo()
    }
    const GrabarCosteo=async()=>{
        let iten = JSON.parse(localStorage.getItem('Costeo:'))
        let codigo_producto_cst = localStorage.getItem('codigo_producto_cst:')
        const resp = await axios.post('http://localhost:4000/costeo/receta',{iten, codigo_producto_cst})
        if(resp.data === 'ok'){
            localStorage.removeItem('Costeo:')
            localStorage.removeItem('codigo_producto_cst:')
            localStorage.removeItem('producto:')
            VerCosteo()
        }

    }
    useEffect(()=>{
        ProdutoMP()
        UnidadMedida()
        VerCosteo()
    },[])

    return (
        <div className="content">
            <Card>
                <CardHeader>
                    <h3>Costeo de Producto</h3>
                    <Row className="d-flex align-items-center">
                    <Col md="3">
                        <Input
                            id="buscar"
                            name="buscar"
                            placeholder="Nombre producto o codigo"
                        />
                    </Col>
                    <Col md="3">
                       <button className="btn btn-info" onClick={()=>hanbleBusqueda()} >Buscar Producto </button>
                    </Col>
                    <div style={{ height:'30px'}}>
                        <h2 className="text-start">{producto.producto ? producto.producto : localStorage.getItem('producto:')}</h2>
                    </div>
                    </Row>
                </CardHeader>
                {
                    producto.producto || localStorage.getItem('producto:')
                    ?<>
                    <CardBody>
                    <Row className="d-flex align-items-center">
                        <Col md="2">
                        <FormGroup>
                            <label>Ingrediente</label>
                                <select name="" id="ingrediente" className="form-control">
                                    <option value="" >Seleccione un Producto</option>
                                    {
                                        SelectProdutc.map((iten)=>(
                                            <option value={iten.codigo_mp+","+iten.producto_mp}>{iten.producto_mp}</option>
                                        ))
                                    }
                                </select>
                        </FormGroup>
                        </Col>
                        <Col md="2">
                        <FormGroup>
                            <label>Und Med</label>
                            <select name="" id="und_med" className="form-control">
                                    <option value="">Seleccione un Medida</option>
                                    {
                                        medida.map((iten)=>(
                                            <option value={iten.id+","+iten.medida}>{iten.medida}</option>
                                        ))
                                    }
                                </select>
                        </FormGroup>
                        </Col>
                        <Col md="2">
                        <FormGroup>
                            <label>Cantidad</label>
                                <Input
                                    name="cantidad"
                                    id="cantidad"
                                    type="text"
                                    className="p-2"
                                />
                        </FormGroup>
                        </Col>
                        <Col md="1">
                            <button className="btn btn-info" onClick={()=>handleCosteoValue()}>Ingrediente</button>
                        </Col>
                    </Row>
                    </CardBody>
                    </> 
                    :<></>
                }
                <CardBody>
                <Row>
                    <Col md="6" className="text-center">
                    <Table responsive>
                        <thead className="bg-info">
                            <tr>
                                <th>Ingrediente</th>
                                <th>Und Medida</th>
                                <th>Cantidad</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            ListaCosteo.map((iten)=>(
                                <tr>
                                    <td>{iten.ingrediente_cst}</td>
                                    <td>{iten.unidadMedida}</td>
                                    <td>{iten.cantidad_cst}</td>
                                    <td><button className="btn btn-dark" onClick={()=>EliminarDStora(iten.ingrediente_cst)}><i className="nc-icon nc-simple-remove" /></button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    <button className="btn btn-info" onClick={()=>GrabarCosteo()}>Grabar Costeo</button>
                    </Col>
                    <Col md="6">
                    <div className="d-flex justify-content-end">
                        <div style={{width:'50%'}}>
                        
                        </div>
                    </div>
                    </Col>
                </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default withRouter(CosteoProducto);