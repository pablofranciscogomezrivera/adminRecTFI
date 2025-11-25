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
    }
}