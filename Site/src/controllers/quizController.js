var quizModel = require("../models/quizModel");

function buscarPerguntasPorQuiz(req, res) {
    const fkQuiz = req.params.fkQuiz

    quizModel.buscarPerguntasPorQuiz(fkQuiz)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar perguntas:", erro)
            res.status(500).json({ erro: "Erro ao buscar perguntas" })
        });
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

module.exports = {
    buscarPerguntasPorQuiz,
    listarPontos,
    cadastrarPontos
};