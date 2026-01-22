import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Transacao, Pessoa, Categoria } from '../models';

const TransacoesPage: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState('Despesa');
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [transRes, pesRes, catRes] = await Promise.all([
        api.get('/Transacoes'),
        api.get('/Pessoas'),
        api.get('/Categorias'),
      ]);
      setTransacoes(transRes.data);
      setPessoas(pesRes.data);
      setCategorias(catRes.data);
    } catch (error) {
      alert('Erro ao carregar dados');
    }
  };

  const criarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Transacoes', { descricao, valor, tipo, categoriaId, pessoaId });
      setDescricao('');
      setValor(0);
      setTipo('Despesa');
      setCategoriaId(0);
      setPessoaId(0);
      carregarDados();
    } catch (error: any) {
      const msg = error.response?.data || error.message || 'Erro desconhecido';
      alert('Erro ao criar transação: ' + msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerenciar Transações</h2>

      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <form onSubmit={criarTransacao} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Valor (R$)"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                min={0.01}
                step="0.01"
                required
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                value={pessoaId}
                onChange={(e) => setPessoaId(Number(e.target.value))}
                required
              >
                <option value={0}>Selecione Pessoa</option>
                {pessoas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} ({p.idade} anos)
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={categoriaId}
                onChange={(e) => setCategoriaId(Number(e.target.value))}
                required
              >
                <option value={0}>Selecione Categoria</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.descricao} ({c.finalidade})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Registrar Transação
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Lista de Transações</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Descrição</th>
                  <th>Valor (R$)</th>
                  <th>Tipo</th>
                  <th>Pessoa</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      Nenhuma transação registrada ainda.
                    </td>
                  </tr>
                ) : (
                  transacoes.map((t) => (
                    <tr key={t.id}>
                      <td>{t.descricao}</td>
                      <td className={t.tipo === 'Receita' ? 'text-success' : 'text-danger'}>
                        {t.valor.toFixed(2)}
                      </td>
                      <td>
                        <span className={`badge bg-${t.tipo === 'Receita' ? 'success' : 'danger'}`}>
                          {t.tipo}
                        </span>
                      </td>
                      <td>{pessoas.find(p => p.id === t.pessoaId)?.nome || 'N/A'}</td>
                      <td>{categorias.find(c => c.id === t.categoriaId)?.descricao || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransacoesPage;