using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaAPI.Models.ViewModels
{
    public class vmCategorias
    {
        [Key]
        public int IdCategoria { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public int Estado { get; set; }
        public string EstadoNombre { get; set; }
        public required int CreadoPor { get; set; }
        public string Usuario {  get; set; }
        public DateTime FechaCreacion { get; set; }
        public string? UsuarioModificado { get; set; }
        public int? ModificadoPor { get; set; }
        public DateTime? FechaModificacion { get; set; }
    }
}
