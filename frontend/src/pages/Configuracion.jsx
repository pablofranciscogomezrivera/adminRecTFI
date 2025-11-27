import { Link } from "react-router";
import MenuEmpleados from "../components/MenuEmpleados";

const Configuracion = () => {
    return (
        <div>
            <Link className="nav-link" to={"sectores"}>
              Gestionar sectores
            </Link>
            <MenuEmpleados />
            
            
            
        </div>
    );
};

export default Configuracion;