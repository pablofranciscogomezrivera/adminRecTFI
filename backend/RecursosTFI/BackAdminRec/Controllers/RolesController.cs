using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAdminRec.Data;
using BackAdminRec.Models;
using Microsoft.AspNetCore.Authorization;

namespace BackAdminRec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RolesController(AppDbContext context)
        {
            _context = context;
        }

        // PUT: api/roles/{id}/activar
        [HttpPut("{id}/activar")]
        public async Task<IActionResult> ActivarRol(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null) return NotFound();

            rol.EstaActivo = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // 1. OBTENER TODOS LOS ROLES
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        // 2. CREAR NUEVO ROL (Valida duplicados)
        [HttpPost]
        public async Task<ActionResult<Rol>> PostRol(Rol rol)
        {
            // Validamos si ya existe un rol con ese nombre (ignorando mayúsculas/minúsculas)
            bool existe = await _context.Roles
                .AnyAsync(r => r.Nombre.ToLower() == rol.Nombre.ToLower());

            if (existe)
            {
                return BadRequest("El nombre del rol ya existe.");
            }

            rol.EstaActivo = true; // Aseguramos que nazca activo
            _context.Roles.Add(rol);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoles", new { id = rol.Id }, rol);
        }

        // 3. ACTUALIZAR ROL
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRol(int id, Rol rolModificado)
        {
            var rol = await _context.Roles.FindAsync(id);

            if (rol == null)
            {
                return NotFound();
            }

            rol.Nombre = rolModificado.Nombre;
            rol.Descripcion = rolModificado.Descripcion;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 4. ELIMINAR ROL (Baja Lógica)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol(int id)
        {
            var rol = await _context.Roles.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            // No borramos el registro, solo lo desactivamos
            rol.EstaActivo = false;

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}