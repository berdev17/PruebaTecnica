using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaAPI.Data;
using PruebaTecnicaAPI.Data.Entities;
using PruebaTecnicaAPI.Models.AddDto;

namespace PruebaTecnicaAPI.Controllers
{
    [Route("api/Productos")]
    [ApiController]
    public class ProductosController : Controller
    {
        private readonly AplicationDbContext dbContext;

        public ProductosController(AplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("GetAllProductos")]
        public IActionResult GetAllProductos()
        {
            var AllProductos = dbContext.GetAllProductos()
                .Select(p => new
                {
                    Id = p.IdProducto,
                    p.Nombre,
                    p.Descripcion,
                    p.Categoria,
                    p.CategoriaNombre,
                    p.Estado,
                    p.EstadoNombre,
                    p.CreadoPor,
                    p.Usuario,
                    p.FechaCreacion,
                    p.FechaModificacion,

                })
                .Where(a => a.Estado != 2)
                .ToList();
                
            return Ok(AllProductos);

            //var allProductos = dbContext.Productos
            //                    .Where(p => p.Estado != 2) 
            //                    .ToList();
            //return Ok(allProductos);

        }

        [HttpGet("GetByIdProductos/{id}")]
        public IActionResult GetProducto(int id)
        {
            var idProducto = dbContext.Productos.FirstOrDefault(p => p.IdProducto == id && p.Estado != 2);

            if (idProducto == null)
            {
                return NotFound();
            }
            return Ok(idProducto);
        }

        [HttpPost("AddNewProducto")]
        public IActionResult AddNewProducto(ProductosDto productos)
        {
            var productosEntity = new Productos()
            {
                Nombre = productos.Nombre,
                Descripcion = productos.Descripcion,
                Categoria = productos.Categoria,
                Estado = 1,
                CreadoPor = productos.CreadoPor,
                FechaCreacion = DateTime.Now,
            };
            dbContext.Productos.Add(productosEntity);
            dbContext.SaveChanges();

            return Ok(productosEntity);
        }

        [HttpPut("UpdateProducto{id}")]
        public IActionResult UpdateProducto(int id, ProductosDto productos)
        {

            var producto = dbContext.Productos.FirstOrDefault(p => p.IdProducto == id && p.Estado != 2); 

            if (producto == null)
            {

                return NotFound();
            }

            producto.Nombre = productos.Nombre;
            producto.Descripcion = productos.Descripcion;
            producto.Categoria = productos.Categoria;
            producto.ModificadoPor = 1;
            producto.FechaModificacion = DateTime.Now;

            dbContext.SaveChanges();
            return Ok(producto);

        }
        [HttpPut("DeleteProducto{id}")]
        public IActionResult DeleteProducto(int id)
        {
            var producto = dbContext.Productos.Find(id);
            if (producto == null)
            {
                return NotFound();
            }

            producto.Estado = 2;

            dbContext.SaveChanges();
            return Ok(producto);
        }
    }
}
