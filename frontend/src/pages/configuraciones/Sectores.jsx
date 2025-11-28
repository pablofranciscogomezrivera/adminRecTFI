import { useEffect, useState } from "react";
import { Table, Button, Spinner, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import FormularioSector from "./FormularioSector";
import { getSectores, deleteSector, activateSector } from "../../utils/sectoresAPI";
import "./Configuraciones.css";

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
    // La creación se maneja en el modal, solo recargamos
    await cargarSectores();
  };

  const editarSector = async (idSector, sectorEditar) => {
    // La edición se maneja en el modal, solo recargamos
    await cargarSectores();
  };

  const desactivarSector = async (idSector) => {
    try {
      await deleteSector(idSector);
      await cargarSectores();
    } catch (error) {
      throw error;
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

  const confirmarActivar = (idSector) => {
    Swal.fire({
      title: "¿Activar sector?",
      text: "El sector volverá a estar disponible.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, activar",
      confirmButtonColor: "#28a745",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await activateSector(idSector);
          await cargarSectores(); // Recargar tabla
          Swal.fire("Activado", "El sector ha sido activado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo activar el sector", "error");
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
    setSectorActual(null); 
  };

  return (
    <div className="configuraciones-page">
      <Container className="configuraciones-container">
        <div className="configuraciones-header">
          <h1>📁 Administrar Sectores</h1>
          <Button className="btn-create" onClick={handleAbrirCrear}>
            ➕ Crear Sector
          </Button>
        </div>

        {loading ? (
          <div className="config-loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p>Cargando sectores...</p>
          </div>
        ) : (
          <Card className="configuraciones-card">
            <Card.Header>Lista de Sectores</Card.Header>
            <Card.Body>
              <Table responsive className="configuraciones-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Antigüedad Prom. (Años)</th> {/* Nueva Columna */}
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sectores.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No hay sectores registrados
                      </td>
                    </tr>
                  ) : (
                    sectores.map((sector, index) => (
                      <tr key={sector.id}>
                        <td><strong>{index + 1}</strong></td>
                        <td>{sector.nombre}</td>
                        <td>{sector.antiguedadPromedio || 0} años</td> {/* Dato calculado */}
                        <td>
                          <span className={`badge ${sector.estaActivo ? 'bg-success' : 'bg-danger'}`}>
                            {sector.estaActivo ? "✓ Activo" : "✗ Inactivo"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleAbrirEditar(sector)}
                            >
                              ✏️ Editar
                            </Button>
                            
                            {/* Lógica condicional para Activar/Desactivar */}
                            {sector.estaActivo ? (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => confirmarDesactivar(sector.id)}
                                >
                                  🗑️ Desactivar
                                </Button>
                            ) : (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => confirmarActivar(sector.id)}
                                >
                                  ✅ Activar
                                </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
        
        {/* Modal de Creación/Edición */}
        <FormularioSector
          show={mostrarFormulario}
          titulo={sectorActual ? "Editar Sector" : "Crear Nuevo Sector"}
          sectorActual={sectorActual}
          crearSector={crearSector}
          editarSector={editarSector}
          cerrar={cerrarFormulario}
        />
      </Container>
    </div>
  );
};

export default Sectores;