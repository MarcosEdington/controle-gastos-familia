# Controle de Gastos Residenciais

Sistema completo para gerenciamento de gastos e receitas familiares, desenvolvido como avaliação técnica.

## Tecnologias Utilizadas

- **Backend**: C# .NET 8 (ASP.NET Core Web API)
- **Frontend**: React + TypeScript
- **Persistência**: Arquivos JSON (pessoas.json, categorias.json, transacoes.json) – dados mantêm após reinício
- **Estilização**: Bootstrap 5
- **Bibliotecas principais**: Axios, React Router DOM

## Funcionalidades Implementadas

- Cadastro, listagem e deleção de **Pessoas** (com deleção em cascata de transações)
- Cadastro e listagem de **Categorias** (Despesa / Receita / Ambas)
- Cadastro e listagem de **Transações** com validações:
  - Menores de 18 anos só podem registrar despesas
  - Categoria compatível com o tipo da transação
- Consulta de **totais por pessoa** + saldo geral
- Dashboard inicial dinâmico com estatísticas reais

## Como Rodar o Projeto

### Pré-requisitos

- .NET 8 SDK
- Node.js 18+ e npm

### Backend (.NET API)

1. Abra a solução no Visual Studio
2. Restaure os pacotes NuGet
3. Pressione F5 para rodar (porta padrão: https://localhost:7064)

### Frontend (React + TypeScript)

1. Entre na pasta frontend:
   ```bash
   cd frontend
