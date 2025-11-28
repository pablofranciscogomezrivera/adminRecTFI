using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackAdminRec.Models
{
    public class Empleado
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Legajo { get; set; } = string.Empty; 

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Apellido { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)] // Mantenemos MaxLength por seguridad de DB
        [RegularExpression(@"^\d{7,8}$", ErrorMessage = "El DNI debe tener 7 u 8 dígitos numéricos.")] // 🟢 NUEVA VALIDACIÓN
        public string DNI { get; set; } = string.Empty; 

        [Required]
        [EmailAddress(ErrorMessage = "El formato del email no es válido.")]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? Telefono { get; set; }

        public DateTime FechaIngreso { get; set; }

        public DateTime? FechaEgreso { get; set; } 

        [Column(TypeName = "decimal(18,2)")] 
        public decimal Sueldo { get; set; }

        public bool EstaActivo { get; set; } = true;

        // --- Relaciones (Claves Foráneas) ---

        public int? NivelEstudioId { get; set; }
        [ForeignKey("NivelEstudioId")]
        public virtual NivelEstudio? NivelEstudio { get; set; }

        public int SectorId { get; set; }
        [ForeignKey("SectorId")]
        public virtual Sector? Sector { get; set; }

        public int RolId { get; set; }
        [ForeignKey("RolId")]
        public virtual Rol? Rol { get; set; }

        public int? SupervisorId { get; set; }
        [ForeignKey("SupervisorId")]
        public virtual Empleado? Supervisor { get; set; }
    }
}