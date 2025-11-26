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

        // Aquí definimos las tablas. Por ahora solo Sectores.
        public DbSet<Sector> Sectores { get; set; }
    }
}