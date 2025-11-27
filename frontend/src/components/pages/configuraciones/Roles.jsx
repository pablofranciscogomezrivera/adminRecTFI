import { useEffect, useState } from "react";
import { Table, Button, Form, Container, Row, Col, Card, Modal } from "react-bootstrap"; 
import { useForm } from "react-hook-form"; 
import Swal from "sweetalert2";
import FormularioRoles from "./FormularioRoles";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  // 'mostrarFormulario' ahora controla la visibilidad del modal
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rolActual, setRolActual] = useState(null);

  useEffect(() => {
    // Simulación de GET /api/roles (HU 2)
    setRoles([
      { id: 'r1', nombre: "Gerente", descripcion: "Lidera equipos y toma decisiones estratégicas.", estaActivo: true },
      { id: 'r2', nombre: "Analista Jr.", descripcion: "Apoya en la recolección y análisis de datos.", estaActivo: true },
      { id: 'r3', nombre: "Supervisor", descripcion: "Monitorea la operación diaria y reporta al gerente.", estaActivo: false },
    ]);
  }, []);

  // Función de Creación
  const crearRol = (nuevoRol) => {
    const rolCompleto = {
      id: crypto.randomUUID(),
      nombre: nuevoRol.nombre,
      descripcion: nuevoRol.descripcion,
      estaActivo: true,
    };
    setRoles([...roles, rolCompleto]);
  };

  const editarRol = (idRol, rolEditar) => {
    const rolesEditados = roles.map((itemRol) => {
      if (itemRol.id === idRol) {
        return {
          ...itemRol,
          ...rolEditar,
        };
      }
      return itemRol;
    });

    setRoles(rolesEditados);
  };

  const desactivarRol = (idRol) => {
    const listaRoles = roles.map((itemRol) =>
      itemRol.id === idRol
        ? { ...itemRol, estaActivo: false }
        : itemRol
    );
    setRoles(listaRoles);
  };

  // SweetAlert2 para confirmar desactivación
  const confirmarDesactivar = (idRol) => {
    Swal.fire({
      title: "¿Desactivar Rol?",
      text: "Esta acción marcará el rol como inactivo (baja lógica).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarRol(idRol);
        Swal.fire(
          "Desactivado",
          "El rol fue desactivado correctamente.",
          "success"
        );
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
  
  // Función para cerrar el modal y limpiar el estado de edición
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setRolActual(null); 
  };


    return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h1>Gestión de Roles</h1>
            <Button
              variant="primary"
              onClick={handleAbrirCrear}
            >
              Crear Nuevo Rol
            </Button>
          </div>

          <Card className="shadow">
              <Card.Header as="h5" className="bg-light">Lista de Roles</Card.Header>
              <Card.Body>
                  <Table striped bordered hover responsive className="mt-2">
                      <thead>
                          {/* FIX: Eliminamos saltos de línea y espacios entre <tr> y <th> */}
                          <tr><th>#</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr>
                      </thead>
                      <tbody>
                          {roles.map((rol, index) => ( 
                              <tr key={rol.id}>
                                  {/* FIX: Colocamos el <td> de apertura inmediatamente después del <tr> y los <td> en líneas continuas. */}
                                  <td>{index + 1}</td> 
                                  <td>{rol.nombre}</td>
                                  <td>{rol.descripcion}</td>
                                  <td>
                                      <span className={`badge ${rol.estaActivo ? 'bg-success' : 'bg-danger'}`}>
                                          {rol.estaActivo ? "Activo" : "Inactivo"}
                                      </span>
                                  </td>
                                  <td>
                                      <div className="d-flex gap-2">
                                          <Button
                                              variant="info"
                                              size="sm"
                                              onClick={() => handleAbrirEditar(rol)}
                                          >
                                              Editar
                                          </Button>

                                          <Button
                                              variant="danger"
                                              size="sm"
                                              onClick={() => confirmarDesactivar(rol.id)}
                                              disabled={!rol.estaActivo}
                                          >
                                              Desactivar
                                          </Button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Modal de Creación/Edición */}
      <FormularioRoles          
        show={mostrarFormulario} // Controla si el modal es visible
        titulo={rolActual ? "Editar Rol" : "Crear Nuevo Rol"}
        rolActual={rolActual}
        crearRol={crearRol}
        editarRol={editarRol}
        cerrar={cerrarFormulario} // Función para cerrar el modal
      />

    </Container>
  );
};

export default Roles;