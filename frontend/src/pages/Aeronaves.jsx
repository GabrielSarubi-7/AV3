import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import { getAeronaves, createAeronave, deleteAeronave } from "../services/aeronavesService";
import useAuth from "../hooks/useAuth";

export default function Aeronaves() {
  const { me, canCreateAeronaves, canDelete } = useAuth();

  const [open, setOpen] = useState(false);
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const [codigo, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("COMERCIAL");
  const [capacidade, setCapacidade] = useState("");
  const [alcance, setAlcance] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAeronaves();
      setAeronaves(data || []);
    } catch (err) {
      console.error("Erro ao carregar aeronaves:", err);
      alert("Erro ao carregar aeronaves (veja console).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleOpenNew = () => {
    setCodigo(""); setModelo(""); setTipo("COMERCIAL"); setCapacidade(""); setAlcance("");
    setOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if(!canCreateAeronaves){ alert("Você não tem permissão para criar aeronaves."); return; }
    setSaving(true);
    try {
      const payload = {
        codigo,
        modelo,
        tipo,
        capacidade: capacidade ? Number(capacidade) : null,
        alcance: alcance ? Number(alcance) : null
      };
      await createAeronave(payload);
      setOpen(false);
      await load();
    } catch (err) {
      console.error("Erro ao criar aeronave:", err);
      alert("Erro ao criar aeronave (veja console).");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if(!canDelete){ alert("Você não tem permissão para excluir aeronaves."); return; }
    if (!confirm("Deseja realmente excluir este registro?")) return;
    try {
      await deleteAeronave(id);
      await load();
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao deletar (veja console).");
    }
  };

  return (
    <div className="grid">
      {canCreateAeronaves ? (
        <button className="btn" onClick={handleOpenNew}>+ Nova Aeronave</button>
      ) : (
        <button className="btn" disabled style={{opacity:0.6}}>+ Nova Aeronave</button>
      )}

      <button className="btn" onClick={load} style={{ marginLeft: 8 }}>Atualizar</button>

      {!canCreateAeronaves && (
        <div style={{marginTop:8, color:"#c9d1d9"}}>Você não tem permissão para criar aeronaves.</div>
      )}

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="table">
            <table>
              <thead>
                <tr><th>ID</th><th>Código</th><th>Modelo</th><th>Tipo</th><th></th></tr>
              </thead>
              <tbody>
                {aeronaves.length === 0 && <tr><td colSpan={5}>Nenhuma aeronave cadastrada.</td></tr>}
                {aeronaves.map(a => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.codigo}</td>
                    <td>{a.modelo}</td>
                    <td>{a.tipo}</td>
                    <td style={{display:"flex", gap:8, justifyContent:"flex-end"}}>
                      <Link to={`/aeronaves/${a.id}`} className="btn small">Detalhes</Link>
                      {canDelete ? (
                        <button className="btn" onClick={() => handleDelete(a.id)}>Excluir</button>
                      ) : (
                        <button className="btn" disabled style={{opacity:0.6}}>Excluir</button>
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
        <Modal title="Nova Aeronave" onClose={() => setOpen(false)}>
          <form onSubmit={handleCreate} style={{ minWidth: 360 }}>
            <div className="field"><label>Código</label><input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="AC-001" required /></div>
            <div className="field"><label>Modelo</label><input value={modelo} onChange={e => setModelo(e.target.value)} placeholder="E195-E2" required /></div>
            <div className="field"><label>Tipo</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)}>
                <option>COMERCIAL</option>
                <option>MILITAR</option>
              </select>
            </div>
            <div className="field"><label>Capacidade</label><input type="number" value={capacidade} onChange={e => setCapacidade(e.target.value)} placeholder="132" /></div>
            <div className="field"><label>Alcance (km)</label><input type="number" value={alcance} onChange={e => setAlcance(e.target.value)} placeholder="2600" /></div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn primary" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
