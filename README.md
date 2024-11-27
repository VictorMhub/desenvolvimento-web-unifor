# Projeto FullStack: To-Do List

## **Descrição**
Este é um projeto FullStack de gerenciamento de tarefas e usuários, desenvolvido como parte do curso da UNIFOR. 

### **Tecnologias Utilizadas**
- **Front-End**: HTML, CSS (Bootstrap) e JavaScript.
- **Back-End**: Node.js e Express.js.
- **Banco de Dados**: MongoDB (Atlas).
- **Autenticação**: JWT (JSON Web Token).

---

## **Requisitos**
- **Node.js** (versão 16+ recomendada)
- **MongoDB Atlas** (configurado e liberado para acesso)
- **Navegador atualizado** (Google Chrome, Firefox, etc.)
- Ferramenta para testar APIs: **Insomnia** ou **Postman** (opcional, para testes diretos).

---

## **Configuração e Execução**

### **1. Clonar o Repositório**
Clone o projeto para sua máquina local:
```bash
git clone git@github.com:VictorMhub/desenvolvimento-web-unifor.git

---
### **2. Configuração do Back-End**
1. Acesse a pasta do backend:
```bash
cd backend

2. Instale as dependências:
```bash
npm install

3. Inicie o servidor:
```bash
node app.js

---

## **3. Configuração do Front-End**
1. Acesse a pasta do front-end:
```bash
cd frontend

2. Abra o arquivo index.html no navegador.

## **Testando o Projeto**
1. Via Front-End:
Utilize o front-end para criar, editar, excluir e listar tarefas.
Faça login para acessar as funcionalidades protegidas.
2. Via API (Opcional)
Teste os endpoints da API usando ferramentas como Insomnia ou Postman.
Certifique-se de usar o token JWT gerado no login para acessar rotas protegidas.