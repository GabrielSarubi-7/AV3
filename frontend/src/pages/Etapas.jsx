import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { 
  getEtapas, 
  createEtapa, 
  deleteEtapa 
} from "../services/etapasService";

import { getAeronaves } from "../services/aeronavesService";
import { getFuncionarios } from "../services/funcionariosService";

export default function Etapas(){

  const [open,setOpen] = useState(false);
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);

  const [aeronaves,setAeronaves] = useState([]);
  const [funcs,setFuncs] = useState([]);

  const [aeronaveId,setAeronaveId] = useState("");
  const [nome,setNome] = useState("");
  const [prazo,setPrazo] = useState("");
  const [status,setStatus] = useState("PENDENTE");
  const [responsaveis,setResponsaveis] = useState([]);

  const [saving,setSaving] = useState(false);

  const [me, setMe] = useState(null);
  useEffect(()=> {
    try{
      const raw = localStorage.getItem("aerocode_user");
      if (raw) setMe(JSON.parse(raw));
    }catch{}
  }, []);

  const perm = (me?.permissao || "").toUpperCase();
  const canList = ["ADMIN","ENGENHEIRO"].includes(perm);
  const canCreate = ["ADMIN","ENGENHEIRO"].includes(perm);
  const canDelete = perm === "ADMIN";

  const load = async ()=>{
    setLoading(true);
    try{
      if(canList){
        setItems(await getEtapas());
      }
      setAeronaves(await getAeronaves());
      setFuncs(await getFuncionarios());
    }catch(e){
      console.error(e);
      alert("Erro ao carregar etapas");
    }
    setLoading(false);
  };

  useEffect(()=>{ load(); },[me]);


  const handleCreate = async (e)=>{
    e.preventDefault();
    setSaving(true);

    try{
      await createEtapa({
        aeronaveId: Number(aeronaveId),
        nome,
        prazo_dias: Number(prazo),
        status,
        responsaveis: responsaveis.join(", ")
      });

      setOpen(false);
      setAeronaveId("");
      setNome("");
      setPrazo("");
      setStatus("PENDENTE");
      setResponsaveis([]);

      await load();

    }catch(e){
      console.error(e);
      alert("Erro ao criar etapa");
    }

    setSaving(false);
  };


  const handleDelete = async (id)=>{
    if(!confirm("Excluir etapa?")) return;
    try{
      await deleteEtapa(id);
      await load();
    }catch(e){
      console.error(e);
      alert("Erro ao excluir etapa");
    }
  };


  return (
    <div className="grid">

      {canCreate && (
        <button className="btn" onClick={()=>setOpen(true)}>+ Nova Etapa</button>
      )}

      <button className="btn" onClick={load} style={{marginLeft:8}}>Atualizar</button>

      <div style={{marginTop:12}}>
        {!canList ? (
          <div className="card" style={{padding:16}}>
            Você não tem permissão para visualizar etapas.
          </div>
        ) : loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aeronave</th>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Prazo</th>
                  <th>Responsáveis</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr><td colSpan={7}>Nenhuma etapa cadastrada.</td></tr>
                )}

                {items.map(et => (
                  <tr key={et.id}>
                    <td>{et.id}</td>
                    <td>{et.aeronave?.codigo} — {et.aeronave?.modelo}</td>
                    <td>{et.nome}</td>
                    <td>{et.status}</td>
                    <td>{et.prazo_dias}</td>
                    <td>{et.responsaveis}</td>
                    <td>
                      {canDelete ? (
                        <button className="btn" onClick={()=>handleDelete(et.id)}>Excluir</button>
                      ) : (
                        <span style={{opacity:0.6,fontSize:12}}>Sem permissão</span>
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>


      {open && (
        <Modal title="Nova Etapa" onClose={()=>setOpen(false)}>
          <form onSubmit={handleCreate} style={{minWidth:360}}>

            <div className="field">
              <label>Aeronave</label>
              <select value={aeronaveId} onChange={e=>setAeronaveId(e.target.value)} required>
                <option value="">Selecione...</option>
                {aeronaves.map(a=>(
                  <option key={a.id} value={a.id}>
                    {a.codigo} — {a.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Nome</label>
              <input value={nome} onChange={e=>setNome(e.target.value)} required />
            </div>

            <div className="field">
              <label>Prazo (dias)</label>
              <input type="number" value={prazo} onChange={e=>setPrazo(e.target.value)} required />
            </div>

            <div className="field">
              <label>Status</label>
              <select value={status} onChange={e=>setStatus(e.target.value)} required>
                <option value="PENDENTE">PENDENTE</option>
                <option value="ANDAMENTO">ANDAMENTO</option>
                <option value="CONCLUIDO">CONCLUÍDO</option>
              </select>
            </div>

            <div className="field">
              <label>Responsáveis</label>
              <select 
                multiple
                value={responsaveis}
                onChange={e => {
                  const selected = [...e.target.selectedOptions].map(o => o.value);
                  setResponsaveis(selected);
                }}
              >
                {funcs.map(f=>(
                  <option key={f.id} value={f.nome}>
                    {f.nome} ({f.permissao})
                  </option>
                ))}
              </select>
              <small>Segure CTRL para selecionar vários</small>
            </div>

            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn primary" disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
              <button className="btn" type="button" onClick={()=>setOpen(false)}>Cancelar</button>
            </div>

          </form>
        </Modal>
      )}

    </div>
  );
}
