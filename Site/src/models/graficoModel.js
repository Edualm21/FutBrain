var database = require("../database/config");

function buscarJogadoresPontuacoes(liga) {
    const instrucaoSql = `
        SELECT 
            u.idUsuario AS jogador_id, 
            u.nome AS nome_jogador, 
            MAX(r.pontos) AS pontos
        FROM Resultado as r
        JOIN Usuario as u ON r.fkUsuario = u.idUsuario
        JOIN Quizzes AS q ON r.fkQuiz = q.idQuiz
        WHERE q.liga = '${liga}'
        GROUP BY u.idUsuario, u.nome
        ORDER BY pontos DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontuacaoUsuarioPorLiga(idUsuario) {
    const instrucaoSql = `
        SELECT 
            q.liga AS liga,
            MAX(r.pontos) AS pontos
        FROM Resultado AS r
        JOIN Quizzes AS q ON r.fkQuiz = q.idQuiz
        WHERE r.fkUsuario = ${idUsuario}
        GROUP BY q.liga
        ORDER BY pontos DESC;
    `;
    return database.executar(instrucaoSql);
}

function buscarMelhoresPontuadores(fkQuiz) {
    const instrucaoSql = `
    SELECT 
        u.nome AS 'Nome Jogador', 
        MAX(r.pontos) AS pontos
    FROM Resultado as r
    JOIN Usuario as u ON r.fkUsuario = u.idUsuario
    WHERE r.fkQuiz = ${fkQuiz}
    GROUP BY u.idUsuario, u.nome
    ORDER BY pontos DESC
    LIMIT 3;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontuacao(fkQuiz) {
    const instrucaoSql = `
        SELECT AVG(pontos) AS 'avg(pontos)'
        FROM Resultado
        WHERE fkQuiz = ${fkQuiz};
    `;
    return database.executar(instrucaoSql);
}

function topTresTempos(fkQuiz) {
    const instrucao = `
    SELECT 
        u.nome,
        CONCAT(
            LPAD(FLOOR(melhor_tempo.tempo_segundos / 60), 2, '0'),
            ':',
            LPAD(melhor_tempo.tempo_segundos % 60, 2, '0')
        ) AS tempo_formatado
    FROM (
        SELECT fkUsuario, MIN(tempo_segundos) AS tempo_segundos
        FROM Resultado
        WHERE fkQuiz = ${fkQuiz}
        AND tempo_segundos IS NOT NULL
        GROUP BY fkUsuario
    ) AS melhor_tempo
    JOIN Usuario AS u ON melhor_tempo.fkUsuario = u.idUsuario
    ORDER BY melhor_tempo.tempo_segundos ASC
    LIMIT 3;
  `;
    return database.executar(instrucao);
}

function mediaPontuacaoUsuario(idUsuario, fkQuiz) {
    const instrucao = `
    SELECT AVG(pontos) AS media_pontuacao
    FROM Resultado
    WHERE fkUsuario = ${idUsuario} AND fkQuiz = ${fkQuiz};
  `;
    return database.executar(instrucao);
}

module.exports = {
    buscarJogadoresPontuacoes,
    buscarMelhoresPontuadores,
    buscarPontuacaoUsuarioPorLiga,
    buscarPontuacao,
    topTresTempos,
    mediaPontuacaoUsuario
}