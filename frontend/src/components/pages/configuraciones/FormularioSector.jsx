import {Button, Form, Modal} from "react-bootstrap";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const FormularioSector = ({ titulo, crearSector, editarSector, sectorActual, cerrar, show }) => {
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


  const onSubmit = (data) => {
    // 👉 MODO CREAR: Añadir a la tabla, confirmar y volver a la lista
    if (!sectorActual) { 
      crearSector(data); // 1. Ejecutar la acción de creación

      Swal.fire({ // 2. Mostrar la confirmación del SweetAlert
        title: "Sector Creado",
        text: `El sector '${data.nombre}' fue creado y agregado correctamente.`,
        icon: "success",
        confirmButtonText: "Genial",
      }).then(() => {
        cerrar(); // 3. Volver a la pantalla de Sectores (cerrar formulario/modal)
      });
      return;
    }

    // 👉 MODO EDITAR: Actualizar, confirmar y volver a la lista
    if (sectorActual) {
      editarSector(sectorActual.id, data);

      Swal.fire({
        title: "Sector Actualizado",
        text: `El sector '${data.nombre}' fue actualizado correctamente.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        cerrar(); // 3. Volver a la pantalla de Sectores (cerrar formulario/modal)
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
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
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

export default FormularioSector;
