using Microsoft.EntityFrameworkCore;
using PruebaTecnicaAPI.Models.ViewModels;
using System.Data;
using Dapper;

namespace PruebaTecnicaAPI.Data
{
    public static partial class AplicationDbContextExtensions
    {
        public static IList<vmProductos> GetAllProductos(this AplicationDbContext context)
        {
            return context.Database.GetDbConnection()
                .Query<vmProductos>("GetAllProductos", commandType: CommandType.StoredProcedure)
                .ToList();
        }

        public static IList<vmCategorias> GetAllCategorias(this AplicationDbContext context) 
        {
            return context.Database.GetDbConnection()
                .Query<vmCategorias>("GetAllCategorias", commandType: CommandType.StoredProcedure)
                .ToList();
        
        }
    }
}
