using PruebaTecnicaAPI.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaAPI.Models.ViewModels
{
    public class vmProductos
    {
        [Key]
        public int IdProducto { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int Categoria { get; set; }
        public string CategoriaNombre { get; set; } =string.Empty;
        public int Estado { get; set; }
        public string EstadoNombre { get; set; } = string.Empty;
        public int CreadoPor { get; set; }
        public string Usuario { get; set; } = string.Empty;
        public DateTime FechaCreacion { get; set; }
        public int? ModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }


    }
}
