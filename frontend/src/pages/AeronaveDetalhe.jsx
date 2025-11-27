import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAeronave } from "../services/aeronavesService";

export default function AeronaveDetalhe(){
  const { id } = useParams();
  const [aeronave, setAeronave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try {
        setLoading(true);
        console.log("[AeronaveDetalhe] carregando id =", id);
        const data = await getAeronave(id);
        console.log("[AeronaveDetalhe] resposta getAeronave:", data);
        setAeronave(data);
      } catch (err) {
        console.error("[AeronaveDetalhe] Erro ao carregar detalhes:", err);

        
        if (err?.response) {
          console.error("Resposta do servidor:", err.response.status, err.response.data);
          alert(`Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
        } else if (err?.request) {
          console.error("Requisição feita, sem resposta (request):", err.request);
          alert("Nenhuma resposta do servidor (verifique se o backend está rodando).");
        } else {
          console.error("Erro inesperado:", err.message || err);
          alert(`Erro: ${err.message || JSON.stringify(err)}`);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!aeronave) return <div>Aeronave não encontrada.</div>;

  return (
    <div className="grid">
      <div className="card">
        <h3>{aeronave.codigo} — {aeronave.modelo}</h3>
        <p>Tipo: {aeronave.tipo}</p>
        <p>Capacidade: {aeronave.capacidade}</p>
        <p>Alcance: {aeronave.alcance} km</p>
      </div>

      <div className="card">
        <h4>Peças</h4>
        {aeronave.pecas?.length === 0 ? <p>Nenhuma peça</p> : (
          <ul>{aeronave.pecas.map(p=> <li key={p.id}>{p.nome} — {p.status}</li>)}</ul>
        )}
      </div>

      <div className="card">
        <h4>Etapas</h4>
        {aeronave.etapas?.length === 0 ? <p>Nenhuma etapa</p> : (
          <ul>{aeronave.etapas.map(e=> <li key={e.id}>{e.nome} — {e.status}</li>)}</ul>
        )}
      </div>

      <div className="card">
        <h4>Testes</h4>
        {aeronave.testes?.length === 0 ? <p>Nenhum teste</p> : (
          <ul>{aeronave.testes.map(t=> <li key={t.id}>{t.tipo} — {t.resultado}</li>)}</ul>
        )}
      </div>
    </div>
  );
}
