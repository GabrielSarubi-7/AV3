// Final/src/pages/Testes.jsx
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { getTestes, createTeste, deleteTeste } from "../services/testesService";
import { getAeronaves } from "../services/aeronavesService";

export default function Testes() {
  const [open, setOpen] = useState(false);
  const [testes, setTestes] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [aeronaveId, setAeronaveId] = useState("");
  const [tipo, setTipo] = useState("ELETRICO");
  const [resultado, setResultado] = useState("APROVADO");
  const [observacoes, setObservacoes] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [t, a] = await Promise.all([getTestes(), getAeronaves()]);
      setTestes(t || []);
      setAeronaves(a || []);
    } catch (err) {
      console.error("Erro ao carregar testes:", err);
      alert("Erro ao carregar testes (veja console).");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { aeronaveId: Number(aeronaveId), tipo, resultado, observacoes };
      await createTeste(payload);
      setOpen(false);
      await load();
    } catch (err) {
      console.error("Erro ao criar teste:", err);
      alert("Erro ao criar teste (veja console).");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir teste?")) return;
    try { await deleteTeste(id); await load(); } catch (err) { console.error(err); alert("Erro ao excluir"); }
  };

  return (
    <div className="grid">
      <button className="btn" onClick={() => setOpen(true)}>+ Registrar Teste</button>
      <button className="btn" onClick={load} style={{ marginLeft: 8 }}>Atualizar</button>

      <div style={{ marginTop: 12 }}>
        {loading ? <div>Carregando...</div> : (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aeronave</th>
                  <th>Tipo</th>
                  <th>Resultado</th>
                  <th>Observações</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {testes.length === 0 && <tr><td colSpan={7}>Nenhum teste registrado.</td></tr>}
                {testes.map(t => {
                  const av = aeronaves.find(a => a.id === t.aeronaveId);
                  return (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{av ? `${av.codigo} — ${av.modelo}` : t.aeronaveId}</td>
                      <td>{t.tipo}</td>
                      <td>{t.resultado}</td>
                      <td style={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.observacoes}</td>
                      <td>{t.created_at ? new Date(t.created_at).toLocaleString() : "-"}</td>
                      <td style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="btn" onClick={() => handleDelete(t.id)}>Excluir</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <Modal title="Registrar Teste" onClose={() => setOpen(false)}>
          <form onSubmit={handleCreate} style={{ minWidth: 360 }}>
            <div className="field">
              <label>Aeronave</label>
              <select value={aeronaveId} onChange={e => setAeronaveId(e.target.value)} required>
                <option value="">-- selecione --</option>
                {aeronaves.map(a => <option key={a.id} value={a.id}>{a.codigo} — {a.modelo}</option>)}
              </select>
            </div>

            <div className="field"><label>Tipo</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)}>
                <option>ELETRICO</option>
                <option>HIDRAULICO</option>
                <option>AERODINAMICO</option>
              </select>
            </div>

            <div className="field"><label>Resultado</label>
              <select value={resultado} onChange={e => setResultado(e.target.value)}>
                <option>APROVADO</option>
                <option>REPROVADO</option>
              </select>
            </div>

            <div className="field"><label>Observações</label><input value={observacoes} onChange={e => setObservacoes(e.target.value)} /></div>

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
