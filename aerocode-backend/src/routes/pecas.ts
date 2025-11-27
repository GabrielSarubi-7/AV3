import { Router } from "express";
import prisma from "../prismaClient";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.peca.findMany({ orderBy: { id: "desc" }});
    res.json(items);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao listar peças" }); }
});

router.post("/", async (req, res) => {
  try {
    const { aeronaveId, nome, tipo, fornecedor, status } = req.body;
    const created = await prisma.peca.create({ data: { aeronaveId: Number(aeronaveId), nome, tipo, fornecedor, status }});
    res.status(201).json(created);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao criar peça" }); }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.peca.findUnique({ where: { id }});
    if (!item) return res.status(404).json({ error: "Peça não encontrada" });
    res.json(item);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao buscar peça" }); }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = req.body;
    const updated = await prisma.peca.update({ where: { id }, data });
    res.json(updated);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao atualizar peça" }); }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.peca.delete({ where: { id }});
    res.status(204).send();
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao deletar peça" }); }
});

export default router;
