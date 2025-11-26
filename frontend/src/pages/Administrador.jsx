import { NavLink } from "react-router";

const Administrador = () => {
    return (
        <div>
          <NavLink className="nav-link" to={"/configuracion"}>
              Configuracion
            </NavLink>
            <NavLink className="nav-link" to={"/"}>
              Inicio
            </NavLink>
        </div>
    );
};

export default Administrador;