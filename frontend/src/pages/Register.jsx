import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { registerUser } from "../utils/authAPI";
import { getEmpleados } from "../utils/empleadosAPI";
import "./Register.css";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState(true);

  const password = watch("password");

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      // Cargar empleados sin usuario asignado (esto es ideal, pero el backend actual retorna todos)
      const response = await getEmpleados({ itemsPorPagina: 100 });
      setEmpleados(response.datos || []);
    } catch (error) {
      console.error("Error cargando empleados:", error);
      Swal.fire("Error", "No se pudieron cargar los empleados", "error");
    } finally {
      setLoadingEmpleados(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      await registerUser(
        parseInt(data.empleadoId),
        data.email,
        data.password
      );

      await Swal.fire({
        title: "¡Registro Exitoso!",
        text: "Tu cuenta ha sido creada. Ya puedes iniciar sesión.",
        icon: "success",
        confirmButtonText: "Ir a Login"
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data || "Error al registrar usuario";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingEmpleados) {
    return (
      <div className="register-loading">
        <Spinner animation="border" />
        <p>Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div className="register-page">
      <Container className="register-container">
        <div className="register-content">
          {/* Left Side - Info */}
          <div className="register-info">
            <div className="register-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <h2>Sistema de Gestión</h2>
            </div>
            <h1 className="register-title">Crea tu cuenta</h1>
            <p className="register-description">
              Únete al sistema de gestión de recursos humanos más completo. 
              Selecciona tu perfil de empleado y completa el registro.
            </p>
            <div className="register-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Acceso completo al sistema</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Dashboard personalizado</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Gestión de empleados</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="register-form-wrapper">
            <Card className="register-card">
              <Card.Body>
                <div className="form-header">
                  <h3>Registro de Usuario</h3>
                  <p>Completa los datos para crear tu cuenta</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Selector de Empleado */}
                  <Form.Group className="mb-3">
                    <Form.Label>Empleado Asociado *</Form.Label>
                    <Form.Select
                      {...register("empleadoId", { 
                        required: "Debes seleccionar un empleado",
                        validate: value => value !== "" || "Debes seleccionar un empleado"
                      })}
                      isInvalid={!!errors.empleadoId}
                    >
                      <option value="">Selecciona tu perfil de empleado</option>
                      {empleados.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.nombre} {emp.apellido} - {emp.legajo} ({emp.rol?.nombre})
                        </option>
                      ))}
                    </Form.Select>
                    {errors.empleadoId && (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {errors.empleadoId.message}
                      </Form.Control.Feedback>
                    )}
                    <Form.Text className="text-muted">
                      Selecciona el empleado al que pertenece esta cuenta
                    </Form.Text>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu.email@empresa.com"
                      {...register("email", { 
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        }
                      })}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      {...register("password", { 
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres"
                        }
                      })}
                      isInvalid={!!errors.password}
                    />
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite tu contraseña"
                      {...register("confirmPassword", { 
                        required: "Debes confirmar la contraseña",
                        validate: value => value === password || "Las contraseñas no coinciden"
                      })}
                      isInvalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="btn-register w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        Crear Cuenta
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ms-2">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </Button>

                  {/* Link to Login */}
                  <div className="form-footer">
                    <p>
                      ¿Ya tienes cuenta?{" "}
                      <Link to="/login" className="link-login">
                        Inicia sesión aquí
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
