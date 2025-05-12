var quizModel = require("../models/quizModel");

function buscarPerguntasPremier(req, res) {
    quizModel.listarPerguntasPremier().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasLaLiga(req, res) {
    quizModel.listarPerguntasLaLiga().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasBundesliga(req, res) {
    quizModel.listarPerguntasBundesliga().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasSerieA(req, res) {
    quizModel.listarPerguntasSerieA().then(function(resultado){
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

function buscarPerguntasChampions(req, res) {
    quizModel.listarPerguntasChampions().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarPerguntasCopa(req, res) {
    quizModel.listarPerguntasCopa().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function listarPontos(req, res) {

  quizModel.listarPontos().then((resultadoListarPontos) => {
    if (resultadoListarPontos.length > 0) {
      res.status(200).json(resultadoListarPontos);
    } else {
        res.status(204).send("Nenhum resultado encontrado!")
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os pontos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarPontos(req, res) {
  var pontos = req.body.pontos;
  var idUsuario = req.body.idUsuario;
  var fkQuiz = req.body.fkQuiz

  if (pontos == undefined) {
    res.status(400).send("pontos está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else if(fkQuiz == undefined){
    res.status(400).send("FkQuiz está undefined")
  } else {
    quizModel.cadastrarPontos(idUsuario, fkQuiz, pontos)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro dos pontos! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
    buscarPerguntasPremier,
    buscarPerguntasLaLiga,
    buscarPerguntasBundesliga,
    buscarPerguntasSerieA,
    buscarPerguntasBr,
    buscarPerguntasChampions,
    buscarPerguntasCopa,
    listarPontos,
    cadastrarPontos
};