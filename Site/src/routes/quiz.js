var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/perguntas/premier", quizController.buscarPerguntasPremier);
router.get("/perguntas/champions", quizController.buscarPerguntasChampions);
router.get("/perguntas/brasileirao", quizController.buscarPerguntasBr);

module.exports = router;
