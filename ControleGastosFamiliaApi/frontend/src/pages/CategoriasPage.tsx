import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Categoria } from '../models';

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState('Ambas');

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const response = await api.get('/Categorias');
      setCategorias(response.data);
    } catch (error) {
      alert('Erro ao carregar categorias');
    }
  };

  const criarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/Categorias', { descricao, finalidade });
      setDescricao('');
      setFinalidade('Ambas');
      carregarCategorias();
    } catch (error) {
      alert('Erro ao criar categoria');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerenciar Categorias</h2>

      <div className="card mb-5 shadow-sm">
        <div className="card-body">
          <form onSubmit={criarCategoria} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição da categoria"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={finalidade}
                onChange={(e) => setFinalidade(e.target.value)}
              >
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
                <option value="Ambas">Ambas</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Lista de Categorias</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Descrição</th>
                  <th>Finalidade</th>
                </tr>
              </thead>
              <tbody>
                {categorias.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-4">
                      Nenhuma categoria cadastrada ainda.
                    </td>
                  </tr>
                ) : (
                  categorias.map((c) => (
                    <tr key={c.id}>
                      <td>{c.descricao}</td>
                      <td>
                        <span className={`badge bg-${c.finalidade === 'Despesa' ? 'danger' : c.finalidade === 'Receita' ? 'success' : 'warning'}`}>
                          {c.finalidade}
                        </span>
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

export default CategoriasPage;