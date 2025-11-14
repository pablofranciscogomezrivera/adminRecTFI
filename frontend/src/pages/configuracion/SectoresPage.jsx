import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  Alert,
  Card,
} from "react-bootstrap";

import {
  BsPencil,
  BsToggleOff,
  BsToggleOn,
  BsPlusCircle,
} from "react-icons/bs";

// Datos MOCK simulando la BD
const MOCK_SECTORES = [
  { id: 1, nombre: "Recursos Humanos", activo: true },
  { id: 2, nombre: "Contabilidad", activo: true },
  { id: 3, nombre: "Desarrollo de Software", activo: false },
  { id: 4, nombre: "Ventas", activo: true },
];

function SectoresPage() {
  const [sectores, setSectores] = useState(MOCK_SECTORES);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentSector, setCurrentSector] = useState(null);
  const [sectorName, setSectorName] = useState("");
  const [nameError, setNameError] = useState("");

  // Abrir modal creación
  const handleShowCreate = () => {
    setCurrentSector(null);
    setSectorName("");
    setNameError("");
    setShowModal(true);
  };

  // Abrir modal edición
  const handleShowEdit = (sector) => {
    setCurrentSector(sector);
    setSectorName(sector.nombre);
    setNameError("");
    setShowModal(true);
  };

  // Guardar / Crear / Editar
  const handleSaveSector = (event) => {
    event.preventDefault();

    if (!sectorName.trim()) {
      setNameError("El nombre del sector es obligatorio.");
      return;
    }

    const isDuplicate = sectores.some(
      (s) =>
        s.nombre.trim().toLowerCase() === sectorName.trim().toLowerCase() &&
        s.id !== (currentSector ? currentSector.id : null)
    );
    if (isDuplicate) {
      setNameError("Ya existe un sector con este nombre.");
      return;
    }

    setNameError("");

    if (currentSector) {
      // Actualización
      setSectores(
        sectores.map((s) =>
          s.id === currentSector.id ? { ...s, nombre: sectorName.trim() } : s
        )
      );
    } else {
      // Creación
      const newSector = {
        id: Date.now(),
        nombre: sectorName.trim(),
        activo: true,
      };
      setSectores([...sectores, newSector]);
    }

    setShowModal(false);
  };

  // Abrir modal de confirmación activar/desactivar
  const handleShowConfirm = (sector) => {
    setCurrentSector(sector);
    setShowConfirm(true);
  };

  // Ejecutar activar/desactivar
  const handleToggleActive = () => {
    setSectores(
      sectores.map((s) =>
        s.id === currentSector.id ? { ...s, activo: !s.activo } : s
      )
    );
    setShowConfirm(false);
    setCurrentSector(null);
  };

  return (
    <Container fluid className="p-4">
      {/* TÍTULO Y BOTÓN NUEVO */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Gestión de Sectores
          </h2>

          <Button
            variant="primary"
            onClick={handleShowCreate}
            className="d-flex align-items-center px-3 py-2 shadow-sm"
          >
            <BsPlusCircle size={18} className="me-2" />
            Nuevo Sector
          </Button>
        </Col>
      </Row>

      {/* CARD CONTENEDORA */}
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white fw-bold">
          Sectores Registrados
        </Card.Header>
        <Table hover striped bordered className="align-middle">
          <thead className="table">
            <tr>
              <th>Nombre</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sectores.map((sector) => (
              <tr key={sector.id}>
                <td>{sector.nombre}</td>

                <td className="text-center">
                  <Badge bg={sector.activo ? "success" : "secondary"} pill>
                    {sector.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </td>

                <td className="text-center">
                  {/* Botón Editar */}
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-2 d-flex align-items-center"
                      onClick={() => handleShowEdit(sector)}
                    >
                      <BsPencil size={16} className="me-1" />
                      Editar
                    </Button>

                    {/* Botón Activar/Desactivar */}
                    <Button
                      variant={
                        sector.activo ? "outline-danger" : "outline-success"
                      }
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => handleShowConfirm(sector)}
                    >
                      {sector.activo ? (
                        <BsToggleOff size={16} />
                      ) : (
                        <BsToggleOn size={16} />
                      )}
                      <span className="ms-1">
                        {sector.activo ? "Desactivar" : "Activar"}
                      </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* MODAL CREAR / EDITAR */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {currentSector ? "Editar Sector" : "Crear Nuevo Sector"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSaveSector}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Sector</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Contabilidad"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
                isInvalid={!!nameError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {currentSector ? "Guardar Cambios" : "Crear Sector"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL CONFIRMACIÓN ACTIVAR/DESACTIVAR */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmar {currentSector?.activo ? "Desactivación" : "Activación"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert variant={currentSector?.activo ? "danger" : "success"}>
            {currentSector?.activo
              ? `¿Está seguro que desea desactivar el sector "${currentSector?.nombre}"?`
              : `¿Está seguro que desea reactivar el sector "${currentSector?.nombre}"?`}
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button
            variant={currentSector?.activo ? "danger" : "success"}
            onClick={handleToggleActive}
          >
            {currentSector?.activo ? "Sí, Desactivar" : "Sí, Activar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SectoresPage;
