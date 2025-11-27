import { Link } from "react-router";

const Administrador = () => {
    return (
        <div>
          <Link className="nav-link" to={"configuracion"}>
              Configuracion
            </Link>
            <Link className="nav-link" to={"/"}>
              Inicio
            </Link>
        </div>
    );
};

export default Administrador;