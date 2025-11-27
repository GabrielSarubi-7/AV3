import { Router } from "express";
import prisma from "../prismaClient";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const list = await prisma.aeronave.findMany({ orderBy: { id: "desc" } });
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao listar aeronaves" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await prisma.aeronave.findUnique({ where: { id }, include: { pecas: true, etapas: true, testes: true } });

    if (!item) return res.status(404).json({ error: "Aeronave não encontrada" });
    res.json(item);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao buscar aeronave" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { codigo, modelo, tipo, capacidade, alcance } = req.body;
    const created = await prisma.aeronave.create({
      data: { codigo, modelo, tipo, capacidade: Number(capacidade) || null, alcance: Number(alcance) || null },
    });
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao criar aeronave" });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = req.body;
    if (data.capacidade) data.capacidade = Number(data.capacidade);
    if (data.alcance) data.alcance = Number(data.alcance);
    const updated = await prisma.aeronave.update({ where: { id }, data });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao atualizar aeronave" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.aeronave.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao deletar aeronave" });
  }
});

export default router;
