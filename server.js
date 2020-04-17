const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const databaseUsers = require('../models/users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use( function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.post('/cadastro-usuario', (req, res) => {
    databaseUsers.findAll({
        where: {'email': req.body.email}
    }).then((data) => {
        if(Object.keys(data).length === 0) {
            databaseUsers.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })
            res.send(201)
        } else {
            res.send(406)
        }
    }).catch((err) => {
        res.send("Falha no cadastro: " + err)
    })
});


app.post('/login-usuario', (req, res) =>{
    databaseUsers.findAll({
        where: {'email': req.body.email,
                'senha': req.body.senha}
    }).then((data) => {
        if(Object.keys(data).length === 0) {
            res.send(401)
        } else {
            res.send(200)
        }
    }).catch((err) => {
        res.send("falha no login " + err);
    })
})

app.listen(8080, () => console.log("Servidor rodando na porta 8080!!"))