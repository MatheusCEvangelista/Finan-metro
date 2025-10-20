# Finançômetro

**Finançômetro** é um sistema web simples para controle de finanças pessoais.  
Permite que você registre receitas e despesas, visualize gráficos por categoria, e acompanhe seu saldo mês a mês.
Ele surgiu de uma ideia minha, para controle facil do meu sálario.

---

## 📌 Funcionalidades

- Cadastro e login de usuários
- Registro de receitas e despesas
- Dashboard com resumo financeiro
- Gráfico de distribuição por categoria
- Filtro por mês e tipo (receita/despesa)
- Visualização de saldo e totais

---

## 💻 Tecnologias utilizadas

- **Frontend:** React, React Router, Axios, Recharts, Vite  
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt  
- **Deploy:** Frontend na Vercel, Falta dar deploy no Backend

- ## 🛠️ Como rodar localmente

### Pré-requisitos

- Node.js instalado
- MongoDB (Atlas ou local)
- Git

### Backend

1. Entre na pasta do backend:

cd backend

2. Instale as dependências
npm install

3. Crie um arquivo .env na raiz baseado no exemplo:
PORT=5000
MONGO_URI=<sua_mongo_uri>
JWT_SECRET=<sua_chave_jwt>

4. Rode o servidor do backend:
npm run dev

### Frontend
1. Entre na pasta do frontend:
cd frontend

2. Instale as dependências
npm install

3. Rode o servidor do frontend:
npm run dev

### Em ação!:
<img width="988" height="637" alt="image" src="https://github.com/user-attachments/assets/db6a4891-8ec7-44ac-a089-17195ac9ee2d" />

### Hospedagem:
https://vercel.com/matheuscevangelistas-projects/financometro




