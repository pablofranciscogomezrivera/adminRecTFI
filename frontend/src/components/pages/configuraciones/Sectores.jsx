import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import FormularioSector from "./FormularioSector";
import { sectoresApi } from "../../../services/api";

const Sectores = () => {
  const [sectores, setSectores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sectorActual, setSectorActual] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarSectores();
  }, []);

  const cargarSectores = async () => {
    setCargando(true);
    try {
      const data = await sectoresApi.getAll();
      setSectores(data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudieron cargar los sectores.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setCargando(false);
    }
  };

  const crearSector = async (nuevoSector) => {
    const sectorCreado = await sectoresApi.create(nuevoSector);
    // Recargar la lista de sectores después de crear
    await cargarSectores();
    return sectorCreado;
  };

  const editarSector = async (idSector, sectorEditar) => {
    await sectoresApi.update(idSector, sectorEditar);
    // Recargar la lista de sectores después de editar
    await cargarSectores();
  };

  const desactivarSector = async (idSector) => {
    try {
      await sectoresApi.delete(idSector);
      // Recargar la lista de sectores después de desactivar
      await cargarSectores();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo desactivar el sector.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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

      {cargando ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sectores.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay sectores disponibles
                </td>
              </tr>
            ) : (
              sectores.map((sector, index) => (
                <tr key={sector.id}>
                  <td>{index + 1}</td>
                  <td>{sector.nombre}</td>
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
              ))
            )}
          </tbody>
        </Table>
      )}
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