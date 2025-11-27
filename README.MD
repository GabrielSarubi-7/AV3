# AEROCODE – Sistema de Gerenciamento de Aeronaves

Este projeto faz parte da **AV3** e implementa um sistema completo para controle de processos aeronáuticos, incluindo gerenciamento de **Aeronaves**, **Peças**, **Etapas**, **Testes** e **Funcionários**, com integração total entre **frontend React**, **backend Node/Express** e **banco de dados MySQL usando Prisma ORM**.

---

## Tecnologias Utilizadas

### **Backend**
- Node.js  
- Express  
- Prisma ORM  
- MySQL  
- TypeScript  

### **Frontend**
- React.js  
- Vite  
- Axios  
- React Router

---

## Estrutura do Projeto
```
/aerocode-backend
├── src/
│   ├── routes/
│   ├── prisma/
│   ├── server.ts
├── prisma/
│   ├── schema.prisma

/Final (Frontend)
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
├── index.html
├── vite.config.js
```

---

## BACKEND (aerocode-backend)

### 1. Acessar a pasta do backend

cd aerocode-backend

### 2. Instalar dependências

npm install

### 3. Criar arquivo `.env`

Crie um arquivo chamado `.env` dentro da pasta `aerocode-backend` com o conteúdo:

DATABASE_URL="mysql://user:senha@localhost:3306/aerocode"
PORT=4000

Substitua `user` e `senha` pelo seu usuário e senha do MySQL.

### 4. Rodar as migrações do Prisma

npx prisma migrate dev --name init

### 5. Iniciar o servidor backend

npm run dev

O backend ficará disponível em: http://localhost:4000

---

## FRONTEND (Final)

### 1. Acessar a pasta do frontend

cd ../Final

### 2. Instalar dependências

npm install

### 3. Criar arquivo `.env` do frontend

Crie o arquivo `.env` dentro da pasta `Final` com:

VITE_API_URL="http://localhost:4000/api"

### 4. Iniciar o servidor React

npm run dev

O frontend ficará disponível em: http://localhost:5173

---

##  Fluxo de Execução Completo

1. Inicie o MySQL  
2. Rode o backend (porta 4000)  
3. Rode o frontend (porta 5173)  
4. Abra o navegador em http://localhost:5173  
5. Utilize todas as funcionalidades do sistema normalmente
