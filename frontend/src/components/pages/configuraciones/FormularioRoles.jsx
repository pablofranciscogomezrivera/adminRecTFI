import {Button, Form, Modal} from "react-bootstrap";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";

const FormularioRol = ({ titulo, crearRol, editarRol, rolActual, cerrar, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: rolActual ? rolActual.nombre : "",
      descripcion: rolActual ? rolActual.descripcion : "", // Nuevo campo: descripción
    }
  });

  // Resetea los valores del formulario cada vez que el modal se abre o cambia el rol actual
  useEffect(() => {
    reset({
      nombre: rolActual ? rolActual.nombre : "",
      descripcion: rolActual ? rolActual.descripcion : "",
    });
  }, [rolActual, show, reset]);


  const onSubmit = (data) => {
    // 👉 MODO CREAR: Añadir a la tabla, confirmar y volver a la lista
    if (!rolActual) { 
      crearRol(data); // 1. Ejecutar la acción de creación

      Swal.fire({ // 2. Mostrar la confirmación del SweetAlert
        title: "Rol Creado",
        text: `El rol '${data.nombre}' fue creado y agregado correctamente.`,
        icon: "success",
        confirmButtonText: "Genial",
      }).then(() => {
        cerrar(); // 3. Volver a la pantalla de Roles (cerrar formulario/modal)
      });
      return;
    }

    // 👉 MODO EDITAR: Actualizar, confirmar y volver a la lista
    if (rolActual) {
      editarRol(rolActual.id, data);

      Swal.fire({
        title: "Rol Actualizado",
        text: `El rol '${data.nombre}' fue actualizado correctamente.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        cerrar(); // 3. Volver a la pantalla de Roles (cerrar formulario/modal)
      });
    }
  };

  return (
    <Modal show={show} onHide={cerrar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* NOMBRE DEL ROL (REQUERIDO) */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Rol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Gerente de Ventas"
              isInvalid={!!errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Debe tener como máximo 50 caracteres",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* DESCRIPCIÓN DEL ROL (OPCIONAL) */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción detallada del rol..."
              isInvalid={!!errors.descripcion}
              {...register("descripcion", {
                maxLength: {
                  value: 200,
                  message: "La descripción no puede exceder los 200 caracteres",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrar}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          // Hacemos que el botón "Guardar" del footer dispare el submit del formulario
          onClick={handleSubmit(onSubmit)}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default FormularioRol;