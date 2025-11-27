import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useSupervisores } from "../hooks/useSupervisor";

const EmployeeSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio").min(2, "Mínimo 2 caracteres"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  rol: Yup.string().required("El puesto es obligatorio"),
});

export const EmployeeForm = ({ initialValues, roles, niveles, sectores,onSubmit, mode }) => {
  const defaultValues = { nombre: "",apellido:"",dni_legajo:"",fecha_ingreso:"",
           email: "", sueldo: "",sector:"",rol:"",nivel_estudio:"" };
          
          const { supervisores, loading } = useSupervisores();
          console.log(supervisores);
          if (loading) return <p>Cargando supervisores...</p>; 
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
              <Field name="nombre" placeholder="Nombre" />
              <div style={{ color: "red" }}><ErrorMessage name="nombre" /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Apellido</label><br />
              <Field name="apellido" placeholder="Ej: Apellido" />
              <div style={{ color: "red" }}><ErrorMessage name="apellido" /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>DNI-Legajo</label><br />
              <Field name="dni_legajo" placeholder="Ej: DNI-Legajo" />
              <div style={{ color: "red" }}><ErrorMessage name="dni_legajo" /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Fecha de ingreso</label><br />
              <Field name="fecha_ingreso" placeholder="Ej: yyyy-mm-dd" />
              <div style={{ color: "red" }}><ErrorMessage name="fecha_ingreso" /></div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Email</label><br />
              <Field name="email" type="email" placeholder="email@ejemplo.com" />
              <div style={{ color: "red" }}><ErrorMessage name="email" /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Sueldo</label><br />
              <Field name="sueldo"  placeholder="sueldo" />
              <div style={{ color: "red" }}><ErrorMessage name="sueldo" /></div>
            </div>

           {/* Rol (select) */}
        <div>
          <label>Rol</label>
          <Field as="select" name="rol">
            <option value="">Seleccione rol</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.descripcion}
              </option>
            ))}
          </Field>
          <ErrorMessage name="rol" component="div" style={{ color: "red" }} />
        </div>

        {/* Nivel de estudio (select) */}
        <div>
          <label>Nivel de Estudio</label>
          <Field as="select" name="nivel_estudio">
            <option value="">Seleccione nivel</option>
            {niveles.map((n) => (
              <option key={n.id} value={n.id}>
                {n.descripcion}
              </option>
            ))}
          </Field>
          <ErrorMessage name="nivel_estudio" component="div" style={{ color: "red" }} />
        </div>

        {/* Sector (select) */}
        <div>
          <label>Sector</label>
          <Field as="select" name="sector">
            <option value="">Seleccione sector</option>
            {sectores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.descripcion}
              </option>
            ))}
          </Field>
          <ErrorMessage name="sector" component="div" style={{ color: "red" }} />
        </div>


        <div>
              <label>Supervisor Directo</label>
              <Field as="select" name="supervisorId">
                <option value="">-- Seleccionar Supervisor --</option>

                {supervisores.map(sup => (
                  <option key={sup.id} value={sup.id}>
                    {sup.nombre} - {sup.rol}
                  </option>
                ))}
              </Field>

              <ErrorMessage name="supervisorId" component="div" />
            </div>




            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : (mode === "edit" ? "Guardar cambios" : "Crear empleado")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};