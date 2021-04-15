/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { withRouter} from "react-router-dom";
import Login from '../layouts/Login'
import RegistrarSuscripcion from '../views/RegistrarSuscripcion'


function page(props) {
    const { history } = props;    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapseOpen, setCollapseOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapseOut, setCollapseOut] = useState("");


    const toggleCollapse = () => {
      document.documentElement.classList.toggle("nav-open");
      setCollapseOpen(!collapseOpen);
    };
    const onCollapseExiting = () => {
      setCollapseOut("collapsing-out");
    };
    const onCollapseExited = () => {
      setCollapseOut("");
    };
    const [status, setstatus] = useState("documentacion")
    
    const ReturnSwitch=(value)=>{
    
        switch (status) {
            case "documentacion":
                return null;
            case "suscripcion":
                return <RegistrarSuscripcion/>
            case "login":
                return <Login/>
            default:
        }
    }
    return (
        <>
        <Navbar className="fixed-top navbar-dark" color-on-scroll="100" expand="lg" style={{ background: '#313131' }}>
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand to="/" tag={Link} id="navbar-brand" >
                    <b onClick={()=>setstatus("documentacion")}>SISTEMA CONTABLE BM</b>
                    </NavbarBrand>
                    <UncontrolledTooltip placement="bottom" target="navbar-brand">
                        <b className="text-muted">CODIGOMARRET</b>
                    </UncontrolledTooltip>
                    <button
                        aria-expanded={collapseOpen}
                        className="navbar-toggler navbar-toggler"
                        onClick={toggleCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                    className={"justify-content-end " + collapseOut}
                    navbar
                    isOpen={collapseOpen}
                    onExiting={onCollapseExiting}
                    onExited={onCollapseExited}
                >
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand" xs="12">
                                <a href="#pablo" style={{textDecoration:'none'}} onClick={(e) => e.preventDefault()}>
                                  Solicitar un Demo
                                </a>
                            </Col>
                            <Col className="collapse-close text-right" xs="6">
                                <button
                                    aria-expanded={collapseOpen}
                                    className="navbar-toggler"
                                    onClick={toggleCollapse}
                                >
                                    <i className="tim-icons icon-simple-remove" />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <Nav navbar>
                        <NavItem className="p-0">
                            <NavLink
                                data-placement="bottom"
                                rel="noopener noreferrer"
                            >
                                <button className="btn btn-dark" onClick={()=>setstatus("suscripcion")}>
                                    Suscripcion
                                </button>
                            </NavLink>
                        </NavItem>
                        <NavItem className="p-0">
                            <NavLink
                                data-placement="bottom"
                                rel="noopener noreferrer"
                                title="Follow us on Instagram"
                            >
                                <button className="btn btn-dark" onClick={()=>setstatus("login")}>
                                    Login
                                </button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
        
            <ReturnSwitch/>
        </>
    );
}

export default withRouter(page);