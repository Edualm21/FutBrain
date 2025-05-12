var graficoModel = require("../models/graficoModel");

function buscarPontuacao(req, res) {
    graficoModel.buscarPontuacao().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma pontuação encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pontos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarJogadoresPontuacoes(req, res) {
    graficoModel.buscarJogadoresPontuacoes()
        .then(resultados => {
            res.json(resultados);
        })
        .catch(erro => {
            console.error('Erro ao buscar pontuações dos jogadores: ', erro);
            res.status(500).json({ erro: 'Erro ao buscar as pontuações dos jogadores.' });
        });
}


function buscarMelhoresPontuadores(req, res) {
    graficoModel.buscarMelhoresPontuadores()
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).send("Nenhum jogador encontrado!");
            }
        })
        .catch(erro => {
            console.error('Erro ao buscar os melhores pontuadores: ', erro);
            res.status(500).json({ erro: 'Erro ao buscar os melhores pontuadores.' });
        });
}


module.exports = {
    buscarPontuacao,
    buscarJogadoresPontuacoes,
    buscarMelhoresPontuadores
}