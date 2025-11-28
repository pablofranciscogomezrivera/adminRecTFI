import {Button, Form, Modal} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { createRole, updateRole } from "../../../utils/rolesAPI";

const FormularioRol = ({ titulo, crearRol, editarRol, rolActual, cerrar, show }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: rolActual ? rolActual.nombre : "",
      descripcion: rolActual ? rolActual.descripcion : "",
    }
  });

  useEffect(() => {
    reset({
      nombre: rolActual ? rolActual.nombre : "",
      descripcion: rolActual ? rolActual.descripcion : "",
    });
  }, [rolActual, show, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // MODO CREAR
      if (!rolActual) {
        await createRole(data);
        
        await Swal.fire({
          title: "Rol Creado",
          text: `El rol '${data.nombre}' fue creado correctamente.`,
          icon: "success",
          confirmButtonText: "Genial",
        });
        
        await crearRol(data);
        cerrar();
        return;
      }

      // MODO EDITAR
      if (rolActual) {
        await updateRole(rolActual.id, data);

        await Swal.fire({
          title: "Rol Actualizado",
          text: `El rol '${data.nombre}' fue actualizado correctamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        
        await editarRol(rolActual.id, data);
        cerrar();
      }
    } catch (error) {
      console.error("Error guardando rol:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data || "No se pudo guardar el rol",
        icon: "error",
      });
    } finally {
      setLoading(false);
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
        <Button variant="secondary" onClick={cerrar} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default FormularioRol;