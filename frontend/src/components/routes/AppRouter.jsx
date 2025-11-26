import { Routes,Route } from "react-router"
import Configuracion from "../pages/Configuracion"
import Sectores from "../pages/configuraciones/Sectores"
import FormularioSector from "../pages/configuraciones/FormularioSector"
import Inicio from "../pages/Inicio"
import Administrador from "../pages/Administrador";
import { EmployeeCreate } from "../pages/AltaEmpleado"
import { EmployeeList } from "../pages/ListadoEmpleados"

export const AppRouter =()=>{
    
return(

<Routes>
<Route path="/" element={<Inicio></Inicio>} />
            <Route
              path="/administrador"
              element={<Administrador></Administrador>}
              />
            <Route path="/configuracion" element={<Configuracion></Configuracion>}/>
            <Route path="configuracion/sectores" element={<Sectores></Sectores>}/>
            <Route path="configuracion/crear" element={<FormularioSector></FormularioSector>}/>
            <Route path="empleados/alta" element={< EmployeeCreate/>} />
            <Route path="empleados/listar" element= {<EmployeeList />} />

</Routes>

)

}