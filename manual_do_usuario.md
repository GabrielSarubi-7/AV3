# Manual do Usuário — Sistema Aerocode

Bem-vindo ao sistema **Aerocode** — plataforma de gestão de aeronaves, peças, etapas e testes, com controle de permissões e relatórios.

Este manual explica **passo a passo** como instalar, rodar e utilizar o sistema corretamente.

---

# 1. Requisitos do Sistema
Antes de iniciar, certifique-se de ter instalado:

✔ Node.js 16+  
✔ MySQL 5.7+ ou 8+  
✔ NPM  
✔ Git  

---

# 2. Instalação do Projeto

## 2.1. Clonar o repositório
```bash
git clone https://github.com/GabrielSarubi-7/AV3
cd AV3
```

---

# 3. Configurando o Backend

Entre na pasta:
```bash
cd backend
```

## 3.1. Instalar dependências
```bash
npm install
```

## 3.2. Criar o arquivo .env
Crie `backend/.env` com:

```
DATABASE_URL="mysql://USER:SENHA@localhost:3306/aerocode"
PORT=4000
JWT_SECRET="senhasupersecreta"
```

## 3.3. Aplicar migrações
```bash
npx prisma migrate dev --name init
```

## 3.4. Criar usuário ADMIN padrão
```bash
node scripts/createAdmin.js
```

Usuário criado:
- admin / admin123  
- Permissão: ADMIN

## 3.5. Iniciar o backend
```bash
npm run dev
```

---

# 4. Configurando o Frontend

## 4.1. Entrar na pasta
```bash
cd ../frontend
```

## 4.2. Instalar dependências
```bash
npm install
```

## 4.3. Criar arquivo .env
Crie `frontend/.env`:

```
VITE_API_URL="http://localhost:4000/api"
```

## 4.4. Rodar o frontend
```bash
npm run dev
```

Acesse: http://localhost:5173

---

# 5. Login

Use o administrador padrão:

| Campo | Valor |
|-------|--------|
| Usuário | admin |
| Senha  | admin123 |

---

# 6. Permissões do Sistema

## ADMIN
✔ Acesso total  
✔ Cria e exclui tudo  
✔ Gerencia funcionários

## ENGENHEIRO
✔ Pode listar tudo  
✔ Pode criar peças, etapas e testes  
✖ Não cria funcionários  
✖ Não exclui funcionários

## OPERADOR
✔ Pode listar aeronaves, peças, etapas e testes  
✖ Não cria  
✖ Não exclui  
✖ Não acessa funcionários

---

# 7. Funcionalidades

- CRUD de aeronaves  
- CRUD de peças  
- CRUD de etapas  
- CRUD de testes  
- Relatório completo por aeronave  
- Sistema de permissões  
- Travas visuais (botões desativados e bloqueios na interface)

---

# 8. Travas Visuais

- Botões somem quando não permitidos  
- Botões ficam desabilitados caso o usuário não tenha permissão  
- Páginas protegidas exibem aviso de **Acesso negado**

---

# 9. Testando o Sistema

1. Logar como **admin**  
2. Criar um engenheiro e um operador  
3. Relogar com cada um e observar permissões aplicadas  
4. Testar criação e exclusão onde permitido  

---

# 10. Conclusão

Se tudo foi seguido:

✔ Backend rodando  
✔ Frontend rodando  
✔ Login funcional  
✔ Permissões aplicadas  
✔ Telas finalizadas  
✔ Relatórios funcionando  

---
###### (este documento foi gerado com auxilio de inteligencia artificial)

