using System.ComponentModel.DataAnnotations;

namespace ControleGastosFamiliaApi.Models
{
    public class Pessoa
    {
        public int Id { get; set; } 

        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Idade é obrigatória")]
        [Range(0, 120, ErrorMessage = "Idade deve ser entre 0 e 120 anos")]
        public int Idade { get; set; }

        // Relação: uma pessoa pode ter várias transações (opcional manter, mas não obrigatório para JSON)
        public List<Transacao> Transacoes { get; set; } = new();
    }
}