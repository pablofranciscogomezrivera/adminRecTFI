using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackAdminRec.Data;
using BackAdminRec.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace BackAdminRec.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrador,Gerente")]
    public class ReportesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportesController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint JSON
        [HttpGet("dotacion")]
        public async Task<ActionResult<ReporteDotacionDto>> GetReporteDotacion()
        {
            var reporte = await ObtenerDatosReporte();
            return Ok(reporte);
        }

        // Endpoint PDF 
        [HttpGet("dotacion/pdf")]
        public async Task<IActionResult> GetReportePdf()
        {
            var data = await ObtenerDatosReporte();

            var documento = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    // Encabezado
                    page.Header()
                        .Text("Reporte Ejecutivo de Dotación")
                        .SemiBold().FontSize(20).FontColor(Colors.Blue.Medium);

                    // Contenido
                    page.Content().PaddingVertical(1, Unit.Centimetre).Column(x =>
                    {
                        x.Item().Text("Métricas Generales (KPIs)").FontSize(16).Bold();
                        x.Item().PaddingBottom(5);

                        x.Item().Table(tabla =>
                        {
                            tabla.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            tabla.Header(header =>
                            {
                                header.Cell().Text("Activos").Bold();
                                header.Cell().Text("Masa Salarial").Bold();
                                header.Cell().Text("Sueldo Prom.").Bold();
                                header.Cell().Text("Antig. Prom.").Bold();
                            });

                            tabla.Cell().Text(data.TotalEmpleadosActivos.ToString());
                            tabla.Cell().Text($"${data.MasaSalarialTotal:N0}");
                            tabla.Cell().Text($"${data.SueldoPromedio:N0}");
                            tabla.Cell().Text($"{data.AntiguedadPromedioanios} años");
                        });

                        x.Item().PaddingVertical(15);

                        // Sección 2: Distribución por Sector
                        x.Item().Text("Análisis Detallado por Sector").FontSize(16).Bold();
                        x.Item().PaddingBottom(5);
                        x.Item().Table(tabla =>
                        {
                            tabla.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn();    // Sector
                                columns.ConstantColumn(80);  // Cantidad
                                columns.RelativeColumn();    // Sueldo Prom
                                columns.ConstantColumn(80);  // Antigüedad Prom 
                            });

                            tabla.Header(header =>
                            {
                                static IContainer EstiloHeader(IContainer container) =>
                                     container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).Padding(5);

                                header.Cell().Element(EstiloHeader).Text("Sector").Bold();
                                header.Cell().Element(EstiloHeader).Text("Cant.").Bold();
                                header.Cell().Element(EstiloHeader).Text("Sueldo Prom.").Bold();
                                header.Cell().Element(EstiloHeader).Text("Antig. (Años)").Bold();
                            });

                            // Combinamos las listas para la tabla
                            foreach (var sector in data.EmpleadosPorSector)
                            {
                                var sueldo = data.SueldoPromedioPorSector.FirstOrDefault(s => s.Etiqueta == sector.Etiqueta)?.Valor ?? 0;
                                var antiguedad = data.AntiguedadPromedioPorSector.FirstOrDefault(s => s.Etiqueta == sector.Etiqueta)?.Valor ?? 0;

                                static IContainer EstiloCelda(IContainer container) =>
                                    container.BorderBottom(1).BorderColor(Colors.Grey.Lighten4).Padding(5);

                                tabla.Cell().Element(EstiloCelda).Text(sector.Etiqueta);
                                tabla.Cell().Element(EstiloCelda).Text(sector.Valor.ToString());
                                tabla.Cell().Element(EstiloCelda).Text($"${sueldo:N0}");
                                tabla.Cell().Element(EstiloCelda).Text(antiguedad.ToString("N1"));
                            }
                        });
                        x.Item().PaddingVertical(15);

                        // 3. Título Nivel de Estudio (LO QUE FALTABA)
                        x.Item().Text("Distribución por Nivel de Estudio").FontSize(16).Bold();
                        x.Item().PaddingBottom(5);

                        x.Item().Table(tabla =>
                        {
                            tabla.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(); // Nivel
                                columns.RelativeColumn(); // Cantidad
                            });

                            tabla.Header(header =>
                            {
                                header.Cell().BorderBottom(1).Padding(5).Text("Nivel Educativo").Bold();
                                header.Cell().BorderBottom(1).Padding(5).Text("Cantidad de Empleados").Bold();
                            });

                            foreach (var nivel in data.DistribucionNivelEstudio)
                            {
                                tabla.Cell().BorderBottom(1).BorderColor(Colors.Grey.Lighten4).Padding(5).Text(nivel.Etiqueta);
                                tabla.Cell().BorderBottom(1).BorderColor(Colors.Grey.Lighten4).Padding(5).Text(nivel.Valor.ToString());
                            }
                        });
                    });

                    // Pie de página
                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Página ");
                            x.CurrentPageNumber();
                            x.Span(" | Generado automáticamente por Sistema RRHH");
                        });
                });
            });

            // Convertimos a array de bytes
            byte[] pdfBytes = documento.GeneratePdf();

            // Retornamos el archivo
            return File(pdfBytes, "application/pdf", "ReporteDotacion.pdf");
        }

        // Método Privado Auxiliar (Lógica compartida)
        private async Task<ReporteDotacionDto> ObtenerDatosReporte()
        {
            var empleados = await _context.Empleados
               .Include(e => e.Sector)
               .Include(e => e.NivelEstudio)
               .Where(e => e.EstaActivo)
               .ToListAsync();

            if (!empleados.Any()) return new ReporteDotacionDto();

            var reporte = new ReporteDotacionDto
            {
                TotalEmpleadosActivos = empleados.Count,
                MasaSalarialTotal = empleados.Sum(e => e.Sueldo),
                SueldoPromedio = empleados.Average(e => e.Sueldo)
            };

            double totalDiasAntiguedad = empleados.Sum(e => (DateTime.Now - e.FechaIngreso).TotalDays);
            reporte.AntiguedadPromedioanios = Math.Round((totalDiasAntiguedad / empleados.Count) / 365, 1);

            reporte.EmpleadosPorSector = empleados
                .GroupBy(e => e.Sector?.Nombre ?? "Sin Sector")
                .Select(g => new DatoGrafico { Etiqueta = g.Key, Valor = g.Count() })
                .ToList();

            reporte.SueldoPromedioPorSector = empleados
                .GroupBy(e => e.Sector?.Nombre ?? "Sin Sector")
                .Select(g => new DatoGrafico { Etiqueta = g.Key, Valor = Math.Round(g.Average(x => x.Sueldo), 2) })
                .ToList();

            reporte.AntiguedadPromedioPorSector = empleados
                .GroupBy(e => e.Sector?.Nombre ?? "Sin Sector")
                .Select(g => new DatoGrafico
                {
                    Etiqueta = g.Key,
                    // Promedio de días de antigüedad / 365 para tener años
                    Valor = (decimal)Math.Round(g.Average(x => (DateTime.Now - x.FechaIngreso).TotalDays / 365), 1)
                })
                .ToList();

            reporte.DistribucionNivelEstudio = empleados
                .GroupBy(e => e.NivelEstudio?.Nombre ?? "No Especificado")
                .Select(g => new DatoGrafico { Etiqueta = g.Key, Valor = g.Count() })
                .ToList();

            return reporte;
        }
    }
}