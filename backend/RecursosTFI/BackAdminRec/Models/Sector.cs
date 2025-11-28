    using System.ComponentModel.DataAnnotations;

    namespace BackAdminRec.Models
    {
        public class Sector
        {
            [Key]
            public int Id { get; set; } //

            [Required]
            [MaxLength(100)]
            public string Nombre { get; set; } = string.Empty; //

            public bool EstaActivo { get; set; } = true; //
        }
    }
