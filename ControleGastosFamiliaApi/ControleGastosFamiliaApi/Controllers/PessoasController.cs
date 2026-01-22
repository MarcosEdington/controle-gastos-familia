using Microsoft.AspNetCore.Mvc;
using ControleGastosFamiliaApi.Models;
using ControleGastosFamiliaApi.Repositories;
using System.Linq;

namespace ControleGastosFamiliaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly RepositorioJson<Pessoa> _repoPessoas = new("pessoas");
        private readonly RepositorioJson<Transacao> _repoTransacoes = new("transacoes");

        // GET: api/Pessoas
        [HttpGet]
        public ActionResult<IEnumerable<Pessoa>> GetPessoas()
        {
            return _repoPessoas.Carregar();
        }

        // POST: api/Pessoas
        [HttpPost]
        public ActionResult<Pessoa> PostPessoa(Pessoa pessoa)
        {
            var pessoas = _repoPessoas.Carregar();
            pessoa.Id = pessoas.Any() ? pessoas.Max(p => p.Id) + 1 : 1;  // Gera ID manual
            pessoas.Add(pessoa);
            _repoPessoas.Salvar(pessoas);
            return CreatedAtAction(nameof(GetPessoa), new { id = pessoa.Id }, pessoa);
        }

        // GET: api/Pessoas/5
        [HttpGet("{id}")]
        public ActionResult<Pessoa> GetPessoa(int id)
        {
            var pessoas = _repoPessoas.Carregar();
            var pessoa = pessoas.FirstOrDefault(p => p.Id == id);
            if (pessoa == null) return NotFound();
            return pessoa;
        }

        // DELETE: api/Pessoas/5
        [HttpDelete("{id}")]
        public IActionResult DeletePessoa(int id)
        {
            var pessoas = _repoPessoas.Carregar();
            var pessoa = pessoas.FirstOrDefault(p => p.Id == id);
            if (pessoa == null) return NotFound();
            pessoas.Remove(pessoa);
            _repoPessoas.Salvar(pessoas);

            // Deleta transações associadas
            var transacoes = _repoTransacoes.Carregar();
            transacoes.RemoveAll(t => t.PessoaId == id);
            _repoTransacoes.Salvar(transacoes);

            return NoContent();
        }
    }
}