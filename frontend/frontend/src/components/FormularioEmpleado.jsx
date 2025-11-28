import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useSupervisores } from "../hooks/useSupervisor";
import { Container, Row, Col, Button as BsButton, Card } from "react-bootstrap";

const EmployeeSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio").min(2, "Mínimo 2 caracteres"),
  apellido: Yup.string().required("El apellido es obligatorio").min(2, "Mínimo 2 caracteres"),
  dni: Yup.string().required("El DNI es obligatorio"),
  legajo: Yup.string().required("El legajo es obligatorio"),
  fechaIngreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  sueldo: Yup.number().required("El sueldo es obligatorio").positive("El sueldo debe ser positivo"),
  sectorId: Yup.number().required("El sector es obligatorio"),
  rolId: Yup.number().required("El rol es obligatorio"),
});

export const EmployeeForm = ({ initialValues, roles, niveles, sectores, onSubmit, mode }) => {
  const defaultValues = {
    nombre: "",
    apellido: "",
    dni: "",
    legajo: "",
    fechaIngreso: "",
    email: "",
    telefono: "",
    sueldo: "",
    sectorId: "",
    rolId: "",
    nivelEstudioId: "",
    supervisorId: "",
  };

  const { supervisores, loading } = useSupervisores();
  
  if (loading) return <p>Cargando supervisores...</p>; 
  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <h2>{mode === "edit" ? "Editar empleado" : "Alta de empleado"}</h2>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues || defaultValues}
            enableReinitialize={true}
            validationSchema={EmployeeSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await onSubmit(values);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Nombre *</label>
                      <Field name="nombre" className="form-control" placeholder="Nombre" />
                      <div className="text-danger"><ErrorMessage name="nombre" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Apellido *</label>
                      <Field name="apellido" className="form-control" placeholder="Apellido" />
                      <div className="text-danger"><ErrorMessage name="apellido" /></div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">DNI *</label>
                      <Field name="dni" className="form-control" placeholder="DNI" />
                      <div className="text-danger"><ErrorMessage name="dni" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Legajo *</label>
                      <Field name="legajo" className="form-control" placeholder="Legajo" />
                      <div className="text-danger"><ErrorMessage name="legajo" /></div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Fecha de Ingreso *</label>
                      <Field name="fechaIngreso" type="date" className="form-control" />
                      <div className="text-danger"><ErrorMessage name="fechaIngreso" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <Field name="telefono" className="form-control" placeholder="Teléfono" />
                      <div className="text-danger"><ErrorMessage name="telefono" /></div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <Field name="email" type="email" className="form-control" placeholder="email@ejemplo.com" />
                      <div className="text-danger"><ErrorMessage name="email" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sueldo *</label>
                      <Field name="sueldo" type="number" className="form-control" placeholder="Sueldo" />
                      <div className="text-danger"><ErrorMessage name="sueldo" /></div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Sector *</label>
                      <Field as="select" name="sectorId" className="form-select">
                        <option value="">Seleccione sector</option>
                        {sectores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.nombre}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger"><ErrorMessage name="sectorId" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Rol *</label>
                      <Field as="select" name="rolId" className="form-select">
                        <option value="">Seleccione rol</option>
                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.nombre}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger"><ErrorMessage name="rolId" /></div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Nivel de Estudio</label>
                      <Field as="select" name="nivelEstudioId" className="form-select">
                        <option value="">Seleccione nivel</option>
                        {niveles.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.nombre}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger"><ErrorMessage name="nivelEstudioId" /></div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="form-label">Supervisor Directo</label>
                      <Field as="select" name="supervisorId" className="form-select">
                        <option value="">-- Sin Supervisor --</option>
                        {supervisores.map(sup => (
                          <option key={sup.id} value={sup.id}>
                            {sup.nombre} {sup.apellido} - {sup.rol?.nombre}
                          </option>
                        ))}
                      </Field>
                      <div className="text-danger"><ErrorMessage name="supervisorId" /></div>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <BsButton variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : (mode === "edit" ? "Guardar cambios" : "Crear empleado")}
                  </BsButton>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};