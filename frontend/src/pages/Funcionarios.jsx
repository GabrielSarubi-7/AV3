import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";
import { getFuncionarios, createFuncionario, deleteFuncionario } from "../services/funcionariosService";

export default function Funcionarios(){
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [permissao, setPermissao] = useState("OPERADOR");
  const [saving, setSaving] = useState(false);

  const [me, setMe] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aerocode_user");
      if (raw) setMe(JSON.parse(raw));
    } catch (e) { setMe(null); }
  }, []);

  const userPerm = (me?.permissao || "").toString().toUpperCase();
  const canCreate = userPerm === "ADMIN";
  const canList = ["ADMIN", "ENGENHEIRO"].includes(userPerm);
  const canDelete = userPerm === "ADMIN";

  const load = async () => {
    setLoading(true);
    try {
      if (!canList) {
        setItems([]);
        setLoading(false);
        return;
      }
      const data = await getFuncionarios();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar funcionários (veja console).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [me]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!canCreate) { alert("Você não tem permissão para criar funcionários."); return; }

    setSaving(true);
    try {
      await createFuncionario({ nome, telefone, endereco, usuario, senha, permissao });
      setOpen(false);
      setNome(""); setTelefone(""); setEndereco(""); setUsuario(""); setSenha(""); setPermissao("OPERADOR");
      await load();
    } catch (e) {
      console.error(e);
      const msg = e?.response?.data?.error || "Erro ao criar funcionário";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!canDelete) { alert("Você não tem permissão para excluir."); return; }
    if (!confirm("Excluir funcionário?")) return;
    try {
      await deleteFuncionario(id);
      await load();
    } catch (e) {
      console.error(e);
      const msg = e?.response?.data?.error || "Erro ao deletar";
      alert(msg);
    }
  };

  return (
    <div className="grid">
      {canCreate ? (
        <button className="btn" onClick={() => setOpen(true)}>+ Novo Funcionário</button>
      ) : (
        <button className="btn" disabled style={{ opacity: 0.6 }}>+ Novo Funcionário</button>
      )}

      <button className="btn" onClick={load} style={{ marginLeft: 8 }}>Atualizar</button>

      <div style={{ marginTop: 12 }}>
        {!canList ? (
          <div className="card" style={{ padding: 16 }}>Acesso negado: você não tem permissão para ver a lista de funcionários.</div>
        ) : loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="table">
            <table>
              <thead>
                <tr><th>ID</th><th>Nome</th><th>Usuário</th><th>Permissão</th><th></th></tr>
              </thead>
              <tbody>
                {items.length === 0 && <tr><td colSpan={5}>Nenhum funcionário cadastrado.</td></tr>}
                {items.map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.nome}</td>
                    <td>{i.usuario}</td>
                    <td>{i.permissao}</td>
                    <td style={{ display: "flex", justifyContent: "flex-end" }}>
                      {canDelete ? (
                        <button className="btn" onClick={() => handleDelete(i.id)}>Excluir</button>
                      ) : (
                        <span style={{ opacity: 0.6, fontSize: 13, padding: "6px 8px" }}>Sem permissão</span>
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
        <Modal title="Novo Funcionário" onClose={() => setOpen(false)}>
          <form onSubmit={handleCreate} style={{ minWidth: 360 }}>
            <div className="field"><label>Nome</label><input value={nome} onChange={e => setNome(e.target.value)} required /></div>
            <div className="field"><label>Telefone</label><input value={telefone} onChange={e => setTelefone(e.target.value)} /></div>
            <div className="field"><label>Endereço</label><input value={endereco} onChange={e => setEndereco(e.target.value)} /></div>
            <div className="field"><label>Usuário</label><input value={usuario} onChange={e => setUsuario(e.target.value)} required /></div>
            <div className="field"><label>Senha</label><input value={senha} onChange={e => setSenha(e.target.value)} type="password" required /></div>

            <div className="field">
              <label>Permissão</label>
              <select value={permissao} onChange={e => setPermissao(e.target.value)} required>
                <option value="">Selecione...</option>
                <option value="ADMIN">ADMIN</option>
                <option value="ENGENHEIRO">ENGENHEIRO</option>
                <option value="OPERADOR">OPERADOR</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn primary" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
              <button className="btn" type="button" onClick={() => setOpen(false)}>Cancelar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
