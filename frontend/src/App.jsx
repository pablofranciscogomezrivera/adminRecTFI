import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";


function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route
          path="/administrador"
          element={<Administrador></Administrador>}
        />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
export default App;
