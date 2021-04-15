import React, { forwardRef, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Card, Col, Row, CardHeader,Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import axios from "axios";
import MaterialTable from 'material-table'

import Edit from '@material-ui/icons/Edit'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Search from '@material-ui/icons/Search'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Delete } from '@material-ui/icons'
import swal from 'sweetalert';


function RecetaCosteo(props) {
    const { history } = props;

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }
    const columnas = [
        {
            title: 'Codigo',
            field: 'codigo',
        },
        {
            title: 'Producto',
            field: 'producto',
        }
    ]

    const [productos, setproductos] = useState([])
    const Listarecet = async () => {
        let empresa = localStorage.getItem("empresa:")
        const { data } = await axios.post("http://34.196.59.251:4000/costeo/listareceta", { empresa })
        if (data) {
            setproductos(data)
        }
    }
    const [modal, setModal] = useState(false);
    const [ingredient, setingredient] = useState([])
    const [title, settitle] = useState("")
    const HandleIngrediente=async(codigo,producto)=>{
        settitle(producto)
        let empresa = localStorage.getItem("empresa:")
        const { data } = await axios.post("http://34.196.59.251:4000/costeo/codigo", { empresa, codigo })
        if (data) {
            setingredient(data)
            setModal(true);
        }
    }

    function Trajetas() {
        return (
            productos.map(iten => (
                <Col md="3">
                    <Card className="text-center" role="button" >
                        <CardHeader id={iten.producto.split(" ").join("")} onClick={()=>HandleIngrediente(iten.codigo,iten.producto)}>
                            <h6 className="text-center">{iten.producto}</h6>
                        </CardHeader>
                    </Card>
                </Col>
            ))
       
        )
    }
    useEffect(() => {
        Listarecet()
    }, [])
    const toggle = () => setModal(!modal);
    const {
        className
      } = props;
    return (
        <div className="content">
            <Card className="">
                <Col className="justify-content-start p-2">
                    <button className="btn btn-primary" onClick={() => history.push('/admin/costeo')}>Costeo por producto</button>
                    <button className="btn btn-primary" onClick={() => history.push('/admin/productos')}>Regresar</button>
                </Col>
            </Card>
            <Row>
                <Trajetas />
            </Row>
            <Modal
            size="xs"
            isOpen={modal} 
            toggle={toggle} 
            className={className}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Ingrediente</th>
                        <th>Cantidad</th>
                        <th>Medida</th>
                    </tr>
                </thead>
                <tbody>
                {     
                ingredient.map(item=>(
                    <tr>
                        <td>{item.ingrediente}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.medida}</td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
            </ModalBody>
            {/* <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter> */}
            </Modal>
        </div>
    );
}

export default withRouter(RecetaCosteo);