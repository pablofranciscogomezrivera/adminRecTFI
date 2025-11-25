namespace BackAdminRec.Models 
{
    public class ReporteDotacionDto
    {
        public int TotalEmpleadosActivos { get; set; }
        public decimal MasaSalarialTotal { get; set; }
        public decimal SueldoPromedio { get; set; }
        public double AntiguedadPromedioanios { get; set; }

       
        public List<DatoGrafico> EmpleadosPorSector { get; set; } = new();
        public List<DatoGrafico> SueldoPromedioPorSector { get; set; } = new();
        public List<DatoGrafico> AntiguedadPromedioPorSector { get; set; } = new();
        public List<DatoGrafico> DistribucionNivelEstudio { get; set; } = new();
    }

    
    public class DatoGrafico
    {
        public string Etiqueta { get; set; } = string.Empty;
        public decimal Valor { get; set; } 
    }
}