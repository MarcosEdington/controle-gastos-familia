using System.ComponentModel.DataAnnotations;

namespace ControleGastosFamiliaApi.Models
{
    public class Categoria
    {
        public int Id { get; set; }  

        [Required(ErrorMessage = "Descrição é obrigatória")]
        [StringLength(100, ErrorMessage = "Descrição pode ter no máximo 100 caracteres")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "Finalidade é obrigatória")]
        public string Finalidade { get; set; } = string.Empty;  // "Despesa", "Receita" ou "Ambas"
    }
}