using BackAdminRec.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using System;
using BackAdminRec.Data;
using Microsoft.AspNetCore.Authorization;

namespace BackAdminRec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class SectoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SectoresController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/sectores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSectores()
        {
            // Usamos DateTime.Now local para la consulta
            var hoy = DateTime.Now;

            var sectores = await _context.Sectores
                .Select(s => new
                {
                    s.Id,
                    s.Nombre,
                    s.EstaActivo,
                    // CORRECCIÓN AQUÍ:
                    // 1. Calculamos la diferencia en días usando funciones de EF para SQL
                    // 2. Casteamos a (double?) para permitir nulos si no hay empleados
                    // 3. Usamos ?? 0 para poner 0 por defecto si el promedio es null
                    AntiguedadPromedio = _context.Empleados
                        .Where(e => e.SectorId == s.Id && e.EstaActivo)
                        .Select(e => (double?)EF.Functions.DateDiffDay(e.FechaIngreso, hoy) / 365.0)
                        .Average() ?? 0
                })
                .ToListAsync();

            // Proyección final para redondear
            var resultado = sectores.Select(s => new {
                s.Id,
                s.Nombre,
                s.EstaActivo,
                AntiguedadPromedio = Math.Round(s.AntiguedadPromedio, 1) // Redondear a 1 decimal
            });

            return Ok(resultado);
        }

        // 2. POST: api/sectores
        [HttpPost]
        public async Task<ActionResult<Sector>> PostSector(Sector sector)
        {
            bool existeNombre = await _context.Sectores
                .AnyAsync(s => s.Nombre.ToLower() == sector.Nombre.ToLower());

            if (existeNombre)
            {
                return BadRequest("El nombre del sector ya existe."); 
            }
            
            sector.EstaActivo = true;

            _context.Sectores.Add(sector);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSectores", new { id = sector.Id }, sector);
        }

        // 3. PUT: api/sectores/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSector(int id, Sector sectorModificado)
        {
            var sectorExistente = await _context.Sectores.FindAsync(id);

            if (sectorExistente == null)
            {
                return NotFound();
            }

            sectorExistente.Nombre = sectorModificado.Nombre;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 4. PUT: api/sectores/{id}/activar
        [HttpPut("{id}/activar")]
        public async Task<IActionResult> ActivarSector(int id)
        {
            var sector = await _context.Sectores.FindAsync(id);
            if (sector == null) return NotFound();

            sector.EstaActivo = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 5. DELETE: api/sectores/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSector(int id)
        {
            var sector = await _context.Sectores.FindAsync(id);
            if (sector == null)
            {
                return NotFound();
            }

            sector.EstaActivo = false;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}