using Microsoft.AspNetCore.Mvc;
using ControleGastosFamiliaApi.Models;
using ControleGastosFamiliaApi.Repositories;
using System.Linq;

namespace ControleGastosFamiliaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotaisController : ControllerBase
    {
        private readonly RepositorioJson<Pessoa> _repoPessoas = new("pessoas");
        private readonly RepositorioJson<Transacao> _repoTransacoes = new("transacoes");

        // GET: api/Totais/Pessoas
        // Retorna totais por pessoa + total geral
        [HttpGet("Pessoas")]
        public ActionResult<object> GetTotaisPorPessoa()
        {
            var pessoas = _repoPessoas.Carregar();
            var transacoes = _repoTransacoes.Carregar();

            // Calcula totais por pessoa
            var totaisPorPessoa = pessoas.Select(p =>
            {
                var transacoesDaPessoa = transacoes.Where(t => t.PessoaId == p.Id).ToList();

                var totalReceitas = transacoesDaPessoa
                    .Where(t => t.Tipo == "Receita")
                    .Sum(t => t.Valor);

                var totalDespesas = transacoesDaPessoa
                    .Where(t => t.Tipo == "Despesa")
                    .Sum(t => t.Valor);

                return new
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = totalReceitas - totalDespesas
                };
            }).ToList();

            // Total geral (soma de todos)
            var totalGeralReceitas = totaisPorPessoa.Sum(t => t.TotalReceitas);
            var totalGeralDespesas = totaisPorPessoa.Sum(t => t.TotalDespesas);
            var totalGeralSaldo = totalGeralReceitas - totalGeralDespesas;

            var resultado = new
            {
                TotaisPorPessoa = totaisPorPessoa,
                TotalGeral = new
                {
                    TotalReceitas = totalGeralReceitas,
                    TotalDespesas = totalGeralDespesas,
                    Saldo = totalGeralSaldo
                }
            };

            return Ok(resultado);
        }
    }
}