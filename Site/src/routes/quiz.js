var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");


router.get("/perguntas/:fkQuiz", quizController.buscarPerguntasPorQuiz);
router.get("/listarPontos", function (req, res) {quizController.listarPontos(req, res);});
router.post("/cadastrarPontos", function (req, res) {quizController.cadastrarPontos(req, res);});

module.exports = router;
