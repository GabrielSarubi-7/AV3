// backend/src/routes/etapas.ts
import { Router } from "express";
import prisma from "../prismaClient";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.etapa.findMany({
      orderBy: { id: "desc" },
      include: {
        aeronave: true, 
      },
    });
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao listar etapas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { aeronaveId, nome, prazo_dias, status, responsaveis } = req.body;
    const created = await prisma.etapa.create({
      data: { aeronaveId, nome, prazo_dias, status, responsaveis },
    });
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao criar etapa" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.etapa.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao deletar etapa" });
  }
});

export default router;
