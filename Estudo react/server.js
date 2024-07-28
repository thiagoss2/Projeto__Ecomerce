import express from 'express';

// criando a rota 

const app = express();

// listem ouvindo a porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// METODOS HTTP
// temos o get faz uma listagem de algo
app.get('/users', (req, res) => {
    return res.json({ message: 'Hello World' });
})

// temos o post sempre cria algo 
app.post('/users', (req, res) => { 
    console.log(req.body);
    return res.json({ message: 'Hello World' });
})

// temos o put sempre atualiza algo
app.put('/users/:id', (req, res) => {
    console.log(req.params);
    return res.json({ message: 'Hello World' });
})

// temos o delete sempre deleta algo
app.delete('/users/:id', (req, res) => {
    console.log(req.params);
    return res.json({ message: 'Hello World' });
})

// temos o patch atualiza algo parcialmente algo especifico
app.path('/users/:id', (req, res) => {
    console.log(req.params);
    return res.json({ message: 'Hello World' });
})
