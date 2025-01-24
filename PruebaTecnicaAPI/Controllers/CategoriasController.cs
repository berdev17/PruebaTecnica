using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaAPI.Data;
using PruebaTecnicaAPI.Data.Entities;
using PruebaTecnicaAPI.Models.AddDto;

namespace PruebaTecnicaAPI.Controllers
{
    [Route("api/Categorias")]
    [ApiController]
    public class CategoriasController : Controller
    {
        private readonly AplicationDbContext dbContext;

        public CategoriasController(AplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("GetAllCategorias")]
        public IActionResult GetAllCatergorias()
        {

            var AllCategorias = dbContext.GetAllCategorias()
               .Select(p => new
               {
                   Id = p.IdCategoria,
                   p.Nombre,
                   p.Descripcion,
                   p.Estado,
                   p.EstadoNombre,
                   p.CreadoPor,
                   p.Usuario,
                   p.FechaCreacion,
                   p.UsuarioModificado,
                   p.FechaModificacion,

               })
               .Where(a => a.Estado != 2)
               .ToList();

            return Ok(AllCategorias);

        }

        [HttpGet("GetByIdCategorias/{id}")]
        public IActionResult GetCategorias(int id)
        {
            var idCategoria = dbContext.Categorias.FirstOrDefault(p => p.IdCategoria == id && p.Estado != 2);

            if (idCategoria == null)
            {
                return NotFound();
            }
            return Ok(idCategoria);
        }

        [HttpPost("AddNewCategoria")]
        public IActionResult AddNewCategoria(CategoriaDto categoria)
        {
            var categoriaEntity = new Categoria()
            {
                Nombre = categoria.Nombre,
                Descripcion = categoria.Descripcion,
                Estado = 1,
                CreadoPor = categoria.CreadoPor,
                FechaCreacion = DateTime.Now,
            };
            dbContext.Categorias.Add(categoriaEntity);
            dbContext.SaveChanges();

            return Ok(categoriaEntity);
        }

        [HttpPut("UpdateCategoria{id}")]
        public IActionResult UpdateCategoria(int id, CategoriaDto categorias)
        {

            var categoria = dbContext.Categorias.FirstOrDefault(p => p.IdCategoria == id && p.Estado != 2);

            if (categoria == null)
            {

                return NotFound();
            }

            categoria.Nombre = categorias.Nombre;
            categoria.Descripcion = categorias.Descripcion;
            categoria.ModificadoPor = 1;
            categoria.FechaModificacion = DateTime.Now;

            dbContext.SaveChanges();
            return Ok(categoria);

        }

        [HttpPut("DeleteCategoria{id}")]
        public IActionResult DeleteCategoria(int id)
        {
            var categoria = dbContext.Categorias.Find(id);
            if (categoria == null)
            {
                return NotFound();
            }

            categoria.Estado = 2;

            dbContext.SaveChanges();
            return Ok(categoria);
        }


    }
}
