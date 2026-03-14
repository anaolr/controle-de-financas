# 💰 Gerenciador Financeiro Pessoal

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)

> Uma aplicação web Full-Stack moderna para controle de finanças pessoais. Permite aos usuários criar contas, registrar despesas fixas e variáveis, e acompanhar o balanço mensal de forma intuitiva e segura.

🔗 **[Acesse a aplicação online aqui](https://controle-de-financas-ruddy.vercel.app/)**

---

## 📸 Screenshots
*(Dica: Tire um print da sua tela de login, do dashboard principal no modo claro e no modo escuro e adicione as imagens aqui para deixar o README mais visual!)*

## ✨ Funcionalidades

* **Autenticação e Segurança:** Sistema de Cadastro e Login seguro utilizando JWT (JSON Web Tokens) e senhas criptografadas com `bcryptjs`.
* **Isolamento de Dados:** Cada usuário acessa apenas a sua própria planilha de gastos.
* **Gestão de Despesas (CRUD):** Adicione, edite, visualize e exclua gastos facilmente.
* **Categorização:** Separação automática entre "Despesas Fixas" e "Despesas Variáveis".
* **Cálculo Automático:** Resumo em tempo real do balanço do mês e subtotais por categoria.
* **Dark Mode (Tema Escuro):** Alternância entre modo claro e escuro, com salvamento da preferência no navegador do usuário (`localStorage`).
* **Design Responsivo:** Interface 100% adaptada para celulares, tablets e desktops (Mobile-First).

---

## 🛠️ Tecnologias Utilizadas

### Frontend (Interface)
* HTML5 semântico
* CSS3 (Variáveis globais, Flexbox, UI/UX moderno, Dark Mode)
* JavaScript (Vanilla JS, Fetch API, manipulação de DOM)
* Fonte: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
* **Hospedagem:** Vercel

### Backend (Servidor & API)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/) (Roteamento e Servidor)
* [Mongoose](https://mongoosejs.com/) (Modelagem de dados)
* `jsonwebtoken` (Autenticação baseada em tokens)
* `bcryptjs` (Hashing de senhas)
* `cors` (Controle de acesso HTTP)
* `dotenv` (Variáveis de ambiente)
* **Hospedagem:** Render

### Banco de Dados
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (NoSQL em nuvem)

---

## 🚀 Como rodar o projeto localmente

Para clonar e executar este aplicativo, você precisará do [Git](https://git-scm.com) e do [Node.js](https://nodejs.org/en/download/) instalados no seu computador.

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU_USUARIO/gerenciador-financeiro.git](https://github.com/SEU_USUARIO/gerenciador-financeiro.git)
cd gerenciador-financeiro
```
### 2. Configurar o Backend
```bash
cd backend
npm install
```
### 3. Crie um arquivo .env na raiz da pasta backend
```bash
MONGO_URI=sua_string_de_conexao_do_mongodb_aqui
JWT_SECRET=crie_uma_senha_secreta_bem_forte_aqui
PORT=3000
```
### 4. Inicie o Servidor
```bash
npm start
```
### 5. Configurar o Frontend

Abra a pasta frontend no seu editor de código.
No arquivo script.js, certifique-se de que a variável BASE_URL (na primeira linha) esteja apontando para o seu servidor local:
```bash
const BASE_URL = "http://localhost:3000"
```
Abra o arquivo index.html no seu navegador ou utilize a extensão Live Server do VS Code.


