import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Se você tiver um CSS custom, mantenha
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importa o CSS do Bootstrap (essencial)
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa o JS do Bootstrap (necessário para dropdowns, modais, tooltips, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Fundo suave e centralização geral */}
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Container principal com margem superior para navbar futura */}
      <div className="container-fluid p-0 flex-grow-1">
        <App />
      </div>

      {/* Footer simples e opcional (pode remover se não quiser) */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">
            Controle de Gastos Residenciais &copy; {new Date().getFullYear()} - Feito para avaliação técnica
          </p>
        </div>
      </footer>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();