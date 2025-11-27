// Final/src/pages/Funcionarios.jsx
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { getFuncionarios, createFuncionario, deleteFuncionario } from "../services/funcionariosService";

export default function Funcionarios(){
  const [open,setOpen] = useState(false);
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);

  const [nome,setNome] = useState("");
  const [telefone,setTelefone] = useState("");
  const [endereco,setEndereco] = useState("");
  const [usuario,setUsuario] = useState("");
  const [senha,setSenha] = useState("");
  const [permissao,setPermissao] = useState("OPERADOR");
  const [saving,setSaving] = useState(false);

  const load = async ()=> {
    setLoading(true);
    try { setItems(await getFuncionarios()); } catch(e){ console.error(e); alert("Erro"); }
    setLoading(false);
  };
  useEffect(()=>{ load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      await createFuncionario({ nome, telefone, endereco, usuario, senha, permissao });
      setOpen(false); await load();
    } catch(e){ console.error(e); alert("Erro ao criar"); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if(!confirm("Excluir funcionário?")) return;
    try { await deleteFuncionario(id); await load(); } catch(e){ console.error(e); alert("Erro"); }
  };

  return (
    <div className="grid">
      <button className="btn" onClick={()=>setOpen(true)}>+ Novo Funcionário</button>
      <button className="btn" onClick={load} style={{marginLeft:8}}>Atualizar</button>

      <div style={{marginTop:12}}>
        {loading ? <div>Carregando...</div> : (
          <div className="table">
            <table>
              <thead><tr><th>ID</th><th>Nome</th><th>Usuário</th><th>Permissão</th><th></th></tr></thead>
              <tbody>
                {items.length===0 && <tr><td colSpan={5}>Nenhum funcionário cadastrado.</td></tr>}
                {items.map(i=>(
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.nome}</td>
                    <td>{i.usuario}</td>
                    <td>{i.permissao}</td>
                    <td><button className="btn" onClick={()=>handleDelete(i.id)}>Excluir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <Modal title="Novo Funcionário" onClose={()=>setOpen(false)}>
          <form onSubmit={handleCreate} style={{minWidth:360}}>
            <div className="field"><label>Nome</label><input value={nome} onChange={e=>setNome(e.target.value)} required/></div>
            <div className="field"><label>Telefone</label><input value={telefone} onChange={e=>setTelefone(e.target.value)}/></div>
            <div className="field"><label>Endereço</label><input value={endereco} onChange={e=>setEndereco(e.target.value)}/></div>
            <div className="field"><label>Usuário</label><input value={usuario} onChange={e=>setUsuario(e.target.value)} required/></div>
            <div className="field"><label>Senha</label><input value={senha} onChange={e=>setSenha(e.target.value)} type="password" required/></div>
            <div className="field"><label>Permissão</label><input value={permissao} onChange={e=>setPermissao(e.target.value)}/></div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn primary" type="submit" disabled={saving}>{saving?"Salvando...":"Salvar"}</button>
              <button className="btn" type="button" onClick={()=>setOpen(false)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
