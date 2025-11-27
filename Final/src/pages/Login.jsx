import { Link } from "react-router-dom";
export default function Login(){
  return (
    <div style={{maxWidth:420, margin:'100px auto'}} className="card">
      <div className="card" style={{padding:20}}>
        <h2 style={{marginTop:0}}>Entrar</h2>
        <div className="form">
          <div className="field"><label>Usuário</label><input placeholder="Digite seu usuário"/></div>
          <div className="field"><label>Senha</label><input type="password" placeholder="Digite sua senha"/></div>
          <Link to="/dashboard" className="btn primary">Acessar</Link>
        </div>
      </div>
    </div>
  );
}