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
  const { idUsuario, fkQuiz, pontos, tempo } = req.body;

  quizModel.cadastrarPontos(idUsuario, fkQuiz, pontos, tempo)
    .then(resultado => res.status(200).json(resultado))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao cadastrar pontuação." });
    });
}

function tempoMedio(req, res) {
  const fkQuiz = req.params.fkQuiz;

  quizModel.tempoMedioPorQuiz(fkQuiz)
    .then(resultado => res.status(200).json(resultado[0]))
    .catch(erro => {
      console.error("Erro ao buscar tempo médio:", erro);
      res.status(500).json({ erro: "Erro ao buscar tempo médio." });
    });
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