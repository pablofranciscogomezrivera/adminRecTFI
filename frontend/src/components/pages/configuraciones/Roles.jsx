import { useEffect, useState } from "react";
import { Table, Button, Container, Card, Spinner } from "react-bootstrap"; 
import Swal from "sweetalert2";
import FormularioRoles from "./FormularioRoles";
import { getRoles, deleteRole, activateRole } from "../../../utils/rolesAPI";
import "../../../pages/configuraciones/Configuraciones.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rolActual, setRolActual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los roles", "error");
    } finally {
      setLoading(false);
    }
  };

  const crearRol = async (nuevoRol) => {
    await cargarRoles();
  };

  const editarRol = async (idRol, rolEditar) => {
    await cargarRoles();
  };

  const desactivarRol = async (idRol) => {
    try {
      await deleteRole(idRol);
      await cargarRoles();
    } catch (error) {
      throw error;
    }
  };

  const confirmarDesactivar = (idRol) => {
    Swal.fire({
      title: "¿Desactivar Rol?",
      text: "Esta acción marcará el rol como inactivo (baja lógica).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await desactivarRol(idRol);
          Swal.fire(
            "Desactivado",
            "El rol fue desactivado correctamente.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data || "No se pudo desactivar el rol",
            "error"
          );
        }
      }
    });
  };

  const confirmarActivar = (idRol) => {
    Swal.fire({
      title: "¿Activar Rol?",
      text: "El rol volverá a estar disponible.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, activar",
      confirmButtonColor: "#28a745",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await activateRole(idRol);
          await cargarRoles();
          Swal.fire("Activado", "El rol ha sido activado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo activar el rol", "error");
        }
      }
    });
  };

  const handleAbrirCrear = () => {
    setRolActual(null); // Modo Creación
    setMostrarFormulario(true);
  }

  const handleAbrirEditar = (rol) => {
    setRolActual(rol); // Modo Edición
    setMostrarFormulario(true);
  }
  
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setRolActual(null); 
  };

  return (
    <div className="configuraciones-page">
      <Container className="configuraciones-container">
        <div className="configuraciones-header">
          <h1>👥 Gestión de Roles</h1>
          <Button className="btn-create" onClick={handleAbrirCrear}>
            ➕ Crear Rol
          </Button>
        </div>

        {loading ? (
          <div className="config-loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p>Cargando roles...</p>
          </div>
        ) : (
          <Card className="configuraciones-card">
            <Card.Header>Lista de Roles</Card.Header>
            <Card.Body>
              <Table responsive className="configuraciones-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No hay roles registrados
                      </td>
                    </tr>
                  ) : (
                    roles.map((rol, index) => ( 
                      <tr key={rol.id}>
                        <td><strong>{index + 1}</strong></td> 
                        <td>{rol.nombre}</td>
                        <td>{rol.descripcion || "Sin descripción"}</td>
                        <td>
                          <span className={`badge ${rol.estaActivo ? 'bg-success' : 'bg-danger'}`}>
                            {rol.estaActivo ? "✓ Activo" : "✗ Inactivo"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleAbrirEditar(rol)}
                            >
                              ✏️ Editar
                            </Button>

                            {rol.estaActivo ? (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => confirmarDesactivar(rol.id)}
                                >
                                    🗑️ Desactivar
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => confirmarActivar(rol.id)}
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
        
        <FormularioRoles          
          show={mostrarFormulario}
          titulo={rolActual ? "Editar Rol" : "Crear Nuevo Rol"}
          rolActual={rolActual}
          crearRol={crearRol}
          editarRol={editarRol}
          cerrar={cerrarFormulario}
        />
      </Container>
    </div>
  );
};

export default Roles;