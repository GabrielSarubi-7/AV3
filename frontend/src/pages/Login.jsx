import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login(){
  const [usuario,setUsuario]=useState("");
  const [senha,setSenha]=useState("");
  const nav=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await login({usuario,senha});
      localStorage.setItem("aerocode_token", res.token);
      localStorage.setItem("aerocode_user", JSON.stringify(res.user));
      nav("/dashboard");
    }catch(err){
      alert(err?.response?.data?.error || "Erro no login");
    }
  };

  return (
    <div style={{maxWidth:420, margin:"100px auto"}} className="card">
      <div className="card" style={{padding:20}}>
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="field"><label>Usuário</label><input value={usuario} onChange={e=>setUsuario(e.target.value)} required /></div>
          <div className="field"><label>Senha</label><input type="password" value={senha} onChange={e=>setSenha(e.target.value)} required /></div>
          <button className="btn primary" type="submit">Acessar</button>
        </form>
      </div>
    </div>
  );
}
