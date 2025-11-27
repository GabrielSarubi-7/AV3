// Final/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  getAeronaves
} from "../services/aeronavesService";
import { getPecas } from "../services/pecasService";
import { getEtapas } from "../services/etapasService";
import { getTestes } from "../services/testesService";
import { getFuncionarios } from "../services/funcionariosService";

function Card({ title, value, small }) {
  return (
    <div className="card" style={{ padding: 16, minWidth: 180 }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{title}</div>
      <div style={{ fontSize: small ? 22 : 34, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}

/* simple svg bar chart - expects data: [{label, value}] */
function BarChart({ data, width = 600, height = 140 }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = Math.floor(width / data.length) - 8;
  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const barH = Math.round((d.value / max) * (height - 40));
        const x = i * (barW + 8) + 20;
        const y = height - barH - 20;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill="rgba(29,140,231,0.9)"></rect>
            <text x={x + barW / 2} y={height - 6} fontSize="11" fill="rgba(255,255,255,0.85)" textAnchor="middle">{d.label}</text>
            <text x={x + barW / 2} y={y - 6} fontSize="11" fill="rgba(255,255,255,0.75)" textAnchor="middle">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [aeronaves, setAeronaves] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [testes, setTestes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [av, pc, et, ts, fn] = await Promise.all([
        getAeronaves(),
        getPecas(),
        getEtapas(),
        getTestes(),
        getFuncionarios()
      ]);
      setAeronaves(av || []);
      setPecas(pc || []);
      setEtapas(et || []);
      setTestes(ts || []);
      setFuncionarios(fn || []);
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
      setError("Erro ao carregar dados (veja console).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // KPIs
  const totalAeronaves = aeronaves.length;
  const totalPecas = pecas.length;
  const totalEtapas = etapas.length;
  const etapasConcluidas = etapas.filter(e => (e.status || "").toUpperCase() === "CONCLUIDA").length;
  const etapasPendentes = etapas.filter(e => (e.status || "").toUpperCase() === "PENDENTE").length;
  const etapasAndamento = etapas.filter(e => (e.status || "").toUpperCase() === "ANDAMENTO").length;
  const eficienciaPct = totalEtapas === 0 ? 0 : Math.round((etapasConcluidas / totalEtapas) * 100);

  const totalTestes = testes.length;
  const testesAprovados = testes.filter(t => (t.resultado || "").toUpperCase() === "APROVADO").length;
  const taxaAprovacao = totalTestes === 0 ? 0 : Math.round((testesAprovados / totalTestes) * 100);

  // breakdown for chart: peças por status (best-effort)
  const pecasStatusCounts = {};
  pecas.forEach(p => {
    const s = (p.status || "DESCONHECIDO").toUpperCase();
    pecasStatusCounts[s] = (pecasStatusCounts[s] || 0) + 1;
  });
  const pecasChartData = Object.keys(pecasStatusCounts).map(k => ({ label: k.slice(0,8), value: pecasStatusCounts[k] }));

  // pequenas métricas para cards
  const employees = funcionarios.length;

  return (
    <div className="grid">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <Card title="Aeronaves" value={totalAeronaves} />
        <Card title="Peças (total)" value={totalPecas} />
        <Card title="Etapas concluídas" value={`${etapasConcluidas} (${eficienciaPct}%)`} small />
        <Card title="Testes aprovados" value={`${testesAprovados} (${taxaAprovacao}%)`} small />
        <Card title="Funcionários" value={employees} />
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <strong>Resumo</strong>
        <div style={{ display: "flex", gap: 20, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ minWidth: 220 }}>
            <div style={{ color: "rgba(255,255,255,0.7)" }}>Etapas</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{totalEtapas}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              Pendentes: {etapasPendentes} · Andamento: {etapasAndamento} · Concluídas: {etapasConcluidas}
            </div>
          </div>

          <div style={{ minWidth: 220 }}>
            <div style={{ color: "rgba(255,255,255,0.7)" }}>Testes</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{totalTestes}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
              Aprovados: {testesAprovados} · Taxa: {taxaAprovacao}%
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>Peças por status</div>
            {pecasChartData.length ? (
              <BarChart data={pecasChartData} width={520} height={130} />
            ) : (
              <div style={{ color: "rgba(255,255,255,0.6)" }}>Nenhuma peça registrada.</div>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <strong>Últimas ações</strong>
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Últimas 5 aeronaves</div>
            <ul>
              {aeronaves.slice(-5).reverse().map(a => <li key={a.id}>{a.codigo} — {a.modelo}</li>)}
              {aeronaves.length === 0 && <li>Nenhuma aeronave</li>}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Últimos 5 testes</div>
            <ul>
              {testes.slice(-5).reverse().map(t => <li key={t.id}>{t.tipo} — {t.resultado} — av:{t.aeronaveId}</li>)}
              {testes.length === 0 && <li>Nenhum teste</li>}
            </ul>
          </div>
        </div>
      </div>

      {loading && <div style={{ marginTop: 12 }}>Carregando métricas...</div>}
      {error && <div style={{ marginTop: 12, color: "var(--danger, #ff6b6b)" }}>{error}</div>}
    </div>
  );
}
