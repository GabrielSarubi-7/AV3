import { Router } from "express";
import prisma from "../prismaClient";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.teste.findMany({ orderBy: { id: "desc" }});
    res.json(items);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao listar testes" }); }
});

router.post("/", async (req, res) => {
  try {
    const { aeronaveId, tipo, resultado, observacoes } = req.body;
    const created = await prisma.teste.create({ data: { aeronaveId: Number(aeronaveId), tipo, resultado, observacoes }});
    res.status(201).json(created);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao criar teste" }); }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.teste.findUnique({ where: { id }});
    if (!item) return res.status(404).json({ error: "Teste não encontrado" });
    res.json(item);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao buscar teste" }); }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updated = await prisma.teste.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao atualizar teste" }); }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.teste.delete({ where: { id }});
    res.status(204).send();
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao deletar teste" }); }
});

export default router;
