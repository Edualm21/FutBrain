var quizModel = require("../models/quizModel");

function buscarPerguntasPremier(req, res) {
    quizModel.listarPerguntasPremier().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasChampions(req, res) {
    quizModel.listarPerguntasChampions().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasBr(req, res) {
    quizModel.listarPerguntasBr().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    buscarPerguntasPremier,
    buscarPerguntasChampions,
    buscarPerguntasBr
};