import { Outlet, NavLink } from "react-router-dom";
export default function Layout(){
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><div className="logo">✈</div><strong>AEROCODE</strong></div>
        <nav className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/aeronaves">Aeronaves</NavLink>
          <NavLink to="/pecas">Peças</NavLink>
          <NavLink to="/etapas">Etapas</NavLink>
          <NavLink to="/funcionarios">Funcionários</NavLink>
          <NavLink to="/testes">Testes</NavLink>
          <NavLink to="/relatorio">Relatório</NavLink>
        </nav>
      </aside>
      <div>
        <header className="header">
          <strong>Aerocode</strong>
          <a className="btn" href="/login">Logout</a>
        </header>
        <main className="content"><Outlet/></main>
      </div>
    </div>
  );
}