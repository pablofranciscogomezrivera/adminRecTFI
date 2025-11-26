import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio").min(2, "Mínimo 2 caracteres"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  position: Yup.string().required("El puesto es obligatorio"),
});

export const EmployeeForm = ({ initialValues, onSubmit, mode = "create" }) => {
  const defaultValues = { name: "", email: "", position: "" };
  const navigate=useNavigate();

  const handleSubmitt = ()=>{

navigate("/empleados/listar");

  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>{mode === "edit" ? "Editar empleado" : "Alta de empleado"}</h2>

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
            <div style={{ marginBottom: 12 }}>
              <label>Nombre</label><br />
              <Field name="name" placeholder="Nombre completo" />
              <div style={{ color: "red" }}><ErrorMessage name="name" /></div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Email</label><br />
              <Field name="email" type="email" placeholder="email@ejemplo.com" />
              <div style={{ color: "red" }}><ErrorMessage name="email" /></div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Puesto</label><br />
              <Field name="position" placeholder="Ej: Desarrollador" />
              <div style={{ color: "red" }}><ErrorMessage name="position" /></div>
            </div>

            <button type="submit" disabled={isSubmitting} onClick={handleSubmitt}>
              {isSubmitting ? "Enviando..." : (mode === "edit" ? "Guardar cambios" : "Crear empleado")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};