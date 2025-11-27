// backend/scripts/createAdmin.js
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const nome = "Admin";
  const usuario = "admin";
  const senha = "123";
  const permissao = "ADMIN";
  const hash = await bcrypt.hash(senha, 10);
  const user = await prisma.funcionario.create({
    data: { nome, usuario, senha: hash, permissao }
  });
  console.log("Admin criado:", user);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
