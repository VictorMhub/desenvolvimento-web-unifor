# frontend-be

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida e leve para projetos front-end.
- **Shadcn/UI**: Componentes de interface de usuário para React.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida e eficiente.
- **JSON Server**: Ferramenta para criação de uma API REST fake.

## Instalação

Para configurar o projeto localmente, siga os passos abaixo:

1. Tenha instaladas em sua máquina as ferramentas [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) (ou outro gerenciador de pacotes de sua preferência) para poder trabalhar no projeto.

2. Clone o repositório:

   ```bash
   git clone https://github.com/VictorMhub/frontend-be.git
   cd frontend-be
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Caso você não tenha, instale o pacote [json-server](https://github.com/typicode/json-server);
   É necessário deixar o json-server rodando no terminal para que os dados sejam visualizados no projeto.

Caso você tenha problemas com o json-server, tente rodá-lo com `npx json-server db.json` ou
com `yarn json-server <path>/db.json`, em que `<path>` é o caminho completo até o diretório em que o arquivo db.json está localizado.

5. Caso você não tenha, instale a ferramenta de build Vite:

   ````bash
   npm install @vitejs/plugin-react
   

6. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

7. Abra o navegador e acesse `http://localhost:3000`.

## Branches

O projeto possui as seguintes branches principais:

- `main`: Contém a versão estável do projeto.