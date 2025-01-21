using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaAPI.Data.Entities
{
    public class Categoria
    {
        [Key]
        public int IdCategoria { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int Estado { get; set; }
        public required int CreadoPor {  get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? ModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
