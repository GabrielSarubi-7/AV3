import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Aeronaves from "./pages/Aeronaves.jsx";
import AeronaveDetalhe from "./pages/AeronaveDetalhe.jsx";
import Pecas from "./pages/Pecas.jsx";
import Etapas from "./pages/Etapas.jsx";
import Funcionarios from "./pages/Funcionarios.jsx";
import Testes from "./pages/Testes.jsx";
import Relatorio from "./pages/Relatorio.jsx";

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route element={<Layout/>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/aeronaves" element={<Aeronaves/>} />
        <Route path="/aeronaves/:id" element={<AeronaveDetalhe/>} />
        <Route path="/pecas" element={<Pecas/>} />
        <Route path="/etapas" element={<Etapas/>} />
        <Route path="/funcionarios" element={<Funcionarios/>} />
        <Route path="/testes" element={<Testes/>} />
        <Route path="/relatorio" element={<Relatorio/>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}