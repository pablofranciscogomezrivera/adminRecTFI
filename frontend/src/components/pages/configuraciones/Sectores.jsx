import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Sectores = () => {
  const [sectores, setSectores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    // Simulación de GET /api/sectores
    setSectores([
      { id: 1, nombre: "Contabilidad", estaActivo: true },
      { id: 2, nombre: "RRHH", estaActivo: true },
      { id: 3, nombre: "Sistemas", estaActivo: false },
    ]);
  }, []);

  const crearSector = (nuevoSector) => {
    nuevoSector.id = crypto.randomUUID();
    nuevoSector.estaActivo = true;
    setSectores([...sectores, nuevoSector]);
  };

  const editarSector = (idSector, sectorEditar) => {
    const sectoresEditados = sectores.map((itemSector) => {
      if (itemSector.id === idSector) {
        return {
          ...itemSector,
          ...sectorEditar,
        };
      }
      return itemSector;
    });

    // corregido: antes estaba setServicios()
    setSectores(sectoresEditados);
  };

  const desactivarSector = (idSector) => {
    const listaSectores = sectores.map((itemSector) =>
      itemSector.id === idSector
        ? { ...itemSector, estaActivo: false }
        : itemSector
    );
    setSectores(listaSectores);
  };

  // 👉 SweetAlert2 para confirmar desactivación
  const confirmarDesactivar = (idSector) => {
    Swal.fire({
      title: "¿Desactivar sector?",
      text: "Esta acción marcará el sector como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarSector(idSector);
        Swal.fire(
          "Desactivado",
          "El sector fue desactivado correctamente.",
          "success"
        );
      }
    });
  };

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar Sectores</h1>
        <Link className="btn btn-primary" to={"/configuracion/crear"}>
          Crear
        </Link>
      </div>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sectores.map((sector) => (
            <tr key={sector.id}>
              <td>{sector.id}</td>
              <td>{sector.nombre}</td>
              <td>{sector.estaActivo ? "Activo" : "Inactivo"}</td>
              <td className="d-flex gap-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    setMostrarFormulario(true);
                  }}
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmarDesactivar(sector.id)}
                >
                  Desactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default Sectores;
