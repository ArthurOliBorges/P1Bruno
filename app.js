import express from 'express'
import bodyParser from 'body-parser'
import CarroDB from "./conexao.js";
import cors from 'cors'

let app = express()

app.use(cors())

// Corrigido: o termo correto é 'extended', não 'extends'
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("API dos Carros")
})

// GET em /carros
app.get('/carros', function(req, res) {
    CarroDB.getCarros(function(carro) {
        res.json(carro)



    })
})

// GET em /carros/:id
app.get('/carros/:id', function (req, res) {
    let ids = req.params.id
    CarroDB.getCarrosById(ids, function (carro) {
        res.json(carro)
    })
})

// POST em /carros
app.post('/carros', function (req, res) {
    let carros = req.body
    CarroDB.save(carros, function (carro) {
        res.json(carro)
    })
})

// PUT em /carros (Atualizado para o método .put corretamente)
app.put('/carros', function (req, res) {
    let carros = req.body
    CarroDB.update(carros, function (carro) {
        res.json(carro)
    })
})

// DELETE em /carros/:id
app.delete('/carros/:id', function (req, res) {
    let ids = req.params.id
    CarroDB.delete(ids, function (carro) {
        res.json(carro)
    })
})

// Inicia o servidor
let server = app.listen(3000, function (){
    let host = server.address().address
    let port = server.address().port
    console.log("Server iniciado em http://localhost:%s", port)
})