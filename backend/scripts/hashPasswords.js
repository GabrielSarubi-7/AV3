const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const users = await prisma.funcionario.findMany();
  for (const u of users) {
    if (u.senha && (u.senha.startsWith("$2a$") || u.senha.startsWith("$2b$") || u.senha.startsWith("$2y$"))) {
      console.log(`Pulando ${u.usuario} (já em hash)`);
      continue;
    }
    const hash = await bcrypt.hash(String(u.senha || "123"), 10);
    await prisma.funcionario.update({ where: { id: u.id }, data: { senha: hash } });
    console.log(`Atualizado ${u.usuario}`);
  }
  console.log("Concluído");
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });