import { Link } from "react-router";
import MenuEmpleados from "../components/MenuEmpleados";

const Configuracion = () => {
    return (
        <div>
            <Link className="nav-link btn btn-primary" to={"sectores"}>
              Gestionar sectores
            </Link>
            <Link className="nav-link btn btn-primary" to={"roles"}>
              Gestionar roles
            </Link>
            <MenuEmpleados />
            
            
            
        </div>
    );
};

export default Configuracion;