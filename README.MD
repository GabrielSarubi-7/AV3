
# Aerocode — Sistema de Gestão de Aeronaves

Sistema **Full Stack** para gestão de **aeronaves, peças, etapas e testes**, com **controle de permissões por perfil** (ADMIN, ENGENHEIRO, OPERADOR) e **relatórios por aeronave**.

---

## Requisitos

- Node.js 16+
- NPM
- MySQL 5.7+ ou 8+
- Git

---

## Instalação

```bash
git clone https://github.com/GabrielSarubi-7/AV3
cd AV3
```

### Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` em `backend/.env`:

```env
DATABASE_URL="mysql://USER:SENHA@localhost:3306/aerocode"
PORT=4000
JWT_SECRET="senhasupersecreta"
```

Aplique as migrações:

```bash
npx prisma migrate dev --name init
```

Crie o usuário ADMIN padrão:

```bash
node scripts/createAdmin.js
```

Inicie o servidor:

```bash
npm run dev
```

### Frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo `.env` em `frontend/.env`:

```env
VITE_API_URL="http://localhost:4000/api"
```

Inicie o frontend:

```bash
npm run dev
```

Acesse: http://localhost:5173

---

## Login padrão

| Campo   | Valor     |
| ------- | --------- |
| Usuário | `admin`   |
| Senha   | `admin123`|

---

## Perfis e Permissões

- **ADMIN**
  - Acesso total ao sistema
  - CRUD completo
  - Gerencia funcionários

- **ENGENHEIRO**
  - Lista tudo
  - Cria peças, etapas e testes
  - Não gerencia funcionários

- **OPERADOR**
  - Apenas visualiza aeronaves, peças, etapas e testes
  - Não cria nem exclui registros

---

## Funcionalidades

- CRUD de **aeronaves**
- CRUD de **peças**
- CRUD de **etapas**
- CRUD de **testes**
- **Relatório completo por aeronave**
- Sistema de **permissões por perfil**
- **Travas visuais** (botões ocultos/desabilitados e páginas protegidas)

---

## Como testar

1. Logar como **admin**
2. Criar um usuário **ENGENHEIRO** e um **OPERADOR**
3. Relogar com cada perfil e validar:
   - O que cada um consegue ver
   - O que consegue criar/editar/excluir
4. Gerar/visualizar relatórios por aeronave

---

> Para mais detalhes, consulte o arquivo `manual_do_usuario.md`.
