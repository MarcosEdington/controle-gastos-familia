using System.ComponentModel.DataAnnotations;

namespace ControleGastosFamiliaApi.Models
{
    public class Transacao
    {
        public int Id { get; set; }  

        [Required(ErrorMessage = "Descrição é obrigatória")]
        [StringLength(200, ErrorMessage = "Descrição pode ter no máximo 200 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "Valor é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser maior que zero")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "Tipo é obrigatório")]
        public string Tipo { get; set; } = string.Empty;  // "Despesa" ou "Receita"

        [Required(ErrorMessage = "CategoriaId é obrigatório")]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "PessoaId é obrigatório")]
        public int PessoaId { get; set; }
    }
}