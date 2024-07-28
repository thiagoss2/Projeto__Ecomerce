### Plano de Estudo sobre Requisições HTTP em JavaScript usando Express

#### 1. Introdução ao Express
- **O que é Express?**
  - Framework web para Node.js.
  - Facilita a criação de aplicações web e APIs.
- **Instalação**
  ```bash
  npm install express
  ```

#### 2. Estrutura Básica de um Servidor Express
- **Criação de um servidor básico**
  ```javascript
  const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  ```

#### 3. Métodos HTTP com Express
// Recupera dados do servidor
- **GET**
  ```javascript
  app.get('/recurso', (req, res) => {
    res.json({ message: 'Recurso GET' });
  });
  ```
  // Cria dados no servidor geralmente feito atraves de paginas de cadastro
- **POST**
  ```javascript
  app.post('/recurso', (req, res) => {
    res.json({ message: 'Recurso POST' });
  });
  ```
  // Atualiza dados existentes no servidor
- **PUT**
  ```javascript
  app.put('/recurso/:id', (req, res) => {
    res.json({ message: `Recurso ${req.params.id} atualizado` });
  });
  ```
  // Remove dados do servidor por id
- **DELETE**
  ```javascript
  app.delete('/recurso/:id', (req, res) => {
    res.json({ message: `Recurso ${req.params.id} deletado` });
  });
  ```

#### 4. Middleware no Express
- **Uso de middleware**
  ```javascript
  app.use(express.json()); // Para parsear JSON no corpo da requisição
  ```

#### 5. Exemplo Completo de API com Express
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let recursos = [
  { id: 1, nome: 'Recurso 1' },
  { id: 2, nome: 'Recurso 2' }
];

app.get('/recursos', (req, res) => {
  res.json(recursos);
});

app.get('/recursos/:id', (req, res) => {
  const recurso = recursos.find(r => r.id === parseInt(req.params.id));
  if (!recurso) return res.status(404).send('Recurso não encontrado');
  res.json(recurso);
});

app.post('/recursos', (req, res) => {
  const novoRecurso = {
    id: recursos.length + 1,
    nome: req.body.nome
  };
  recursos.push(novoRecurso);
  res.status(201).json(novoRecurso);
});

app.put('/recursos/:id', (req, res) => {
  const recurso = recursos.find(r => r.id === parseInt(req.params.id));
  if (!recurso) return res.status(404).send('Recurso não encontrado');
  recurso.nome = req.body.nome;
  res.json(recurso);
});

app.delete('/recursos/:id', (req, res) => {
  const recurso = recursos.find(r => r.id === parseInt(req.params.id));
  if (!recurso) return res.status(404).send('Recurso não encontrado');
  const index = recursos.indexOf(recurso);
  recursos.splice(index, 1);
  res.json(recurso);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

#### 6. Testando Requisições HTTP com Arquivo `requisiçoes.http`
- **Instalação da extensão REST Client no VS Code**
  - Pesquisar por "REST Client" na extensão do VS Code e instalar.
- **Criação do arquivo `requisiçoes.http`**
  ```http
  ### GET todos os recursos
  GET http://localhost:3000/recursos

  ### GET recurso específico
  GET http://localhost:3000/recursos/1

  ### POST criar novo recurso
  POST http://localhost:3000/recursos
  Content-Type: application/json

  {
    "nome": "Novo Recurso"
  }

  ### PUT atualizar recurso
  PUT http://localhost:3000/recursos/1
  Content-Type: application/json

  {
    "nome": "Recurso Atualizado"
  }

  ### DELETE deletar recurso
  DELETE http://localhost:3000/recursos/1
  ```

#### 7. Recursos Adicionais
- **Documentação Oficial**
  - [Express.js](https://expressjs.com/)
- **Tutoriais e Cursos Online**
  - [Curso de Node.js e Express na Udemy](https://www.udemy.com/course/nodejs-express/)
- **Livros Recomendados**
  - "Express in Action" por Evan Hahn.

Este material cobre os principais aspectos das requisições HTTP usando Express em JavaScript, desde a configuração básica até exemplos práticos e testes com o arquivo `requisiçoes.http`.


PARAMETROS DE CONSULTA


### Parâmetros em Requisições HTTP com Express

#### 1. Tipos de Parâmetros
- **Parâmetros de Rota (Route Parameters)**
  - Utilizados para capturar valores específicos na URL.
  - Definidos com `:` seguido do nome do parâmetro.
- **Parâmetros de Consulta (Query Parameters)**
  - Passados na URL após o `?`.
  - Utilizados para filtrar ou modificar a solicitação.
- **Parâmetros de Corpo (Body Parameters)**
  - Enviados no corpo da requisição, geralmente em métodos POST, PUT e PATCH.
  - Utilizados para enviar dados estruturados.

#### 2. Exemplos de Uso

##### Parâmetros de Rota
- **Definição e Acesso**
  ```javascript
  app.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Usuário ID: ${userId}`);
  });
  ```
- **Exemplo de Requisição**
  ```http
  GET http://localhost:3000/usuarios/123
  ```

##### Parâmetros de Consulta
- **Definição e Acesso**
  ```javascript
  app.get('/pesquisa', (req, res) => {
    const { termo, pagina } = req.query;
    res.send(`Termo de pesquisa: ${termo}, Página: ${pagina}`);
  });
  ```
- **Exemplo de Requisição**
  ```http
  GET http://localhost:3000/pesquisa?termo=express&pagina=2
  ```

##### Parâmetros de Corpo
- **Definição e Acesso**
  ```javascript
  app.use(express.json());

  app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    res.send(`Nome: ${nome}, Email: ${email}`);
  });
  ```
- **Exemplo de Requisição**
  ```http
  POST http://localhost:3000/usuarios
  Content-Type: application/json

  {
    "nome": "João",
    "email": "joao@example.com"
  }
  ```

#### 3. Exemplo Completo com Todos os Tipos de Parâmetros
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Usuário ID: ${userId}`);
});

app.get('/pesquisa', (req, res) => {
  const { termo, pagina } = req.query;
  res.send(`Termo de pesquisa: ${termo}, Página: ${pagina}`);
});

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  res.send(`Nome: ${nome}, Email: ${email}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

#### 4. Testando com Arquivo `requisiçoes.http`
```http
### GET usuário por ID
GET http://localhost:3000/usuarios/123

### GET pesquisa com parâmetros de consulta
GET http://localhost:3000/pesquisa?termo=express&pagina=2

### POST criar novo usuário
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "nome": "João",
  "email": "joao@example.com"
}
```

#### 5. Recursos Adicionais
- **Documentação Oficial**
  - [Express.js - Routing](https://expressjs.com/en/guide/routing.html)
- **Tutoriais e Cursos Online**
  - [Curso de Node.js e Express na Udemy](https://www.udemy.com/course/nodejs-express/)
- **Livros Recomendados**
  - "Express in Action" por Evan Hahn.

Este material cobre os principais tipos de parâmetros em requisições HTTP usando Express em JavaScript, com exemplos práticos e testes com o arquivo `requisiçoes.http`.




