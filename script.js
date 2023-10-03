const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Conecte-se ao banco de dados MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cadastro', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     serverSelectionTimeoutMS : 20000
    });

// Defina um modelo para os dados
const Cadastro = mongoose.model('Cadastro', {
    nomeCompleto: String,
    email: String,
    endereco : String,
    bairro : String,
    complemento : String,
    numero : String,
    cep : String,
    uf : String
    // Adicione outros campos do formulário aqui
});

// Rota para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para processar o envio do formulário
app.post('/cadastrar', (req, res) => {
    const { nomeCompleto,
            email,
            endereco,
            bairro,
            complemento,
            numero,
            cep,
            uf 
        } = req.body;

    // Crie um novo documento no banco de dados
    const novoCadastro = new Cadastro({ nomeCompleto,
        email,
        endereco,
        bairro,
        complemento,
        numero,
        cep,
        uf });

    // Salve o documento
    novoCadastro.save(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar.');
        } else {
            res.redirect('/sucesso.html'); // Página de sucesso após o cadastro
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
