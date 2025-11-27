import { Router } from "express";
import prisma from "../prismaClient";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.etapa.findMany({ orderBy: { id: "desc" }});
    res.json(items);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao listar etapas" }); }
});

router.post("/", async (req, res) => {
  try {
    const { aeronaveId, nome, prazo_dias, status, responsaveis } = req.body;
    const created = await prisma.etapa.create({ data: { aeronaveId: Number(aeronaveId), nome, prazo_dias: Number(prazo_dias) || null, status, responsaveis }});
    res.status(201).json(created);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao criar etapa" }); }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.etapa.findUnique({ where: { id }});
    if (!item) return res.status(404).json({ error: "Etapa não encontrada" });
    res.json(item);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao buscar etapa" }); }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = req.body;
    if (data.prazo_dias) data.prazo_dias = Number(data.prazo_dias);
    const updated = await prisma.etapa.update({ where: { id }, data });
    res.json(updated);
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao atualizar etapa" }); }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.etapa.delete({ where: { id }});
    res.status(204).send();
  } catch (e) { console.error(e); res.status(500).json({ error: "Erro ao deletar etapa" }); }
});

export default router;
