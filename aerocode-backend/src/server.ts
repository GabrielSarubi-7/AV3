import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aeronavesRouter from "./routes/aeronaves";
import pecasRouter from "./routes/pecas";
import etapasRouter from "./routes/etapas";
import funcionariosRouter from "./routes/funcionarios";
import testesRouter from "./routes/testes";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Aerocode rodando"));

app.use("/api/aeronaves", aeronavesRouter);
app.use("/api/pecas", pecasRouter);
app.use("/api/etapas", etapasRouter);
app.use("/api/funcionarios", funcionariosRouter);
app.use("/api/testes", testesRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
