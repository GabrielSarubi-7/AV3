# ✈️ AEROCODE – Sistema de Gerenciamento de Aeronaves, Peças, Etapas, Testes e Funcionários

Este projeto faz parte da **AV3** e implementa um sistema completo para controle de processos aeronáuticos, incluindo gerenciamento de **Aeronaves**, **Peças**, **Etapas**, **Testes** e **Funcionários**, com integração total entre **frontend React**, **backend Node/Express** e **banco de dados MySQL usando Prisma ORM**.

---

## 📌 Funcionalidades Implementadas

### **✔ Aeronaves**
- Cadastro, edição e exclusão  
- Visualização detalhada  
- Relacionamento com peças, etapas e testes  
- Campos: código, modelo, tipo, capacidade, alcance  

### **✔ Peças**
- Cadastradas vinculadas a uma aeronave  
- Campos: nome, tipo, fornecedor, status  

### **✔ Etapas**
- Etapas do processo aeronáutico  
- Campos: nome, prazo, status, responsáveis  
- Relacionadas a uma aeronave  

### **✔ Testes**
- Testes aeronáuticos  
- Campos: tipo, resultado, observações  
- Relacionados a uma aeronave  

### **✔ Funcionários**
- CRUD completo  
- Utilizados nas etapas como responsáveis  

### **✔ Dashboard**
- Indicadores principais do sistema  
- KPIs gerais  

### **✔ Relatório**
- Relatório consolidado por aeronave  
- Lista peças, etapas e testes de forma organizada  

---

## 🏗 Tecnologias Utilizadas

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
- CSS moderno / dark theme  

---

## 📁 Estrutura do Projeto

/aerocode-backend
├── src/
│ ├── routes/
│ ├── prisma/
│ ├── server.ts
├── prisma/
│ ├── schema.prisma

/Final (Frontend)
├── src/
│ ├── pages/
│ ├── components/
│ ├── services/
├── index.html
├── vite.config.js

yaml
Copiar código

---

# ⚙️ Como Rodar o Projeto

## 1️⃣ Clonar o repositório
```bash
git clone <seu-repositorio>
cd aerocode