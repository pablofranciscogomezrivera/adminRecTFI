import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { getReporteDotacion, downloadReportePDF } from "../utils/reportesAPI";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    cargarReporte();
  }, []);

  const cargarReporte = async () => {
    try {
      setLoading(true);
      const data = await getReporteDotacion();
      setReporte(data);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar el reporte", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloadingPDF(true);
      await downloadReportePDF();
      Swal.fire("Éxito", "PDF descargado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo descargar el PDF", "error");
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!reporte) {
    return (
      <div className="dashboard-page">
        <Container className="dashboard-container">
          <div className="alert alert-warning">No hay datos disponibles</div>
        </Container>
      </div>
    );
  }

  // Preparar datos para gráficos
  const distribucionNivelEstudioData = {
    labels: reporte.distribucionNivelEstudio.map((item) => item.etiqueta),
    datasets: [
      {
        data: reporte.distribucionNivelEstudio.map((item) => item.valor),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const empleadosPorSectorData = {
    labels: reporte.empleadosPorSector.map((item) => item.etiqueta),
    datasets: [
      {
        label: "Cantidad de Empleados",
        data: reporte.empleadosPorSector.map((item) => item.valor),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const sueldoPromedioPorSectorData = {
    labels: reporte.sueldoPromedioPorSector.map((item) => item.etiqueta),
    datasets: [
      {
        label: "Sueldo Promedio ($)",
        data: reporte.sueldoPromedioPorSector.map((item) => item.valor),
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const antiguedadPromedioPorSectorData = {
    labels: reporte.antiguedadPromedioPorSector.map((item) => item.etiqueta),
    datasets: [
      {
        label: "Antigüedad Promedio (años)",
        data: reporte.antiguedadPromedioPorSector.map((item) => item.valor),
        backgroundColor: "#FF9F40",
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <Container className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard - Reporte Ejecutivo</h1>
          <Button
            className="btn-export"
            onClick={handleDownloadPDF}
            disabled={downloadingPDF}
          >
            {downloadingPDF ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Descargando...
              </>
            ) : (
              <>
                📄 Exportar a PDF
              </>
            )}
          </Button>
        </div>

        {/* KPIs */}
        <Row className="mb-4 g-4">
          <Col md={3}>
            <Card className="kpi-card text-center">
              <Card.Body>
                <Card.Title>Total Empleados Activos</Card.Title>
                <h2 className="display-4">{reporte.totalEmpleadosActivos}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="kpi-card text-center">
              <Card.Body>
                <Card.Title>Masa Salarial Total</Card.Title>
                <h2 className="display-6">${reporte.masaSalarialTotal.toLocaleString()}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="kpi-card text-center">
              <Card.Body>
                <Card.Title>Sueldo Promedio</Card.Title>
                <h2 className="display-6">${reporte.sueldoPromedio.toLocaleString()}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="kpi-card text-center">
              <Card.Body>
                <Card.Title>Antigüedad Promedio</Card.Title>
                <h2 className="display-6">{reporte.antiguedadPromedioanios} años</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Gráficos */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="chart-card">
              <Card.Header>Distribución por Nivel de Estudio</Card.Header>
              <Card.Body>
                <Pie data={distribucionNivelEstudioData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="chart-card">
              <Card.Header>Empleados por Sector</Card.Header>
              <Card.Body>
                <Bar data={empleadosPorSectorData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <Card className="chart-card">
              <Card.Header>Sueldo Promedio por Sector</Card.Header>
              <Card.Body>
                <Bar data={sueldoPromedioPorSectorData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="chart-card">
              <Card.Header>Antigüedad Promedio por Sector</Card.Header>
              <Card.Body>
                <Bar data={antiguedadPromedioPorSectorData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabla detallada por sector */}
        <Row>
          <Col>
            <Card className="table-card">
              <Card.Header>Análisis Detallado por Sector</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sector</th>
                      <th>Cantidad Empleados</th>
                      <th>Sueldo Promedio</th>
                      <th>Antigüedad Promedio (años)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.empleadosPorSector.map((sector, index) => {
                      const sueldo = reporte.sueldoPromedioPorSector.find(
                        (s) => s.etiqueta === sector.etiqueta
                      );
                      const antiguedad = reporte.antiguedadPromedioPorSector.find(
                        (a) => a.etiqueta === sector.etiqueta
                      );
                      return (
                        <tr key={index}>
                          <td>{sector.etiqueta}</td>
                          <td>{sector.valor}</td>
                          <td>${sueldo?.valor.toLocaleString() || 0}</td>
                          <td>{antiguedad?.valor.toFixed(1) || 0}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
