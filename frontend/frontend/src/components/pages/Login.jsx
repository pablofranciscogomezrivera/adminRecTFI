import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { loginUser } from "../../utils/authAPI";

export default function Login({ setUsuarioLogueado }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);
      const user = response.user;
      
      // Mapear el rol del backend al formato esperado por el frontend
      const userFormatted = {
        ...user,
        role: user.role === "Administrador" ? "admin" : "user"
      };
      
      setUsuarioLogueado(userFormatted);

      Swal.fire("Bienvenido!", "Sesión iniciada correctamente", "success");

      if (userFormatted.role === "admin") navigate("/administrador");
      else navigate("/usuario");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data || "Email o contraseña incorrectos";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <h3 className="text-center mb-3">Iniciar Sesión</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresá tu email"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresá tu contraseña"
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 no-focus-outline">
            Ingresar
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            ¿No tienes cuenta?{" "}
            <Link to="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
}
