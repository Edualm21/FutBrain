var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/perguntas/premier", quizController.buscarPerguntasPremier);
router.get("/perguntas/laLiga", quizController.buscarPerguntasLaLiga);
router.get("/perguntas/bundesliga", quizController.buscarPerguntasBundesliga);
router.get("/perguntas/serieA", quizController.buscarPerguntasSerieA);
router.get("/perguntas/brasileirao", quizController.buscarPerguntasBr);
router.get("/perguntas/champions", quizController.buscarPerguntasChampions);
router.get("/perguntas/copa", quizController.buscarPerguntasCopa);
router.get("/listarPontos", function (req, res) {quizController.listarPontos(req, res);});
router.post("/cadastrarPontos", function (req, res) {quizController.cadastrarPontos(req, res);});


module.exports = router;
