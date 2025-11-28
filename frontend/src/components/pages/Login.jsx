import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { loginUser } from "../../utils/authAPI";
import "./Login.css";

export default function Login({ setUsuarioLogueado }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await loginUser(data.email, data.password);
      const user = response.user;
      
      // Mapear el rol del backend al formato esperado por el frontend
      const userFormatted = {
        ...user,
        role: user.role === "Administrador" ? "admin" : "user"
      };
      
      setUsuarioLogueado(userFormatted);

      await Swal.fire({
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente",
        icon: "success",
        confirmButtonText: "Continuar"
      });

      if (userFormatted.role === "admin") navigate("/administrador");
      else navigate("/usuario");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data || "Email o contraseña incorrectos";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <div className="login-content">
          {/* Left Side - Info */}
          <div className="login-info">
            <div className="login-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
                </svg>
              </div>
              <h2>Sistema de Gestión</h2>
            </div>
            <h1 className="login-title">Bienvenido de vuelta</h1>
            <p className="login-description">
              Ingresa a tu cuenta para acceder al sistema de gestión de recursos humanos. 
              Administra empleados, genera reportes y más.
            </p>
            <div className="login-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Gestión de empleados completa</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Reportes en tiempo real</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Acceso seguro y protegido</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="login-form-wrapper">
            <Card className="login-card">
              <Card.Body>
                <div className="form-header">
                  <h3>Iniciar Sesión</h3>
                  <p>Ingresa tus credenciales para continuar</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      {...register("password", { 
                        required: "La contraseña es obligatoria"
                      })}
                      isInvalid={!!errors.password}
                    />
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="btn-login w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Ingresando...
                      </>
                    ) : (
                      <>
                        Ingresar
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ms-2">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </Button>

                  {/* Link to Register */}
                  <div className="form-footer">
                    <p>
                      ¿No tienes cuenta?{" "}
                      <Link to="/register" className="link-register">
                        Regístrate aquí
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
