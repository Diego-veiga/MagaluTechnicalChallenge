# Desafio Técnico - Luizalab

## Descrição

Este projeto foi desenvolvido como parte de um desafio técnico com o objetivo de demonstrar habilidades práticas em desenvolvimento de software, focando na resolução de problemas próximos da rotina de trabalho real.

O desafio consiste em integrar dois sistemas, realizando a transformação de um arquivo de pedidos desnormalizado (fornecido pelo sistema legado) em um arquivo JSON normalizado, seguindo as regras e requisitos estabelecidos.

# Tabela de conteúdos

<!--ts-->

- [Pré-requisitos](#requisito)
- [Execução do projeto](#execucao)
- [Endpoints da API](#endpoints)
- [Execução dos testes unitários](#testes)
- [Tecnologias](#tecnologias)
- [Autor](#autor)
<!--te-->

<h2 id="requisito">Pré-requisitos</h2>
Para rodar a aplicação, você precisará ter instalado na sua máquina:

- Node.js na versão 20.19.1 ou superior;

- Mongo instalado localmente ou uma instância ativa do Mongo via Docker.

<h2 id="execucao">Execução do projeto</h2>

Para executar o projeto, siga os seguintes passos:

#### Clone o projeto

    Repositório https://github.com/Diego-veiga/MagaluTechnicalChallenge

### Execução via docker-compose

Para executar a aplicação via docker compose, execute o comando abaixo na raiz do projeto

```bash
docker-compose up -d
```

### Execução local (sem Docker)

#### Instale as dependências

```bash
npm i
```

#### Inicie a aplicação:

```bash
npm run dev
```

A aplicação estará disponível na porta 3000, através do link `http://localhost:3000`

<h2 id="endpoints">Endpoints da API</h2>

#### POST `/orders/processFile`

Processa um arquivo de pedidos desnormalizado enviado via multipart/form-data.

**Requisição:**

- Content-Type: multipart/form-data

- Campo do arquivo: file (arquivo .txt contendo os pedidos)

**Resposta:**

- 200 OK: Arquivo processado com sucesso.

- 400 Bad Request: Arquivo inválido ou erro no processamento.

#### GET `/orders`

Retorna os pedidos processados, com possibilidade de filtros via query string.

Parâmetros (query string):

- customerId: (opcional) filtra pedidos por ID do cliente

- orderId: (opcional) filtra por ID do pedido

**Exemplo de requisição:**

```bash
GET /orders?customerId=123&orderId=456

```

**Resposta:**

- 200 OK: Lista de pedidos encontrados.

- 204 No Content: Nenhum pedido encontrado.

- 500 Internal Server Error: Erro ao buscar os dados.

<h2 id="testes">Execução dos Testes Unitários</h2>
 O projeto conta com testes unitários implementados para garantir a qualidade e a confiabilidade do código.

#### Rodar os testes

Instale as dependências (caso ainda não tenha instalado):

```bash
npm i
```

Para executar os testes, utilize o comando:

```bash
npm run test
```

#### Verificar cobertura de testes :

Para executar os testes e verificar a cobertura , utilize o comando:

```bash
npm run test:coverage
```

## Tecnologias

- [Express](https://expressjs.com/pt-br/)
- [Mongo](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Typescript](https://www.typescriptlang.org/docs/)

## Autor

<a href="https://www.linkedin.com/in/diegorobertoveiga/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62670446?s=400&u=ce360c7bc3872fde7996a64a630c3a44ecb1ed30&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Diego Veiga</b></sub></a> <a href="https://www.linkedin.com/in/diegorobertoveiga/" title="Diego Veiga">🚀</a>
