import { Router } from "express";
import prisma from "../prismaClient";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.funcionario.findMany({ orderBy: { id: "desc" }});
    res.json(items);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao listar funcionários" }); }
});

router.post("/", async (req, res) => {
  try {
    const { nome, telefone, endereco, usuario, senha, permissao } = req.body;
    const created = await prisma.funcionario.create({ data: { nome, telefone, endereco, usuario, senha, permissao }});
    res.status(201).json(created);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao criar funcionário" }); }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.funcionario.findUnique({ where: { id }});
    if (!item) return res.status(404).json({ error: "Funcionário não encontrado" });
    res.json(item);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao buscar funcionário" }); }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = req.body;
    const updated = await prisma.funcionario.update({ where: { id }, data });
    res.json(updated);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao atualizar funcionário" }); }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.funcionario.delete({ where: { id }});
    res.status(204).send();
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao deletar funcionário" }); }
});

export default router;
