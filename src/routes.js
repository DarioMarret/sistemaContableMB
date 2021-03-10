import Dashboard from "views/Dashboard.js";
// import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";

import ReporteVenta from "views/ReporteVenta.js";
import ReporteGastos from "views/ReporteGastos.js";
import ReporteOtrosG from "views/Gastos.js";
import productos from "views/Productos.js";
import PVenta from "views/PVenta.js";
import Users from "views/Users.js";
import Nomina from "views/Nomina.js";
import Proveedores from "views/Proveedores.js";
import PuntoVenta from "views/PuntoVenta.js";
import Cliente from "views/Cliente.js";
import Factura from "views/Factura.js";
import EditarProveedor from "views/EditarProveedor.js";
import Compras from "views/Compras.js";
import EditarUsers from "views/EditarUsers.js";
import Rol from "views/Rol.js";
import CosteoProductos from "views/CosteoProducto.js";
import Asistencia from "views/Asistencia.js";
import CompraMateria from "views/CompraMateria.js";
import ListaMateriaPrima from "views/ListaMateriaPrima.js";


import LuieleiVenta from "views/LuieleiVentas.js";
import luieleiGastos from "views/LuieleiGastos.js";
import LuieleiOtros from "views/LuieleiOtros.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/compra_materia_prima",
    name: "Compra de Materia Prima",
    component: CompraMateria,
    layout: "/admin",
  },
  {
    path: "/materia_prima",
    name: "Materia Prima",
    component: ListaMateriaPrima,
    layout: "/admin",
  },
  {
    path: "/asistencia",
    name: "Asistencia / Observacion",
    component: Asistencia,
    layout: "/admin",
  },
  {
    path: "/ventas",
    name: "Reporte de Ventas",
    icon: "nc-icon nc-bank",
    component: ReporteVenta,
    layout: "/admin",
  },
  {
    path: "/gastos",
    name: "Reporte de Gastos",
    icon: "nc-icon nc-bank",
    component: ReporteGastos,
    layout: "/admin",
  },
  {
    path: "/otros_gastos",
    name: "Gastos_Otros",
    icon: "nc-icon nc-bank",
    component: ReporteOtrosG,
    layout: "/admin",
  },
  {
    path: "/lui-ventas",
    name: "Lui Reporte de Ventas",
    icon: "nc-icon nc-bank",
    component: LuieleiVenta,
    layout: "/admin",
  },
  {
    path: "/lui-gastos",
    name: "Lui Reporte de Gastos",
    icon: "nc-icon nc-bank",
    component: luieleiGastos,
    layout: "/admin",
  },
  {
    path: "/lui-otros",
    name: "Lui Gastos_Otros",
    icon: "nc-icon nc-bank",
    component: LuieleiOtros,
    layout: "/admin",
  },
  {
    path: "/productos",
    name: "Productos",
    component: productos,
    layout: "/admin",
  },
  {
    path: "/p_venta",
    name: "Punto de Venta",
    component: PVenta,
    layout: "/admin",
  },
  {
    path:"/lista_user",
    name: "Lista de Empleado",
    component: Users,
    layout: "/admin",
  },
  {
    path:"/nomina",
    name: "Nomina / Roles",
    component: Nomina,
    layout: "/admin",
  },
  {
    path:"/proveedores",
    name: "Proveedores",
    component: Proveedores,
    layout: "/admin",
  },
  {
    path:"/proveedoresEdit/:id",
    name: "Editar Proveedor",
    component: EditarProveedor,
    layout: "/admin",
  },
  {
    path:"/nuevo_proveedor",
    name: "Nuevo proveedor",
    component: Proveedores,
    layout: "/admin",
  },
  {
    path:"/punto_venta",
    name: "Punto de Venta Web",
    component: PuntoVenta,
    layout: "/admin",
  },
  {
    path:"/clientes",
    name: "Clientes",
    component: Cliente,
    layout: "/admin",
  },
  {
    path:"/facturas",
    name: "Facturas",
    component: Factura,
    layout: "/admin",
  },
  {
    path:"/compras",
    name: "Compras",
    component: Compras,
    layout: "/admin",
  },
  {
    path: "/editar/:id",
    name:"Detalle de Empleado",
    component: EditarUsers,
    layout:"/admin"
  },
  {
    path: "/roles/:cedula",
    name:"Detalle de Empleado",
    component: Rol,
    layout:"/admin"
  },
  {
    path: "/costeo",
    name:"",
    component: CosteoProductos,
    layout:"/admin"
  },
];
export default routes;
