var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.post("/buscarJogadoresPontuacoes", function (req, res){graficoController.buscarJogadoresPontuacoes(req, res);});
router.get("/buscarPontuacaoUsuarioPorLiga/:idUsuario", function (req, res){graficoController.buscarPontuacaoUsuarioPorLiga(req, res);});
router.get("/buscarMelhoresPontuadores", function (req, res) {graficoController.buscarMelhoresPontuadores(req, res);});
router.get("/buscarPontuacao", function (req, res) {graficoController.buscarPontuacao(req, res);})
router.get('/buscarTempoMedio/:fkQuiz', graficoController.buscarTempoMedio);
router.get('/buscarUltimoTempo/:idUsuario/:fkQuiz', graficoController.buscarUltimoTempo);


module.exports = router;