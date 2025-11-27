// Final/src/pages/Pecas.jsx
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { getPecas, createPeca, deletePeca } from "../services/pecasService";
import { getAeronaves } from "../services/aeronavesService";

export default function Pecas(){
  const [open,setOpen] = useState(false);
  const [pecas,setPecas] = useState([]);
  const [aeronaves,setAeronaves] = useState([]);
  const [loading,setLoading] = useState(false);
  const [saving,setSaving] = useState(false);

  // form fields
  const [aeronaveId,setAeronaveId] = useState("");
  const [nome,setNome] = useState("");
  const [tipo,setTipo] = useState("NACIONAL");
  const [fornecedor,setFornecedor] = useState("");
  const [status,setStatus] = useState("PRONTA");

  const load = async ()=>{
    setLoading(true);
    try{
      const [p, a] = await Promise.all([getPecas(), getAeronaves()]);
      setPecas(p || []);
      setAeronaves(a || []);
    }catch(err){
      console.error(err);
      alert("Erro ao carregar peças (veja console).");
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ load(); },[]);

  const handleCreate = async (e) =>{
    e.preventDefault();
    setSaving(true);
    try{
      const payload = {
        aeronaveId: Number(aeronaveId),
        nome,
        tipo,
        fornecedor,
        status
      };
      await createPeca(payload);
      setOpen(false);
      await load();
    }catch(err){
      console.error(err);
      alert("Erro ao criar peça (veja console).");
    }finally{ setSaving(false); }
  };

  const handleDelete = async (id) => {
    if(!confirm("Deseja excluir?")) return;
    try{ await deletePeca(id); await load(); }catch(err){ console.error(err); alert("Erro ao excluir."); }
  };

  return (
    <div className="grid">
      <button className="btn" onClick={()=>setOpen(true)}>+ Nova Peça</button>
      <button className="btn" onClick={load} style={{marginLeft:8}}>Atualizar</button>

      <div style={{marginTop:12}}>
        {loading ? <div>Carregando...</div> : (
          <div className="table">
            <table>
              <thead><tr><th>ID</th><th>Nome</th><th>Aeronave</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {pecas.length===0 && <tr><td colSpan={5}>Nenhuma peça cadastrada.</td></tr>}
                {pecas.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{aeronaves.find(a=>a.id===p.aeronaveId)?.codigo ?? p.aeronaveId}</td>
                    <td>{p.status}</td>
                    <td style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                      <button className="btn" onClick={()=>handleDelete(p.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <Modal title="Nova Peça" onClose={()=>setOpen(false)}>
          <form onSubmit={handleCreate} style={{minWidth:360}}>
            <div className="field">
              <label>Aeronave</label>
              <select value={aeronaveId} onChange={e=>setAeronaveId(e.target.value)} required>
                <option value="">-- selecione --</option>
                {aeronaves.map(a=> <option key={a.id} value={a.id}>{a.codigo} — {a.modelo}</option>)}
              </select>
            </div>

            <div className="field"><label>Nome</label><input value={nome} onChange={e=>setNome(e.target.value)} required /></div>

            <div className="field"><label>Tipo</label>
              <select value={tipo} onChange={e=>setTipo(e.target.value)}>
                <option>NACIONAL</option>
                <option>IMPORTADA</option>
              </select>
            </div>

            <div className="field"><label>Fornecedor</label><input value={fornecedor} onChange={e=>setFornecedor(e.target.value)} /></div>

            <div className="field"><label>Status</label>
              <select value={status} onChange={e=>setStatus(e.target.value)}>
                <option>EM_PRODUCAO</option>
                <option>EM_TRANSPORTE</option>
                <option>PRONTA</option>
              </select>
            </div>

            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn primary" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
              <button type="button" className="btn" onClick={()=>setOpen(false)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
