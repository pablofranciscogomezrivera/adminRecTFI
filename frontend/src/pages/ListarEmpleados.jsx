import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Container, Row, Col, Table, Button, Form, InputGroup, Card, Spinner, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { getEmpleados, desvincularEmpleado } from "../utils/empleadosAPI";
import { getSectores } from "../utils/sectoresAPI";
import "./ListarEmpleados.css";

export function ListarEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [search, setSearch] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPorPagina = 10;

  useEffect(() => {
    cargarSectores();
  }, []);

  useEffect(() => {
    cargarEmpleados();
  }, [search, sectorId, pagina]);

  const cargarSectores = async () => {
    try {
      const data = await getSectores();
      setSectores(data.filter(s => s.estaActivo));
    } catch (error) {
      console.error("Error cargando sectores:", error);
    }
  };

  const cargarEmpleados = async () => {
    try {
      setLoading(true);
      const params = {
        search,
        sectorId: sectorId || undefined,
        pagina,
        itemsPorPagina,
      };
      
      const response = await getEmpleados(params);
      setEmpleados(response.datos || []);
      setTotalPaginas(response.totalPaginas || 1);
    } catch (error) {
      console.error("Error cargando empleados:", error);
      Swal.fire("Error", "No se pudieron cargar los empleados", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDesactivate = async (emp) => {
    const { value: fechaEgreso } = await Swal.fire({
      title: `¿Desvincular a ${emp.nombre} ${emp.apellido}?`,
      html: '<input id="swal-input1" type="date" class="swal2-input" placeholder="Fecha de egreso">',
      showCancelButton: true,
      confirmButtonText: "Sí, desvincular",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fecha = document.getElementById("swal-input1").value;
        if (!fecha) {
          Swal.showValidationMessage("Debe ingresar una fecha de egreso");
        }
        return fecha;
      },
    });

    if (!fechaEgreso) return;

    try {
      await desvincularEmpleado(emp.id, fechaEgreso);
      Swal.fire("Éxito", "Empleado desvinculado correctamente", "success");
      cargarEmpleados();
    } catch (error) {
      console.error("Error desvinculando empleado:", error);
      Swal.fire("Error", error.response?.data?.mensaje || "No se pudo desvincular al empleado", "error");
    }
  };

  return (
    <div className="empleados-page">
      <Container className="empleados-container">
        <Card className="empleados-card">
          <Card.Header>
            <h2>Listado de Empleados</h2>
            <Link to="/administrador/empleados/alta">
              <Button className="btn-new-employee">
                ➕ Nuevo Empleado
              </Button>
            </Link>
          </Card.Header>
          <Card.Body>
            {/* Filtros */}
            <div className="filters-section">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="🔍 Buscar por nombre, apellido o legajo"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPagina(1);
                    }}
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={sectorId}
                    onChange={(e) => {
                      setSectorId(e.target.value);
                      setPagina(1);
                    }}
                  >
                    <option value="">📁 Todos los sectores</option>
                    {sectores.map(sec => (
                      <option key={sec.id} value={sec.id}>
                        {sec.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </div>

            {/* Tabla */}
            {loading ? (
              <div className="empleados-loading">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p>Cargando empleados...</p>
              </div>
            ) : (
              <>
                <Table responsive className="empleados-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Legajo</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Sector</th>
                      <th>Supervisor</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleados.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-state">
                          No hay empleados para mostrar
                        </td>
                      </tr>
                    ) : (
                      empleados.map(emp => (
                        <tr key={emp.id}>
                          <td><strong>{emp.nombre} {emp.apellido}</strong></td>
                          <td>{emp.legajo}</td>
                          <td>{emp.email}</td>
                          <td>{emp.rol?.nombre || "-"}</td>
                          <td>{emp.sector?.nombre || "-"}</td>
                          <td>{emp.supervisor ? `${emp.supervisor.nombre} ${emp.supervisor.apellido}` : "-"}</td>
                          <td>
                            <div className="action-buttons">
                              <Link to={`/administrador/empleados/editar/${emp.id}`}>
                                <Button variant="info" size="sm">✏️ Editar</Button>
                              </Link>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDesactivate(emp)}
                              >
                                🗑️ Desvincular
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                {/* Paginación */}
                {totalPaginas > 1 && (
                  <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => setPagina(1)} disabled={pagina === 1} />
                    <Pagination.Prev onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1} />
                    
                    {[...Array(totalPaginas)].map((_, idx) => (
                      <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === pagina}
                        onClick={() => setPagina(idx + 1)}
                      >
                        {idx + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas} />
                    <Pagination.Last onClick={() => setPagina(totalPaginas)} disabled={pagina === totalPaginas} />
                  </Pagination>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
