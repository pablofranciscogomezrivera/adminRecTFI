import {Button, Form, Modal} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { createSector, updateSector } from "../../utils/sectoresAPI";

const FormularioSector = ({ titulo, crearSector, editarSector, sectorActual, cerrar, show }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: sectorActual ? sectorActual.nombre : ""
    }
  });

  // Resetea los valores del formulario cada vez que el modal se abre o cambia el sector actual
  useEffect(() => {
    reset({
      nombre: sectorActual ? sectorActual.nombre : ""
    });
  }, [sectorActual, show, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // MODO CREAR
      if (!sectorActual) {
        await createSector(data);
        
        await Swal.fire({
          title: "Sector Creado",
          text: `El sector '${data.nombre}' fue creado correctamente.`,
          icon: "success",
          confirmButtonText: "Genial",
        });
        
        await crearSector(data); // Recargar la lista
        cerrar();
        return;
      }

      // MODO EDITAR
      if (sectorActual) {
        await updateSector(sectorActual.id, data);

        await Swal.fire({
          title: "Sector Actualizado",
          text: `El sector '${data.nombre}' fue actualizado correctamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        
        await editarSector(sectorActual.id, data); // Recargar la lista
        cerrar();
      }
    } catch (error) {
      console.error("Error guardando sector:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data || "No se pudo guardar el sector",
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
          {/* NOMBRE DEL SECTOR */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del sector</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Contabilidad"
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
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              isInvalid={!!errors.nombre}
              {...register("descripcion", {
                required: "La Descripcion es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "Debe tener como máximo 100 caracteres",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
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

export default FormularioSector;
