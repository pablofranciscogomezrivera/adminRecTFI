using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAdminRec.Data;
using BackAdminRec.Models;

namespace BackAdminRec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadosController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/empleados
        [HttpPost]
        public async Task<ActionResult<Empleado>> PostEmpleado(Empleado empleado)
        {
            if (empleado.Sueldo < 0)
            {
                return BadRequest("El sueldo no puede ser negativo.");
            }

       
            bool existeDuplicado = await _context.Empleados.AnyAsync(e =>
                e.Legajo == empleado.Legajo || e.DNI == empleado.DNI);

            if (existeDuplicado)
            {
                return BadRequest("Ya existe un empleado con ese Legajo o DNI.");
            }

            
            if (!await _context.Sectores.AnyAsync(s => s.Id == empleado.SectorId))
            {
                return BadRequest("El Sector especificado no existe.");
            }

            if (!await _context.Roles.AnyAsync(r => r.Id == empleado.RolId))
            {
                return BadRequest("El Rol especificado no existe.");
            }

            
            if (empleado.NivelEstudioId.HasValue &&
                !await _context.NivelesEstudio.AnyAsync(n => n.Id == empleado.NivelEstudioId))
            {
                return BadRequest("El Nivel de Estudio especificado no existe.");
            }

            empleado.EstaActivo = true;

            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();

            // Retornamos 201 Created
            return CreatedAtAction("GetEmpleado", new { id = empleado.Id }, empleado);
        }
        // GET: api/empleados/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleado>> GetEmpleado(int id)
        {
            var empleado = await _context.Empleados
                .Include(e => e.Sector)       
                .Include(e => e.Rol)          
                .Include(e => e.NivelEstudio)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (empleado == null)
            {
                return NotFound();
            }

            return empleado;
        }

        // POST: api/empleados/{id}/desvincular 
        //hu5
        [HttpPost("{id}/desvincular")]
        public async Task<IActionResult> DesvincularEmpleado(int id, [FromBody] DesvinculacionRequest request)
        {
            var empleado = await _context.Empleados.FindAsync(id);

            if (empleado == null)
            {
                return NotFound("Empleado no encontrado.");
            }

            if (request.FechaEgreso < empleado.FechaIngreso)
            {
                return BadRequest("La fecha de egreso no puede ser anterior a la fecha de ingreso.");
            }

            empleado.EstaActivo = false;
            empleado.FechaEgreso = request.FechaEgreso;

            await _context.SaveChangesAsync();

            return Ok(new { mensaje = $"El empleado {empleado.Nombre} {empleado.Apellido} ha sido desvinculado correctamente." });
        }

        // GET: api/empleados/supervisores
        // hu6
        [HttpGet("supervisores")]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetCandidatosSupervisores()
        {
            return await _context.Empleados
                .Include(e => e.Rol) 
                .Where(e => e.EstaActivo &&
                           (e.Rol.Nombre.Contains("Supervisor") || e.Rol.Nombre.Contains("Gerente")))
                .ToListAsync();
        }

        // PUT: api/empleados/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleado(int id, Empleado empleadoModificado)
        {
            if (id != empleadoModificado.Id)
            {
                return BadRequest("El ID de la URL no coincide con el ID del cuerpo de la solicitud.");
            }

            var empleadoExistente = await _context.Empleados.FindAsync(id);
            if (empleadoExistente == null)
            {
                return NotFound($"No se encontró el empleado con ID {id}.");
            }


            if (empleadoModificado.Sueldo < 0)
                return BadRequest("El sueldo no puede ser negativo.");

            if (!await _context.Sectores.AnyAsync(s => s.Id == empleadoModificado.SectorId))
                return BadRequest("El Sector especificado no existe.");

            if (!await _context.Roles.AnyAsync(r => r.Id == empleadoModificado.RolId))
                return BadRequest("El Rol especificado no existe.");

            if (empleadoModificado.NivelEstudioId.HasValue &&
                !await _context.NivelesEstudio.AnyAsync(n => n.Id == empleadoModificado.NivelEstudioId))
            {
                return BadRequest("El Nivel de Estudio especificado no existe.");
            }

            if (empleadoModificado.SupervisorId.HasValue)
            {
                if (empleadoModificado.SupervisorId == id)
                {
                    return BadRequest("El empleado no puede ser su propio supervisor.");
                }

                if (!await _context.Empleados.AnyAsync(e => e.Id == empleadoModificado.SupervisorId))
                {
                    return BadRequest("El Supervisor especificado no existe.");
                }
            }


            empleadoExistente.Nombre = empleadoModificado.Nombre;
            empleadoExistente.Apellido = empleadoModificado.Apellido;
            empleadoExistente.Email = empleadoModificado.Email;
            empleadoExistente.Telefono = empleadoModificado.Telefono;
            empleadoExistente.Sueldo = empleadoModificado.Sueldo;

            empleadoExistente.SectorId = empleadoModificado.SectorId;
            empleadoExistente.RolId = empleadoModificado.RolId;
            empleadoExistente.NivelEstudioId = empleadoModificado.NivelEstudioId;
            empleadoExistente.SupervisorId = empleadoModificado.SupervisorId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(empleadoExistente); 
        }

        private bool EmpleadoExists(int id)
        {
            return _context.Empleados.Any(e => e.Id == id);
        }
    }

    public class DesvinculacionRequest
    {
        public DateTime FechaEgreso { get; set; }
    }
}