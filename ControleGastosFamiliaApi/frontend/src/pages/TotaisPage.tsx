import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TotalPorPessoa, TotalGeral } from '../models';

const TotaisPage: React.FC = () => {
  const [totaisPorPessoa, setTotaisPorPessoa] = useState<TotalPorPessoa[]>([]);
  const [totalGeral, setTotalGeral] = useState<TotalGeral>({ totalReceitas: 0, totalDespesas: 0, saldo: 0 });

  useEffect(() => {
    carregarTotais();
  }, []);

  const carregarTotais = async () => {
    try {
      const response = await api.get('/Totais/Pessoas');
      setTotaisPorPessoa(response.data.totaisPorPessoa);
      setTotalGeral(response.data.totalGeral);
    } catch (error) {
      alert('Erro ao carregar totais');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Totais por Pessoa</h2>

      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Nome</th>
                  <th>Receitas (R$)</th>
                  <th>Despesas (R$)</th>
                  <th>Saldo (R$)</th>
                </tr>
              </thead>
              <tbody>
                {totaisPorPessoa.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Nenhum dado disponível. Cadastre pessoas e transações.
                    </td>
                  </tr>
                ) : (
                  totaisPorPessoa.map((tp) => (
                    <tr key={tp.id}>
                      <td>{tp.nome}</td>
                      <td className="text-success">{tp.totalReceitas.toFixed(2)}</td>
                      <td className="text-danger">{tp.totalDespesas.toFixed(2)}</td>
                      <td className={tp.saldo >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                        {tp.saldo.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Total Geral da Residência</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-4">
              <h6>Receitas</h6>
              <p className="fs-4 text-success fw-bold">{totalGeral.totalReceitas.toFixed(2)}</p>
            </div>
            <div className="col-md-4">
              <h6>Despesas</h6>
              <p className="fs-4 text-danger fw-bold">{totalGeral.totalDespesas.toFixed(2)}</p>
            </div>
            <div className="col-md-4">
              <h6>Saldo Líquido</h6>
              <p className={`fs-4 fw-bold ${totalGeral.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalGeral.saldo.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotaisPage;