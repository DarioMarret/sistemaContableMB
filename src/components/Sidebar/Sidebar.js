import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { UncontrolledCollapse} from "reactstrap";


function Sidebar(props) {
  const sidebar = React.createRef();

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
      toggler="#reporte"
    >
      <div className="logo">
        <a
          href="/admin/dashboard"
          className="simple-text logo-normal text-center"
        >
           BM CodigoMarret
          </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li className={props.location.pathname === "/admin/dashboard" ? "active" : ""}>
            <NavLink to="/admin/dashboard" className="nav-link" activeClassName="active">
              <i className="nc-icon nc-chart-bar-32"></i>
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="" id="caja"><i className="nc-icon nc-money-coins"></i><p>Flujo de Caja chica</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#caja">
          <li className={props.location.pathname === "/admin/flujoCaja" ? "active" : ""}>
            <NavLink to="/admin/flujoCaja" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>M. de caja Chica</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>

          <li >
            <NavLink to="" id="reporte"><i className="nc-icon nc-book-bookmark"></i><p>REPORTE</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#reporte">
            <li className={props.location.pathname === "/admin/ventas" ? "active" : ""} style={{padding:"0px", margin:"0px"}}>
              <NavLink to="/admin/ventas" className="nav-link" activeClassName="active"><i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i><p>VENTAS</p></NavLink>
            </li>
            <li className={props.location.pathname === "/admin/gastos" ? "active" : ""} style={{padding:"0px", margin:"0px"}}>
              <NavLink to="/admin/gastos" className="nav-link" activeClassName="active"><i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i><p>GASTOS</p></NavLink>
            </li>
            <li className={props.location.pathname === "/admin/caja" ? "active" : ""}>
              <NavLink to="/admin/caja" className="nav-link" activeClassName="active"><i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i><p>CAJA</p></NavLink>
            </li>
            <li className={props.location.pathname === "/admin/otros_gastos" ? "active" : ""}>
              <NavLink to="/admin/otros_gastos" className="nav-link" activeClassName="active"><i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i><p>OTRO GASTOS</p></NavLink>
            </li>
          </UncontrolledCollapse>
          <li >
            <NavLink to="" id="iventario"><i className="nc-icon nc-box-2"></i><p>Inventario</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#iventario">
            <li className={props.location.pathname === "/admin/productos" ? "active" : ""}>
            <NavLink to="/admin/productos" className="nav-link " activeClassName="active" >
              <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
              <p>Lista de Productos</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/materia_prima" ? "active" : ""}>
            <NavLink to="/admin/materia_prima" className="nav-link " activeClassName="active" >
              <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
              <p>Lista de Materia Prima</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/traspazo" ? "active" : ""}>
            <NavLink to="/admin/traspazo" className="nav-link " activeClassName="active" >
              <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
              <p>Traspazo</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/kardex" ? "active" : ""}>
            <NavLink to="/admin/kardex" className="nav-link " activeClassName="active" >
              <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
              <p>Kardex</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>
          <li>
            <NavLink to="" id="empleado"><i className="nc-icon nc-single-02"></i><p>Empleados</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#empleado">
            <li className={props.location.pathname === "/admin/lista_user" ? "active" : ""}>
            <NavLink to="/admin/lista_user" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Lista</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/nomina" ? "active" : ""}>
            <NavLink to="/admin/nomina" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Nomina</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/asistencia" ? "active" : ""}>
            <NavLink to="/admin/asistencia" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Asistencia</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>
          <li>
            <NavLink to="" id="egresos"><i className="nc-icon nc-delivery-fast"></i><p>Egresos</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#egresos">
            <li className={props.location.pathname === "/admin/proveedores" ? "active" : ""}>
            <NavLink to="/admin/proveedores" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Proveedores</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/compras" ? "active" : ""}>
            <NavLink to="/admin/compras" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Compras</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/egresos" ? "active" : ""}>
            <NavLink to="/admin/egresos" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Egresos</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>
          <li>
            <NavLink to="" id="ingresos"><i className="nc-icon nc-money-coins"></i><p>Ingresos</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#ingresos">
            <li className={props.location.pathname === "/admin/clientes" ? "active" : ""}>
            <NavLink to="/admin/clientes" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Clientes</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/facturas" ? "active" : ""}>
            <NavLink to="/admin/facturas" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Facturas</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/compra_materia_prima" ? "active" : ""}>
            <NavLink to="/admin/compra_materia_prima" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Compras</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/f_electronica" ? "active" : ""}>
            <NavLink to="/admin/f_electronica" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>F. Electronica</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/p_venta" ? "active" : ""}>
            <NavLink to="/admin/p_venta" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Punto de Venta</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>
          <li>
            <NavLink to="" id="contabilidad"><i className="nc-icon nc-money-coins"></i><p>Contabilidad</p></NavLink>
          </li>
          <UncontrolledCollapse toggler="#contabilidad">
          <li className={props.location.pathname === "/admin/flujoCaja" ? "active" : ""}>
            <NavLink to="/admin/flujoCaja" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Libro Diario</p>
            </NavLink>
            </li>
            <li className={props.location.pathname === "/admin/EsatdoR" ? "active" : ""}>
            <NavLink to="/admin/EsatdoR" className="nav-link " activeClassName="active">
            <i className="nc-icon nc-minimal-right" style={{ fontSize: "15px" }}></i>
            <p>Esatdo Resultado</p>
            </NavLink>
            </li>
          </UncontrolledCollapse>
        </Nav>
      </div>
    </div>
  );

}

export default Sidebar;
