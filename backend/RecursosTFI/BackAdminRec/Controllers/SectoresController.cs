using BackAdminRec.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using System;
using BackAdminRec.Data;

namespace BackAdminRec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectoresController : ControllerBase
    {
        private readonly AppDbContext _context; // Reemplaza AppDbContext con el nombre de tu contexto

        public SectoresController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET /api/sectores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sector>>> GetSectores()
        {
            return await _context.Sectores.ToListAsync();
        }

        // 2. POST /api/sectores
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

            return CreatedAtAction("GetSectores", new { id = sector.Id }, sector); // Retorna 201 Created
        }

        // 3. PUT /api/sectores/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSector(int id, Sector sectorModificado)
        {
            var sectorExistente = await _context.Sectores.FindAsync(id);

            if (sectorExistente == null)
            {
                return NotFound();
            }

            sectorExistente.Nombre = sectorModificado.Nombre;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent(); // O 200 OK
        }

        // 4. DELETE /api/sectores/{id}
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

            return NoContent(); // Retorna 204 No Content
        }
    }
}