using Microsoft.EntityFrameworkCore;
using PruebaTecnicaAPI.Data.Entities;

namespace PruebaTecnicaAPI.Data
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Productos> Productos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
    }
}
