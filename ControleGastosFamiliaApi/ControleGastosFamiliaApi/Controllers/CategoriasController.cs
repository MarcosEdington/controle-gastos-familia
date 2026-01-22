using Microsoft.AspNetCore.Mvc;
using ControleGastosFamiliaApi.Models;
using ControleGastosFamiliaApi.Repositories;
using System.Linq;

namespace ControleGastosFamiliaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly RepositorioJson<Categoria> _repoCategorias = new("categorias");

        // GET: api/Categorias
        // Lista todas as categorias
        [HttpGet]
        public ActionResult<IEnumerable<Categoria>> GetCategorias()
        {
            var categorias = _repoCategorias.Carregar();
            return Ok(categorias);
        }

        // GET: api/Categorias/5
        // Busca uma categoria por ID
        [HttpGet("{id}")]
        public ActionResult<Categoria> GetCategoria(int id)
        {
            var categorias = _repoCategorias.Carregar();
            var categoria = categorias.FirstOrDefault(c => c.Id == id);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            return Ok(categoria);
        }

        // POST: api/Categorias
        // Cria uma nova categoria
        [HttpPost]
        public ActionResult<Categoria> PostCategoria(Categoria categoria)
        {
            // Validação da finalidade (obrigatória e valores permitidos)
            if (string.IsNullOrWhiteSpace(categoria.Descricao))
            {
                return BadRequest("Descrição é obrigatória.");
            }

            if (categoria.Finalidade != "Despesa" &&
                categoria.Finalidade != "Receita" &&
                categoria.Finalidade != "Ambas")
            {
                return BadRequest("Finalidade deve ser 'Despesa', 'Receita' ou 'Ambas'.");
            }

            var categorias = _repoCategorias.Carregar();

            // Gera ID manualmente
            categoria.Id = categorias.Any() ? categorias.Max(c => c.Id) + 1 : 1;

            categorias.Add(categoria);
            _repoCategorias.Salvar(categorias);

            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }
    }
}