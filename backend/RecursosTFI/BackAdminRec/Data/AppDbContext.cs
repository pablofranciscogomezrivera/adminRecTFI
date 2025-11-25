using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using BackAdminRec.Models;

namespace BackAdminRec.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Sector> Sectores { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<NivelEstudio> NivelesEstudio { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}