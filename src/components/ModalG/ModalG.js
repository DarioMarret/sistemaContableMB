import React, { useState } from 'react'
import { Modal, ModalBody, InputGroup, InputGroupAddon,Button,Card,CardBody,FormGroup,Input,Row,Col} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import swal from 'sweetalert';

const ModalG = (props) => {
const {ListarGasto, setOpenModal, OpenModal}=props

    const [costo, setcosto] = useState("")
    const [rubro, setrubro] = useState([])
    const [base12, setbase12] = useState("")
    const [iva, setiva] = useState("")
    const [noIva, setnoIva] = useState("")
    const [base0, setbase0] = useState("")
    const [ice, setice] = useState("")
    // const [total, settotal] = useState("")
    const [acumulador, setacumulador] = useState(0)
    const [rubroSelect, setrubroSelect] = useState("")
    const [ruc, setruc] = useState("")
    const [razon, setrazon] = useState("")
    const [factura, setfactura] = useState("")
    const [fecha, setfecha] = useState("")
 
    // let Totales = 0;
    const GrabarGastos = async (e) => {
        e.preventDefault()
        const rest = await axios.post('http://54.156.16.123:4000/reporte/ingresar/gastos',{costo, fecha, rubroSelect, razon, ruc, factura, noIva, base0, base12, iva, ice, acumulador})
        console.log(rest.data);
        if(rest.data !== "Uno o Varios Campo Vacio llenar todo los campos"){
            ListarGasto()
            Limpiar()
            setOpenModal(!OpenModal)
            swal({
                text: 'Se Ingreso el Gasto Con exito',
                icon: "success",
                timer: 3000,
            })
        }else{
            swal({
                text: rest.data,
                icon: "error",
                timer: 3000,
            })
        }
    }

    const Limpiar = () => {
        setrubroSelect("")
        setiva("")
        setice("")
        setacumulador("")
        setcosto("")
    }

    const status = (e) => {
        Limpiar()
        setcosto(e.target.value)
        if (e.target.value === "Costos Fijo") {
            let rubro = document.getElementById('rubro')
            let ruc = document.getElementById('ruc')
            let factura = document.getElementById('factura')
            let iva = document.getElementById('iva')
            let noIva = document.getElementById('noIva')
            let razon = document.getElementById('razon')
            let base12 = document.getElementById('base12')
            let ice = document.getElementById('ice')
            let base0 = document.getElementById('base0')

            factura.value = ""
            razon.value = ""
            ruc.value = ""
            // iva.value = ""
            noIva.value = ""
            base0.value = ""
            base12.value = ""
            ice.value = ""
            rubro.removeAttribute("disabled", "")
            Rubro(e.target.value)
        } else {
            if (e.target.value === "Gastos Administrativos") {
                let rubro = document.getElementById('rubro')
                let ruc = document.getElementById('ruc')
                let factura = document.getElementById('factura')
                let iva = document.getElementById('iva')
                let noIva = document.getElementById('noIva')
                let razon = document.getElementById('razon')
                let base12 = document.getElementById('base12')
                let ice = document.getElementById('ice')
                let base0 = document.getElementById('base0')
                // let total = document.getElementById('total')

                factura.value = ""
                razon.value = ""
                ruc.value = ""
                // iva.value = ""
                noIva.value = ""
                base0.value = ""
                base12.value = ""
                ice.value = ""
                // total.value=""

                ice.removeAttribute("disabled", "")
                ruc.removeAttribute("disabled", "")
                iva.removeAttribute("disabled", "")
                noIva.removeAttribute("disabled", "")
                base0.removeAttribute("disabled", "")
                razon.removeAttribute("disabled", "")
                base12.removeAttribute("disabled", "")
                factura.removeAttribute("disabled", "")
                rubro.removeAttribute("disabled", "")
                Rubro(e.target.value)
            } else {
                if (e.target.value === "Gasto de Personal") {
                    let rubro = document.getElementById('rubro')
                    let ruc = document.getElementById('ruc')
                    let factura = document.getElementById('factura')
                    let iva = document.getElementById('iva')
                    let noIva = document.getElementById('noIva')
                    let razon = document.getElementById('razon')
                    let base12 = document.getElementById('base12')
                    let ice = document.getElementById('ice')
                    let base0 = document.getElementById('base0')
                    // let total = document.getElementById('total')

                    factura.value = ""
                    razon.value = ""
                    ruc.value = ""
                    // iva.value = ""
                    noIva.value = ""
                    base0.value = ""
                    base12.value = ""
                    ice.value = ""
                    // total.value=""

                    rubro.removeAttribute("disabled", "")
                    ruc.setAttribute("disabled", "")
                    factura.setAttribute("disabled", "")
                    iva.setAttribute("disabled", "")
                    noIva.setAttribute("disabled", "")
                    base12.setAttribute("disabled", "")
                    ice.setAttribute("disabled", "")
                    razon.setAttribute("disabled", "")

                    Rubro(e.target.value)
                } else {
                    let rubro = document.getElementById('rubro')
                    let ruc = document.getElementById('ruc')
                    let factura = document.getElementById('factura')
                    let iva = document.getElementById('iva')
                    let noIva = document.getElementById('noIva')
                    let razon = document.getElementById('razon')
                    let base12 = document.getElementById('base12')
                    let ice = document.getElementById('ice')
                    let base0 = document.getElementById('base0')
                    // let total = document.getElementById('total')

                    factura.value = ""
                    razon.value = ""
                    ruc.value = ""
                    // iva.value = ""
                    noIva.value = ""
                    base0.value = ""
                    base12.value = ""
                    ice.value = ""
                    // total.value=""

                    rubro.removeAttribute("disabled", "")
                    ice.removeAttribute("disabled", "")
                    ruc.removeAttribute("disabled", "")
                    iva.removeAttribute("disabled", "")
                    noIva.removeAttribute("disabled", "")
                    base0.removeAttribute("disabled", "")
                    razon.removeAttribute("disabled", "")
                    base12.removeAttribute("disabled", "")
                    factura.removeAttribute("disabled", "")
                    if (e.target.value === 'Gastos Personales') {
                        let rubro = document.getElementById('rubro')
                        let ruc = document.getElementById('ruc')
                        let factura = document.getElementById('factura')
                        let iva = document.getElementById('iva')
                        let noIva = document.getElementById('noIva')
                        let razon = document.getElementById('razon')
                        let base12 = document.getElementById('base12')
                        let ice = document.getElementById('ice')
                        let base0 = document.getElementById('base0')
                        // let total = document.getElementById('total')

                        factura.value = ""
                        razon.value = ""
                        ruc.value = ""
                        // iva.value = ""
                        noIva.value = ""
                        base0.value = ""
                        base12.value = ""
                        ice.value = ""
                        // total.value=""
                        Rubro(e.target.value)

                    } else {
                        if (e.target.value === 'Costos de Venta') {
                            let rubro = document.getElementById('rubro')
                            let ruc = document.getElementById('ruc')
                            let factura = document.getElementById('factura')
                            let iva = document.getElementById('iva')
                            let noIva = document.getElementById('noIva')
                            let razon = document.getElementById('razon')
                            let base12 = document.getElementById('base12')
                            let ice = document.getElementById('ice')
                            let base0 = document.getElementById('base0')
                            // let total = document.getElementById('total')

                            factura.value = ""
                            razon.value = ""
                            ruc.value = ""
                            // iva.value = ""
                            noIva.value = ""
                            base0.value = ""
                            base12.value = ""
                            ice.value = ""
                            // total.value=""
                            rubro.setAttribute("disabled", "")
                        } else {
                            let rubro = document.getElementById('rubro')
                            let ruc = document.getElementById('ruc')
                            let factura = document.getElementById('factura')
                            let iva = document.getElementById('iva')
                            let noIva = document.getElementById('noIva')
                            let razon = document.getElementById('razon')
                            let base12 = document.getElementById('base12')
                            let ice = document.getElementById('ice')
                            let base0 = document.getElementById('base0')
                            // let total = document.getElementById('total')

                            factura.value = ""
                            razon.value = ""
                            ruc.value = ""
                            // iva.value = ""
                            noIva.value = ""
                            base0.value = ""
                            base12.value = ""
                            ice.value = ""
                            // total.value=""
                            rubro.removeAttribute("disabled", "")
                        }
                    }
                }
            }
        }
    }
    const Rubro = async (data) => {
        const rest = await axios.post('http://54.156.16.123:4000/gasto/rubro', { data })
        setrubro(rest.data)
    }
    const handelnoIva = (e) => {
        if (e) {
            const { value } = e.target;
            // console.log("noIva",value);
            if(value !== 0){
                setnoIva(value)
                setacumulador(acumulador + parseFloat(value))
                console.log(acumulador + parseFloat(value));
            }
        }
    }

    const handelbase0 = (e) => {
        if (e) {
            const { value } = e.target;
            if(value !== 0){
                setbase0(value)
                setacumulador(acumulador + parseFloat(value))
                console.log(acumulador + parseFloat(value));
            }
        }
    }

    const handelIva = (e) => {
        const { value } = e.target;
        if(value.length >= 1){
            let rest = parseFloat(e.target.value * 0.12)
            setiva(rest.toFixed(2))
            setbase12(value)
            var total = parseFloat(rest) + parseFloat(value)
            if(noIva.length > 0){
                total += parseFloat(noIva)
                if(base0.length > 0){
                    total += parseFloat(base0)
                }
            }
            setacumulador(total.toFixed(2))
            console.log("acu",total);
        }else{
            setacumulador(0)
        }
    }

    return (
        <>

            <Modal isOpen={OpenModal}
                size="xl"
            >
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row justify-content-between">
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <div className="">
                                                <input className="form-check-input" type="radio" value="Costos de Venta" checked={costo === "Costos de Venta"} id="flexCheckDefault" onChange={(e) => status(e)} />
                                                <label className="form-check-label px-2 costo" htmlFor="flexCheckDefault">
                                                    Costos de Venta
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <div className="">
                                                <input className="form-check-input" type="radio" value="Costos Fijo" checked={costo === "Costos Fijo"} id="flexCheckDefault" onChange={(e) => status(e)} />
                                                <label className="form-check-label px-2" htmlFor="flexCheckDefault">
                                                    Costos Fijo
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <div className="">
                                                <input className="form-check-input" type="radio" value="Gastos Administrativos" checked={costo === "Gastos Administrativos"} id="flexCheckDefault" onChange={status} />
                                                <label className="form-check-label px-2" htmlFor="flexCheckDefault">
                                                    Administrativos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <div className="">
                                                <input className="form-check-input" type="radio" value="Gasto de Personal" checked={costo === "Gasto de Personal"} id="flexCheckDefault" onChange={status} />
                                                <label className="form-check-label px-2" htmlFor="flexCheckDefault">
                                                    Gastos de Personal
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ">
                                        <div className="form-group">
                                            <div className="">
                                                <input className="form-check-input" type="radio" value="Gastos Personales" checked={costo === "Gastos Personales"} id="flexCheckDefault" onChange={status} />
                                                <label className="form-check-label px-2" htmlFor="flexCheckDefault">
                                                    Personales
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <Row>
                                <Col md="12">
                                    <Card className="card">
                                        <CardBody>

                                            <Row>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>RUBRO</label>
                                                        <select name="" id="rubro" className="form-control" onChange={(e) => setrubroSelect(e.target.value)}>
                                                                <option value="">Seleccione una Opcion</option>
                                                            {
                                                                rubro.map((iten) => (
                                                                    <>
                                                                        <option value={iten.rubro}>{iten.rubro}</option>
                                                                    </>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>RAZON SOCIAL</label>
                                                        <Input
                                                            id="razon"
                                                            type="text"
                                                            onChange={(e) => setrazon(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="3">
                                                    <FormGroup>
                                                        <label htmlFor="exampleInputEmail1">
                                                            CI/RUC:
                                                            </label>
                                                        <Input id="ruc" type="text"
                                                            onChange={(e) => setruc(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="3">
                                                    <FormGroup>
                                                        <label htmlFor="exampleInputEmail1">
                                                           FECHA
                                                            </label>
                                                        <Input id="fecha" type="date"
                                                            onChange={(e) => setfecha(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="6">
                                                    <FormGroup>
                                                        <label>N°. FACTURA</label>
                                                        <Input
                                                            id="factura"
                                                            onChange={(e) => setfactura(e.target.value)}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                
                                            </Row>
                                            <Row>
                                                <Col className="pl-1" md="3">
                                                    <FormGroup>
                                                        <label>BASE NO OBJETO IVA</label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                            <Input
                                                                id="noIva"
                                                                onChange={(e) => setnoIva(e.target.value) }
                                                                defaultValue={noIva}
                                                                type="text"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="3">
                                                    <FormGroup>
                                                        <label>BASE 0%</label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                            <Input
                                                                id="base0"
                                                                onChange={(e) => setbase0(e.target.value)}
                                                                defaultValue={base0}
                                                                type="text"
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="3">
                                                    <FormGroup>
                                                        <label>BASE 12%</label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                            <Input
                                                                id="base12"
                                                                name="base12"
                                                                defaultValue={base12}
                                                                type="text"
                                                                onChange={(e) => handelIva(e)}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col className="px-1" md="3">
                                                    <FormGroup>
                                                        <label>IVA 12%</label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                                                            <Input
                                                                id="iva"
                                                                name="iva"
                                                                defaultValue={iva}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <div className="d-flex justify-content-between">
                                                    <Col className="pl-1" md="3">
                                                        <FormGroup>
                                                            <label>ICE</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input placeholder="Impuesto de compra especial"
                                                                    onChange={(e) => setice(e.target.value)}
                                                                    id="ice" />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <label>TOTAL</label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input 
                                                                defaultValue={acumulador === 0 || acumulador === NaN ? "" : acumulador}
                                                                onChange={(e) =>setacumulador(e.target.value)}
                                                                 />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </div>
                                            </Row>
                                            <Row>
                                                <Col md="12" className="d-flex justify-content-end">
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round"
                                                            color="danger"
                                                            type="submit"
                                                            onClick={() => setOpenModal(!OpenModal)}
                                                        >
                                                            Cerrar Formulario
                                                        </Button>
                                                    </div>
                                                    <div className="update ml-auto mr-auto">
                                                        <Button
                                                            className="btn-round"
                                                            color="primary"
                                                            type="submit"
                                                            onClick={(e) => GrabarGastos(e)}
                                                        >
                                                            Ingresar Gasto
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
                {/* <ModalFooter>

                </ModalFooter> */}
            </Modal>
        </>
    )
}
export default ModalG;