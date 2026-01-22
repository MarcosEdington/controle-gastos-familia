using Microsoft.AspNetCore.Mvc;
using ControleGastosFamiliaApi.Models;
using ControleGastosFamiliaApi.Repositories;
using System.Linq;

namespace ControleGastosFamiliaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacoesController : ControllerBase
    {
        private readonly RepositorioJson<Transacao> _repoTransacoes = new("transacoes");
        private readonly RepositorioJson<Pessoa> _repoPessoas = new("pessoas");
        private readonly RepositorioJson<Categoria> _repoCategorias = new("categorias");

        // GET: api/Transacoes
        // Lista todas as transações
        [HttpGet]
        public ActionResult<IEnumerable<Transacao>> GetTransacoes()
        {
            var transacoes = _repoTransacoes.Carregar();
            return Ok(transacoes);
        }

        // POST: api/Transacoes
        // Cria uma nova transação com validações de negócio
        [HttpPost]
        public ActionResult<Transacao> PostTransacao(Transacao transacao)
        {
            // 1. Valida campos obrigatórios básicos
            if (string.IsNullOrWhiteSpace(transacao.Descricao))
                return BadRequest("Descrição é obrigatória.");

            if (transacao.Valor <= 0)
                return BadRequest("Valor deve ser maior que zero.");

            if (transacao.Tipo != "Despesa" && transacao.Tipo != "Receita")
                return BadRequest("Tipo deve ser 'Despesa' ou 'Receita'.");

            // 2. Verifica se a pessoa existe
            var pessoas = _repoPessoas.Carregar();
            var pessoa = pessoas.FirstOrDefault(p => p.Id == transacao.PessoaId);
            if (pessoa == null)
                return BadRequest("Pessoa não encontrada.");

            // 3. Verifica se a categoria existe
            var categorias = _repoCategorias.Carregar();
            var categoria = categorias.FirstOrDefault(c => c.Id == transacao.CategoriaId);
            if (categoria == null)
                return BadRequest("Categoria não encontrada.");

            // 4. Regra: Menores de 18 anos só podem ter DESPESAS
            if (pessoa.Idade < 18 && transacao.Tipo == "Receita")
            {
                return BadRequest("Menores de 18 anos não podem registrar receitas.");
            }

            // 5. Regra: Compatibilidade entre tipo da transação e finalidade da categoria
            if (transacao.Tipo == "Despesa" &&
                categoria.Finalidade != "Despesa" &&
                categoria.Finalidade != "Ambas")
            {
                return BadRequest("Esta categoria não pode ser usada para despesas.");
            }

            if (transacao.Tipo == "Receita" &&
                categoria.Finalidade != "Receita" &&
                categoria.Finalidade != "Ambas")
            {
                return BadRequest("Esta categoria não pode ser usada para receitas.");
            }

            // Tudo ok → gera ID e salva
            var transacoes = _repoTransacoes.Carregar();
            transacao.Id = transacoes.Any() ? transacoes.Max(t => t.Id) + 1 : 1;

            transacoes.Add(transacao);
            _repoTransacoes.Salvar(transacoes);

            return CreatedAtAction(nameof(GetTransacao), new { id = transacao.Id }, transacao);
        }

        // GET: api/Transacoes/5
        [HttpGet("{id}")]
        public ActionResult<Transacao> GetTransacao(int id)
        {
            var transacoes = _repoTransacoes.Carregar();
            var transacao = transacoes.FirstOrDefault(t => t.Id == id);

            if (transacao == null)
                return NotFound("Transação não encontrada.");

            return Ok(transacao);
        }
    }
}