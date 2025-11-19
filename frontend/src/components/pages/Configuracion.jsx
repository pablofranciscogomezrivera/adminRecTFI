import { Link } from "react-router";

const Configuracion = () => {
    return (
        <div>
            <Link className="nav-link" to={"/configuracion/sectores"}>
              Gestionar sectores
            </Link>
<Link className="nav-link" to={"/configuracion/roles"}>
              Gestionar roles
            </Link>

            
        </div>
    );
};

export default Configuracion;