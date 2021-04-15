import React, {useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Card, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap'
import axios from 'axios'

function Nomina(props) {
    const {history} = props;

    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const [nomina, setnomina] = useState([])
    const BuscarNomina=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://34.196.59.251:4000/nomina/rol',{desde, hasta, empresa})
        if(rest.data === 'No'){

        }else{
            setnomina(rest.data)
        }
    }
    const handlePush=(cedula)=>{
        history.push('/admin/roles/'+cedula+'/'+desde+'/'+hasta)
    }

    var rest ;
    var recibe =0;
    var anticip =0;
    nomina.map(iten=>(recibe+=iten.recibe))
    nomina.map(iten=>(anticip+=(iten.recibe - iten.anticipo).toFixed(2) - (iten.sueldo / 100 * iten.iess / 15).toFixed(2)))
    
    return (
        <div className="content">
            <Card className="card-user">
            <Row>
                <Col md="3" className="p-2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Desde:</InputGroupText>
                        </InputGroupAddon>
                            <Input type="date" onChange={(e)=>setdesde(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col md="3" className="p-2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Hasta:</InputGroupText>
                        </InputGroupAddon>
                            <Input type="date" onChange={(e)=>sethasta(e.target.value)}/>
                            <div  className="my-1" style={{ height: "10%", width: "5%", marginLeft:"15px" }}>
                                <i className="nc-icon nc-zoom-split" role="button" style={{ fontSize: "30px" }} onClick={()=>BuscarNomina()}></i>
                            </div>
                    </InputGroup>
                </Col>
            </Row>
            </Card>
            <Card>
            <Table responsive >
                    <thead className="bg-info">
                        <tr>
                            <th>CARGO</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>SUELDO</th>
                            <th>DIAS T.</th>
                            <th>SALDO DIAS</th>
                            <th>IESS</th>
                            <th>ANTICIPOS</th>
                            <th>RECIBE</th>
                            <th>FECHA</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                nomina.map((iten)=>(
                                   <tr key={iten.id}> 
                                   <td>{iten.cargo}</td>
                                   <td>{iten.nombre}</td>
                                   <td>{iten.apellido}</td>
                                   <td>${iten.sueldo.toFixed(2)}</td>
                                   <td>{iten.dias}</td>
                                   <td>${iten.recibe.toFixed(2)}</td>
                                   <td>{iten.iess}%</td>
                                   <td>${iten.anticipo.toFixed(2)}</td>
                                   <td>${((iten.recibe - iten.anticipo) - (iten.sueldo / 100 * iten.iess / 15)).toFixed(2)}</td>
                                   <td>{iten.fecha ? rest = iten.fecha.split("T",1) : ''}</td>
                                   <td><button className="btn btn-primary" onClick={()=>handlePush(iten.cedula)}>Rol</button></td>
                                   </tr>
                                ))
                            }
                        <tr style={{ padding:'0px'}}>
                            <th colspan="2" className="table-active "></th>
                            <th colspan="1" className="table-active "></th>
                            <th colspan="1" className="table-active text-center fs-2">Total</th>
                            <th colspan="4" className="table-active "></th>
                            <th colspan="1" className="table-active text-center fs-2">${anticip.toFixed(2)}</th>
                            <th colspan="2" className="table-active"></th>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}

export default withRouter(Nomina);