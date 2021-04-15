import React, {useState} from 'react';
import { Container, Row, Col, Jumbotron, Card, CardBody, Input, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
// import LoginForm from "./components/loginForm.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo_mg from '../assets/img/damir-bosnjak.jpg'
import axios from 'axios';
import swal from 'sweetalert';


function Login(props) {
  
  const { history } = props;
  const [usuario, setusuario] = useState("")
  const [password, setpassword] = useState("")

  const Validate =async () => {
    const rest = await axios.post('http://34.196.59.251:4000/login/validar',{usuario,password})
    console.log(rest.data);
    if(rest.data === "No exite el Usuario"){
        swal({
          text: 'El usuario no exite',
          icon: "error",
          timer: 3000,
        })
    }else{
      localStorage.setItem("usuario:", rest.data[0].nombre)
      localStorage.setItem("empresa:",rest.data[0].empresa)
      history.push("/admin/dashboard")
    }
  }

return (
  <div className="" style={{ background: "#313131", height: "100%" }}>
    <Container>
      <Row className="d-flex align-items-center">
        <Col />
        <Col lg="4">
          <Jumbotron>
          <div style={{height:'150px'}}/>
            <Card className='background-image'>
              <CardBody >
                <Row className="justify-content-center" >
                  <Col>
                    <img src={logo_mg} alt="" />
                    <div style={{ padding: "5%" }} />
                    <Input placeholder="Ingrese un Usuario" type="text" className="mb-4" onChange={(e) => setusuario(e.target.value)} />
                    <Input placeholder="*********" type="password" className="mb-4" onChange={(e) => setpassword(e.target.value)} />
                    <Button color="primary" className="form-control" onClick={() => Validate()}>Iniciar Sesión</Button>
                    <p className="text-center"><Link style={{textDecoration:'none'}}> Registrate </Link> o  recupera tu <Link style={{textDecoration:'none'}}> contraseña </Link> </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Jumbotron>
        </Col>
        <Col />
      </Row>
    </Container>
  </div>
);
}

export default withRouter(Login);