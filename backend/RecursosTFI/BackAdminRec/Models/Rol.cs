using System.ComponentModel.DataAnnotations;

namespace BackAdminRec.Models
{
    public class Rol
    {
        [Key]
        public int Id { get; set; }

        [Required] 
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Descripcion { get; set; }

        public bool EstaActivo { get; set; } = true; 
    }
}