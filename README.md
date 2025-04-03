# README

## Tecnologias Utilizadas

- Node.js
- Docker
- Docker Compose
- npm
- Nest.js

## Configuração do Ambiente

1. **Clonar o repositório**:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Criar um arquivo `.env`** baseado no `.env.example` disponível no repositório:

   ```sh
   cp .env.example .env
   ```

3. **Subir os serviços com Docker Compose**:

   ```sh
   docker-compose up -d
   ```

4. **Instalar as dependências do projeto**:
   ```sh
   npm install
   ```

## Executando a Aplicação

Para rodar a aplicação em ambiente de desenvolvimento, use o seguinte comando:

```sh
npm run dev
```

## Testes

Para rodar os testes automatizados, utilize:

```sh
npm run test
```
