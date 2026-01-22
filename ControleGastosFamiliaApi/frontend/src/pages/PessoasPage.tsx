import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Pessoa } from '../models';

const PessoasPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number>(0);

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      const response = await api.get('/Pessoas');
      setPessoas(response.data);
    } catch (error) {
      alert('Erro ao carregar pessoas');
    }
  };

  const criarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Pessoas', { nome, idade });
      setNome('');
      setIdade(0);
      carregarPessoas();
    } catch (error) {
      alert('Erro ao criar pessoa');
    }
  };

  const deletarPessoa = async (id: number) => {
    if (!window.confirm('Tem certeza? Todas transações serão apagadas.')) return;
    try {
      await api.delete(`/Pessoas/${id}`);
      carregarPessoas();
    } catch (error) {
      alert('Erro ao deletar');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerenciar Pessoas</h2>

      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <form onSubmit={criarPessoa} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                min={0}
                required
              />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-success w-100">
                Adicionar Pessoa
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Lista de Pessoas</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Nenhuma pessoa cadastrada ainda.
                    </td>
                  </tr>
                ) : (
                  pessoas.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.idade} anos</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deletarPessoa(p.id)}
                        >
                          Deletar
                        </button>
                      </td>
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

export default PessoasPage;