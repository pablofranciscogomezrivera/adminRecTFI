import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import FormularioSector from "./FormularioSector";

const Sectores = () => {
  const [sectores, setSectores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sectorActual, setSectorActual] = useState(null);

  useEffect(() => {
    // Simulación de GET /api/sectores
    setSectores([
      { id: 1, nombre: "Contabilidad", descripcion: "Para el area de contabilidad", estaActivo: true },
      { id: 2, nombre: "RRHH",  descripcion: "Para el area de contabilidad",estaActivo: true },
      { id: 3, nombre: "Sistemas",  descripcion: "Para el area de contabilidad",estaActivo: false },
    ]);
  }, []);

  const crearSector = (nuevoSector) => {
    nuevoSector.id = crypto.randomUUID();
    nuevoSector.estaActivo = true;
    setSectores([...sectores, nuevoSector]);
  };

  const editarSector = (idSector, sectorEditar) => {
    const sectoresEditados = sectores.map((itemSector) => {
      if (itemSector.id === idSector) {
        return {
          ...itemSector,
          ...sectorEditar,
        };
      }
      return itemSector;
    });

    // corregido: antes estaba setServicios()
    setSectores(sectoresEditados);
  };

  const desactivarSector = (idSector) => {
    const listaSectores = sectores.map((itemSector) =>
      itemSector.id === idSector
        ? { ...itemSector, estaActivo: false }
        : itemSector
    );
    setSectores(listaSectores);
  };

  // 👉 SweetAlert2 para confirmar desactivación
  const confirmarDesactivar = (idSector) => {
    Swal.fire({
      title: "¿Desactivar sector?",
      text: "Esta acción marcará el sector como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarSector(idSector);
        Swal.fire(
          "Desactivado",
          "El sector fue desactivado correctamente.",
          "success"
        );
      }
    });
  };
  const handleAbrirCrear = () => {
    setSectorActual(null); // Modo Creación
    setMostrarFormulario(true);
  };

  const handleAbrirEditar = (sector) => {
    setSectorActual(sector); // Modo Edición
    setMostrarFormulario(true);
  };
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setSectorActual(null); // Siempre limpiar el sector actual al cerrar
  };

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar Sectores</h1>
        <Button variant="primary" onClick={handleAbrirCrear}>
          Crear Sector
        </Button>
      </div>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sectores.map((sector,index) => (
            <tr key={sector.id}>
              <td>{index + 1}</td>
              <td>{sector.nombre}</td>
              <th>{sector.descripcion}</th>
              <td>{sector.estaActivo ? "Activo" : "Inactivo"}</td>
              <td className="d-flex gap-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleAbrirEditar(sector)}
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmarDesactivar(sector.id)}
                  disabled={!sector.estaActivo}
                >
                  Desactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal de Creación/Edición */}
      <FormularioSector
        show={mostrarFormulario} // Controla si el modal es visible
        titulo={sectorActual ? "Editar Sector" : "Crear Nuevo Sector"}
        sectorActual={sectorActual}
        crearSector={crearSector}
        editarSector={editarSector}
        cerrar={cerrarFormulario} // Función para cerrar el modal
      />
    </main>
  );
};

export default Sectores;
