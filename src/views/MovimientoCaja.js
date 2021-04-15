import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import { Card, Col, Row, CardHeader,Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";


function MovimientoCaja(props) {
    const {history} =props;

    const [caja, setcaja] = useState([])
    const Movimiento=async()=>{
        let empresa = localStorage.getItem('empresa:')
        const {data}=await axios.post("http://34.196.59.251:4000/caja/movimientos",{empresa})
        if(data){
            setcaja(data);
        }
    }

    useEffect(()=>{
        Movimiento()
    },[])

    return (
        <div className="content">

            <Card>
                <Table responsive >
                    <thead className="bg-info">
                        <tr>
                            <th className="text-center">Fecha y Hora</th>
                            <th className="text-center">Descripcion</th>
                            {/* <th>Ref.</th> */}
                            <th>Debe</th>
                            <th>Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        caja.map((iten,i)=>(
                            <tr>
                                <td className="text-center">{iten.fecha_h}</td>
                                <td >
                                    <tr>
                                        <td>{iten.cuenta}</td>
                                    </tr>
                                    <tr>
                                        <td>{iten.detalle +""+iten.referencia}</td>
                                    </tr>
                                </td>
                                {/* <td>{iten.detalle}</td> */}
                                {/* <td>{iten.referencia}</td> */}
                                <td>{iten.debe.toFixed(2)}</td>
                                <td>{iten.haber.toFixed(2)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Card>
        </div>
    );
}

export default withRouter(MovimientoCaja);