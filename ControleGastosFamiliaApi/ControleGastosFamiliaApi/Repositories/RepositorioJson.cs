using System.Text.Json;
using System.Collections.Generic;
using System.IO;

namespace ControleGastosFamiliaApi.Repositories
{
    public class RepositorioJson<T> where T : class
    {
        private readonly string _arquivo;

        public RepositorioJson(string nomeArquivo)
        {
            _arquivo = Path.Combine(Directory.GetCurrentDirectory(), $"{nomeArquivo}.json");
            if (!File.Exists(_arquivo))
            {
                Salvar(new List<T>());  // Cria arquivo vazio se não existir
            }
        }

        public List<T> Carregar()
        {
            var json = File.ReadAllText(_arquivo);
            return JsonSerializer.Deserialize<List<T>>(json) ?? new List<T>();
        }

        public void Salvar(List<T> dados)
        {
            var json = JsonSerializer.Serialize(dados, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_arquivo, json);
        }
    }
}