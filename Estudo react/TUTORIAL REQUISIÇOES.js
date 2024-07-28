### Passos em Pseudocódigo:
1. Importar o módulo `express`.
2. Criar uma instância do aplicativo Express.
3. Configurar o middleware para analisar o corpo das requisições como JSON.
4. Definir uma rota POST que cria um novo recurso.
5. Iniciar o servidor para escutar em uma porta específica.

### Código em JavaScript usando Express:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Rota POST para criar um novo recurso
app.post('/recursos', (req, res) => {
    const novoRecurso = req.body;
    
    // Aqui você pode adicionar lógica para salvar o novo recurso no banco de dados
    // Por exemplo: db.save(novoRecurso);

    console.log('Recurso recebido:', novoRecurso);

    // Responder com sucesso
    res.status(201).json({
        message: 'Recurso criado com sucesso!',
        recurso: novoRecurso
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
```

### Instruções para rodar o código:
1. Certifique-se de ter o Node.js e o npm instalados.
2. Crie um novo diretório e navegue até ele no terminal.
3. Execute `npm init -y` para criar um `package.json` padrão.
4. Execute `npm install express` para instalar o Express.
5. Crie um arquivo `index.js` e cole o código acima nele.
6. Execute `node index.js` para iniciar o servidor.
7. Faça uma requisição POST para `http://localhost:3000/recursos` com um corpo JSON para testar.

Este exemplo cria um servidor Express que escuta requisições POST na rota `/recursos` e responde com uma mensagem de sucesso e os dados do recurso criado.
