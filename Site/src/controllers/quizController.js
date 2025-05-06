var quizModel = require("../models/quizModel");

function buscarPerguntasPremier(req, res) {
    quizModel.listarPerguntasPremier().then(function (resultado) {
        const perguntasMap = {};

        resultado.forEach(row => {
            const { idPergunta, pergunta, idAlternativa, resposta, correta } = row;

            if (!perguntasMap[idPergunta]) {
                perguntasMap[idPergunta] = {
                    idPergunta,
                    pergunta,
                    alternativas: []
                };
            }

            perguntasMap[idPergunta].alternativas.push({
                idAlternativa,
                resposta,
                correta
            });
        });

        const perguntasFormatadas = Object.values(perguntasMap);
        console.log("Perguntas formatadas:", JSON.stringify(perguntasFormatadas, null, 2)); // <-- VERIFICAR ISSO

        res.status(200).json(perguntasFormatadas);
    }).catch(function (erro) {
        console.error("Erro no controller:", erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPerguntasChampions(req, res) {
    quizModel.listarPerguntasChampions().then(function (resultado) {
        const perguntasMap = {};

        resultado.forEach(row => {
            const { idPergunta, pergunta, idAlternativa, resposta, correta } = row;

            if (!perguntasMap[idPergunta]) {
                perguntasMap[idPergunta] = {
                    idPergunta,
                    pergunta,
                    alternativas: []
                };
            }

            perguntasMap[idPergunta].alternativas.push({
                idAlternativa,
                resposta,
                correta
            });
        });

        const perguntasFormatadas = Object.values(perguntasMap);
        console.log("Perguntas formatadas:", JSON.stringify(perguntasFormatadas, null, 2)); // <-- VERIFICAR ISSO

        res.status(200).json(perguntasFormatadas);
    }).catch(function (erro) {
        console.error("Erro no controller:", erro);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarPerguntasPremier,
    buscarPerguntasChampions
};