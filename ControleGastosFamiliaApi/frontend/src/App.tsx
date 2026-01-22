import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PessoasPage from './pages/PessoasPage';
import CategoriasPage from './pages/CategoriasPage';
import TransacoesPage from './pages/TransacoesPage';
import TotaisPage from './pages/TotaisPage';
import api from './services/api';

function App() {
  const [stats, setStats] = useState({
    pessoas: 0,
    categorias: 0,
    transacoes: 0,
    saldoTotal: 0,
  });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const [pessoasRes, categoriasRes, transacoesRes, totaisRes] = await Promise.all([
          api.get('/Pessoas'),
          api.get('/Categorias'),
          api.get('/Transacoes'),
          api.get('/Totais/Pessoas'),
        ]);

        const pessoasCount = pessoasRes.data.length;
        const categoriasCount = categoriasRes.data.length;
        const transacoesCount = transacoesRes.data.length;

        const saldo = totaisRes.data.totalGeral?.saldo || 0;

        setStats({
          pessoas: pessoasCount,
          categorias: categoriasCount,
          transacoes: transacoesCount,
          saldoTotal: saldo,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas da dashboard:', error);
        // Pode deixar os valores em 0 ou mostrar uma mensagem
      }
    };

    carregarEstatisticas();
  }, []);

  return (
    <Router>
      {/* Navbar fixo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            <i className="bi bi-wallet2 me-2"></i> Controle de Gastos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pessoas">Pessoas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categorias">Categorias</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transacoes">Transações</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/totais">Totais</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container mt-5 mb-5">
        <Routes>
          {/* Dashboard dinâmico na raiz */}
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="display-4 fw-bold mb-4 text-primary">
                  <i className="bi bi-house-door-fill me-3"></i>
                  Bem-vindo ao Controle de Gastos Residenciais
                </h1>
                <p className="lead text-muted mb-5">
                  Gerencie suas finanças familiares de forma simples e organizada.
                </p>

                {/* Cards com valores reais da API */}
                <div className="row g-4 mb-5">
                  <div className="col-md-3">
                    <div className="card shadow border-0 h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
                        <h5 className="card-title">Pessoas Cadastradas</h5>
                        <p className="card-text fs-3 fw-bold">{stats.pessoas}</p>
                        <Link to="/pessoas" className="btn btn-outline-primary">
                          Gerenciar Pessoas
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card shadow border-0 h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-tags-fill display-4 text-success mb-3"></i>
                        <h5 className="card-title">Categorias</h5>
                        <p className="card-text fs-3 fw-bold">{stats.categorias}</p>
                        <Link to="/categorias" className="btn btn-outline-success">
                          Gerenciar Categorias
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card shadow border-0 h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-cash-stack display-4 text-danger mb-3"></i>
                        <h5 className="card-title">Transações Registradas</h5>
                        <p className="card-text fs-3 fw-bold">{stats.transacoes}</p>
                        <Link to="/transacoes" className="btn btn-outline-danger">
                          Ver Transações
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card shadow border-0 border-primary h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-graph-up-arrow display-4 text-info mb-3"></i>
                        <h5 className="card-title">Saldo Atual</h5>
                        <p className={`card-text fs-3 fw-bold ${stats.saldoTotal >= 0 ? 'text-success' : 'text-danger'}`}>
                          R$ {stats.saldoTotal.toFixed(2)}
                        </p>
                        <Link to="/totais" className="btn btn-outline-info">
                          Ver Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão principal */}
                <div className="mt-5">
                  <Link to="/transacoes" className="btn btn-primary btn-lg px-5 py-3 shadow-lg">
                    <i className="bi bi-plus-circle me-2"></i> Registrar Nova Transação
                  </Link>
                </div>
              </div>
            }
          />

          <Route path="/pessoas" element={<PessoasPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/totais" element={<TotaisPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-1">
            Desenvolvido por Marcos Henrique – Avaliação Técnica
          </p>
          <small className="text-muted">Dados salvos em JSON – persistem após reinício</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;