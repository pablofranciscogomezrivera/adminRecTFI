using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAdminRec.Data;
using BackAdminRec.Models;

namespace BackAdminRec.Controllers
{
    [Route("api/niveles-estudio")] 
    [ApiController]
    public class NivelesEstudioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NivelesEstudioController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/niveles-estudio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NivelEstudio>>> GetNivelesEstudio()
        {
            return await _context.NivelesEstudio
                                 .Where(n => n.EstaActivo)
                                 .ToListAsync();
        }

        // POST: api/niveles-estudio
        [HttpPost]
        public async Task<ActionResult<NivelEstudio>> PostNivel(NivelEstudio nivel)
        {
            _context.NivelesEstudio.Add(nivel);
            await _context.SaveChangesAsync();
            return Ok(nivel);
        }
    }
}