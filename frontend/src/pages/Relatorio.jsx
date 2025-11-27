import { useEffect, useState } from "react";
import { getAeronaves, getAeronave } from "../services/aeronavesService";

export default function Relatorio() {
  const [aeronaves, setAeronaves] = useState([]);
  const [selected, setSelected] = useState("");
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await getAeronaves();
        setAeronaves(list || []);
      } catch (err) {
        console.error("Erro ao carregar aeronaves:", err);
        alert("Erro ao carregar aeronaves (veja console).");
      }
    })();
  }, []);

  useEffect(() => {
    if (!selected) return setDetalhes(null);
    (async () => {
      setLoading(true);
      try {
        const data = await getAeronave(selected);
        setDetalhes(data || null);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        alert("Erro ao carregar detalhes da aeronave (veja console).");
      } finally { setLoading(false); }
    })();
  }, [selected]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    if (!detalhes) return alert("Selecione uma aeronave primeiro.");
    const blob = new Blob([JSON.stringify(detalhes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_aeronave_${detalhes.id || "report"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0 }}>Relatório</h2>

          <div className="field">
            <label>Escolha a aeronave</label>
            <select value={selected} onChange={e => setSelected(e.target.value)}>
              <option value="">-- selecione --</option>
              {aeronaves.map(a => <option key={a.id} value={a.id}>{a.codigo} — {a.modelo}</option>)}
            </select>
          </div>

          {loading && <div>Carregando dados...</div>}

          {detalhes && (
            <>
              <div className="card" style={{ marginTop: 12 }}>
                <h3>Aeronave</h3>
                <p><strong>Código:</strong> {detalhes.codigo}</p>
                <p><strong>Modelo:</strong> {detalhes.modelo}</p>
                <p><strong>Tipo:</strong> {detalhes.tipo}</p>
                <p><strong>Capacidade:</strong> {detalhes.capacidade ?? "-"}</p>
                <p><strong>Alcance:</strong> {detalhes.alcance ?? "-"} km</p>
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Peças</h3>
                {detalhes.pecas?.length ? (
                  <ul>
                    {detalhes.pecas.map(p => <li key={p.id}>{p.nome} — {p.status} ({p.fornecedor ?? "—"})</li>)}
                  </ul>
                ) : <p>Nenhuma peça registrada.</p>}
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Etapas</h3>
                {detalhes.etapas?.length ? (
                  <ul>
                    {detalhes.etapas.map(e => <li key={e.id}>{e.nome} — {e.status} — prazo: {e.prazo_dias ?? "-"}</li>)}
                  </ul>
                ) : <p>Nenhuma etapa registrada.</p>}
              </div>

              <div className="card" style={{ marginTop: 12 }}>
                <h3>Testes</h3>
                {detalhes.testes?.length ? (
                  <ul>
                    {detalhes.testes.map(t => <li key={t.id}>{t.tipo} — {t.resultado} — {t.observacoes ?? ""}</li>)}
                  </ul>
                ) : <p>Nenhum teste registrado.</p>}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button className="btn" onClick={handleExportJSON}>Exportar JSON</button>
                <button className="btn primary" onClick={handlePrint}>Imprimir / Gerar PDF</button>
              </div>
            </>
          )}

          {!detalhes && !loading && <div style={{ marginTop: 12 }}>Selecione uma aeronave para ver o relatório</div>}
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .grid, .grid * { visibility: visible; }
          .grid { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
