import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, Table, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from 'reactstrap'


function Asistencia(props) {

    const [empleado, setempleado] = useState([])
    const ListaAsistencia=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://34.196.59.251:4000/nomina/asistencia',{empresa})
        console.log(rest)
        setempleado(rest.data)

    }
    const AsistenciaOk=async(cedula, d_laborados)=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://34.196.59.251:4000/nomina/asistenciaOk',{empresa,cedula,d_laborados})
        if(rest.data === 'ok'){
            ListaAsistencia()
        }
    }
    const [text, settext] = useState({
        observacion:''
    })
    const hanbleText=(e, cedula)=>{
        if(e.charCode === 13){
            settext({
                ...text,
                [e.target.name]:e.target.value
            })
            Observacion(cedula,text)
        }
    }
    const Observacion=async(cedula, text)=>{
        let empresa = localStorage.getItem('empresa:')
        const rest = await axios.post('http://34.196.59.251:4000/nomina/observacion',{empresa,cedula,text})
        if(rest.data === 'ok'){
            ListaAsistencia()
        }
    }
    useEffect(()=>{
        ListaAsistencia()
    },[])
    return (
        <div className="content">
            <Card>
                <Table reponsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Asistencia</th>
                            <th>Observacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empleado.map((iten)=>(
                            <tr>
                                <td>{iten.nombre}</td>
                                <td className="">
                                {
                                    iten.d_laborados === 0 
                                    ?<button className="btn btn-danger" onClick={()=>AsistenciaOk(iten.id_cedula, iten.d_laborados)}>Ausente</button>
                                    :<button className="btn btn-success" onClick={()=>AsistenciaOk(iten.id_cedula, iten.d_laborados)}>OK</button>
                                }
                                </td>
                                <td><Input 
                                placeholder="Observacion"
                                name="observacion"
                                onKeyPress={(e)=>hanbleText(e, iten.id_cedula)}
                                defaultValue={iten.observacion}
                                /></td>
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>     
            </Card>            
        </div>
    );
}

export default withRouter(Asistencia);