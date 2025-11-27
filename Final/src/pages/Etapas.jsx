// Final/src/pages/Etapas.jsx
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { getEtapas, createEtapa, deleteEtapa } from "../services/etapasService";
import { getAeronaves } from "../services/aeronavesService";
import { getFuncionarios } from "../services/funcionariosService";

export default function Etapas(){
  const [open,setOpen] = useState(false);
  const [etapas,setEtapas] = useState([]);
  const [aeronaves,setAeronaves] = useState([]);
  const [funcionarios,setFuncionarios] = useState([]);
  const [loading,setLoading] = useState(false);
  const [saving,setSaving] = useState(false);

  const [aeronaveId,setAeronaveId] = useState("");
  const [nome,setNome] = useState("");
  const [prazo,setPrazo] = useState("");
  const [status,setStatus] = useState("PENDENTE");
  const [responsaveis,setResponsaveis] = useState([]); // array de ids

  const load = async ()=>{
    setLoading(true);
    try{
      const [et, a, f] = await Promise.all([getEtapas(), getAeronaves(), getFuncionarios()]);
      setEtapas(et || []);
      setAeronaves(a || []);
      setFuncionarios(f || []);
    }catch(err){ console.error(err); alert("Erro ao carregar (veja console)."); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ load(); },[]);

  const handleCreate = async (e) =>{
    e.preventDefault();
    setSaving(true);
    try{
      const payload = {
        aeronaveId: Number(aeronaveId),
        nome,
        prazo_dias: prazo ? Number(prazo) : null,
        status,
        responsaveis: responsaveis.join(";") // armazenar como string separada por ; (ajuste conforme backend)
      };
      await createEtapa(payload);
      setOpen(false);
      await load();
    }catch(err){ console.error(err); alert("Erro ao criar etapa"); }
    finally{ setSaving(false); }
  };

  const handleDelete = async (id) => {
    if(!confirm("Excluir etapa?")) return;
    try{ await deleteEtapa(id); await load(); }catch(err){ console.error(err); alert("Erro ao excluir"); }
  };

  return (
    <div className="grid">
      <button className="btn" onClick={()=>setOpen(true)}>+ Nova Etapa</button>
      <button className="btn" onClick={load} style={{marginLeft:8}}>Atualizar</button>

      <div style={{marginTop:12}}>
        {loading ? <div>Carregando...</div> : (
          <div className="placeholder">[Tabela de etapas — implemente visual conforme quiser]</div>
        )}
      </div>

      {open && (
        <Modal title="Nova Etapa" onClose={()=>setOpen(false)}>
          <form onSubmit={handleCreate} style={{minWidth:360}}>
            <div className="field">
              <label>Aeronave (código)</label>
              <select value={aeronaveId} onChange={e=>setAeronaveId(e.target.value)} required>
                <option value="">-- selecione --</option>
                {aeronaves.map(a=> <option key={a.id} value={a.id}>{a.codigo} — {a.modelo}</option>)}
              </select>
            </div>

            <div className="field"><label>Nome da etapa</label><input value={nome} onChange={e=>setNome(e.target.value)} required/></div>

            <div className="field"><label>Prazo (dias)</label><input type="number" value={prazo} onChange={e=>setPrazo(e.target.value)} /></div>

            <div className="field"><label>Status</label>
              <select value={status} onChange={e=>setStatus(e.target.value)}>
                <option>PENDENTE</option>
                <option>ANDAMENTO</option>
                <option>CONCLUIDA</option>
              </select>
            </div>

            <div className="field">
              <label>Responsáveis (segure Ctrl para múltipla seleção)</label>
              <select multiple value={responsaveis.map(String)} onChange={e=>{
                const opts = Array.from(e.target.selectedOptions).map(o=>o.value);
                setResponsaveis(opts);
              }}>
                {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
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
