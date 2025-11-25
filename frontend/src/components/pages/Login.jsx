import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { loginUser } from "../api/mockAuthApi";
import { getUserFromToken } from "../api/mockAuthApi";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);
      localStorage.setItem("token", response.token); // Guardar JWT

      const user = getUserFromToken(); // Decodificar token para obtener rol

      Swal.fire("Bienvenido!", "Sesión iniciada correctamente", "success");

      // Redirigir según rol
      if (user.role === "admin") {
        navigate("/administrador");
      } else {
        navigate("/usuario");
        console.log("Usuario no es admin, redirigir a página de usuario");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Email o contraseña incorrectos", "error");
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
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresá tu contraseña"
              {...register("password", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </Form.Group>

          <Button type="submit" variant="success" className="w-100 no-focus-outline">
            Ingresar
          </Button>
        </Form>

        <Button
          className="w-100 mt-3"
          variant="secondary"
          onClick={() => navigate("/register")}
        >
          ¿No tenés cuenta? Registrate
        </Button>
      </Card>
    </Container>
  );
}
