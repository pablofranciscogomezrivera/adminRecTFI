import React, { useState } from 'react';
import { 
  Container, Row, Col, Button, Table, 
  Badge, Modal, Form, Alert 
} from 'react-bootstrap';
// Asegúrate de que react-icons esté instalado: npm install react-icons
import { BsPencil, BsToggleOff, BsToggleOn, BsPlusCircle } from 'react-icons/bs';

// Datos de MOCK para simular la base de datos (se inicializa con algunos datos)
const MOCK_SECTORES = [
  { id: 1, nombre: 'Recursos Humanos', activo: true },
  { id: 2, nombre: 'Contabilidad', activo: true },
  { id: 3, nombre: 'Desarrollo de Software', activo: false },
  { id: 4, nombre: 'Ventas', activo: true },
];

function SectoresPage() {
  // --- Estados de la Aplicación ---
  const [sectores, setSectores] = useState(MOCK_SECTORES);
  const [showModal, setShowModal] = useState(false);        // Controla el Modal de Formulario
  const [showConfirm, setShowConfirm] = useState(false);    // Controla el Modal de Confirmación (Act/Desact)
  const [currentSector, setCurrentSector] = useState(null); // Sector seleccionado para editar/desactivar
  const [sectorName, setSectorName] = useState('');         // Campo del formulario
  const [nameError, setNameError] = useState('');           // Mensaje de error de validación
  
  // --- Manejo del Formulario (Abrir) ---
  
  const handleShowCreate = () => {
    setCurrentSector(null);
    setSectorName('');
    setNameError('');
    setShowModal(true);
  };

  const handleShowEdit = (sector) => {
    setCurrentSector(sector);
    setSectorName(sector.nombre);
    setNameError('');
    setShowModal(true);
  };

  // --- Manejo del Formulario (Guardar/Crear/Editar) ---
  
  const handleSaveSector = (event) => {
    event.preventDefault();

    // Criterio de Aceptación: Validación de Nombre (requerido)
    if (!sectorName.trim()) {
      setNameError('El nombre del sector es obligatorio.');
      return;
    }
    
    // Validaciones Adicionales: (Opcional) Nombre duplicado?
    const isDuplicate = sectores.some(s => 
        s.nombre.trim().toLowerCase() === sectorName.trim().toLowerCase() && 
        s.id !== (currentSector ? currentSector.id : null)
    );
    if (isDuplicate) {
        setNameError('Ya existe un sector con este nombre.');
        return;
    }
    
    setNameError('');

    if (currentSector) {
      // Edición
      setSectores(sectores.map(s => 
        s.id === currentSector.id ? { ...s, nombre: sectorName.trim() } : s
      ));
    } else {
      // Creación
      const newSector = {
        id: Date.now(), // ID temporal (reemplazar por ID del backend)
        nombre: sectorName.trim(),
        activo: true,
      };
      setSectores([...sectores, newSector]);
    }

    setShowModal(false);
  };

  // --- Manejo de Desactivación/Activación (Modal de Confirmación) ---

  const handleShowConfirm = (sector) => {
    setCurrentSector(sector);
    setShowConfirm(true);
  };

  const handleToggleActive = () => {
    // Cambia el estado 'activo' del sector seleccionado
    setSectores(sectores.map(s => 
      s.id === currentSector.id ? { ...s, activo: !s.activo } : s
    ));
    setShowConfirm(false);
    setCurrentSector(null);
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Gestión de Sectores</h2>
      
      {/* Criterio de Aceptación: Botón "Nuevo Sector" */}
      <Row className="mb-3">
        <Col>
          <Button 
            variant="primary" 
            onClick={handleShowCreate}
            className="d-flex align-items-center"
          >
            <BsPlusCircle className="me-2" />
            Nuevo Sector
          </Button>
        </Col>
      </Row>

      {/* Criterio de Aceptación: Tabla de Sectores */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
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
                <Badge bg={sector.activo ? 'success' : 'secondary'}>
                  {/* Criterio de Aceptación: Mostrar estado */}
                  {sector.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="text-center">
                {/* Criterio de Aceptación: Botón de Editar */}
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleShowEdit(sector)}
                >
                  <BsPencil /> Editar
                </Button>
                
                {/* Criterio de Aceptación: Botón de Desactivar/Activar */}
                <Button 
                  variant={sector.activo ? 'outline-danger' : 'outline-success'} 
                  size="sm"
                  onClick={() => handleShowConfirm(sector)}
                >
                  {sector.activo ? <BsToggleOff /> : <BsToggleOn />}
                  {sector.activo ? ' Desactivar' : ' Activar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Criterio de Aceptación: MODAL DE FORMULARIO (CREAR/EDITAR) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentSector ? 'Editar Sector' : 'Crear Nuevo Sector'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveSector}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="sectorName">
              <Form.Label>Nombre del Sector</Form.Label>
              {/* Criterio de Aceptación: Campo "Nombre" (requerido, validado) */}
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
              {currentSector ? 'Guardar Cambios' : 'Crear Sector'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Criterio de Aceptación: MODAL DE CONFIRMACIÓN (DESACTIVAR/ACTIVAR) */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar {currentSector?.activo ? 'Desactivación' : 'Activación'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={currentSector?.activo ? 'danger' : 'success'}>
            {currentSector?.activo 
              ? `¿Está seguro que desea desactivar el sector "${currentSector?.nombre}"? Esto lo ocultará del sistema de asignación.`
              : `¿Está seguro que desea reactivar el sector "${currentSector?.nombre}"?`}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button 
            variant={currentSector?.activo ? 'danger' : 'success'} 
            onClick={handleToggleActive}
          >
            {currentSector?.activo ? 'Sí, Desactivar' : 'Sí, Activar'}
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default SectoresPage;