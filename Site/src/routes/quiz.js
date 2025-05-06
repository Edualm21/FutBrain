var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/perguntas/premier", quizController.buscarPerguntasPremier);

module.exports = router;
