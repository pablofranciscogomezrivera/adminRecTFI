import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import FormularioSector from "./FormularioSector";
import { getSectores, deleteSector } from "../../utils/sectoresAPI";

const Sectores = () => {
  const [sectores, setSectores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sectorActual, setSectorActual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSectores();
  }, []);

  const cargarSectores = async () => {
    try {
      setLoading(true);
      const data = await getSectores();
      setSectores(data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los sectores", "error");
    } finally {
      setLoading(false);
    }
  };

  const crearSector = async (nuevoSector) => {
    // La creación ahora se maneja en FormularioSector
    // Solo recargamos la lista
    await cargarSectores();
  };

  const editarSector = async (idSector, sectorEditar) => {
    // La edición ahora se maneja en FormularioSector
    // Solo recargamos la lista
    await cargarSectores();
  };

  const desactivarSector = async (idSector) => {
    try {
      await deleteSector(idSector);
      await cargarSectores();
    } catch (error) {
      throw error; // Para que lo maneje confirmarDesactivar
    }
  };

  const confirmarDesactivar = (idSector) => {
    Swal.fire({
      title: "¿Desactivar sector?",
      text: "Esta acción marcará el sector como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await desactivarSector(idSector);
          Swal.fire(
            "Desactivado",
            "El sector fue desactivado correctamente.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data || "No se pudo desactivar el sector",
            "error"
          );
        }
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

      {loading ? (
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
                <td colSpan="4" className="text-center">No hay sectores registrados</td>
              </tr>
            ) : (
              sectores.map((sector, index) => (
                <tr key={sector.id}>
                  <td>{index + 1}</td>
                  <td>{sector.nombre}</td>
                  <td>
                    <span className={`badge ${sector.estaActivo ? 'bg-success' : 'bg-danger'}`}>
                      {sector.estaActivo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
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
