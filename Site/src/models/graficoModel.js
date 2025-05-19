var database = require("../database/config");

function buscarJogadoresPontuacoes(liga) {
    const instrucaoSql = `
        SELECT 
            usuario.idUsuario AS jogador_id, 
            usuario.nome AS nome_jogador, 
            MAX(resultado.pontos) AS pontos
        FROM resultado
        JOIN usuario ON resultado.fkUsuario = usuario.idUsuario
        JOIN quizzes AS q ON resultado.fkQuiz = q.idQuiz
        WHERE q.liga = '${liga}'
        GROUP BY usuario.idUsuario, usuario.nome
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
        FROM resultado AS r
        JOIN quizzes AS q ON r.fkQuiz = q.idQuiz
        WHERE r.fkUsuario = ${idUsuario}
        GROUP BY q.liga
        ORDER BY pontos DESC;
    `;
    return database.executar(instrucaoSql);
}

function buscarMelhoresPontuadores() {
    const instrucaoSql = `
        SELECT 
        usuario.nome AS 'Nome Jogador', 
        MAX(resultado.pontos) AS pontos
    FROM 
        resultado
    JOIN 
        usuario ON resultado.fkUsuario = usuario.idUsuario
    GROUP BY 
        usuario.idUsuario, usuario.nome
    ORDER BY 
        pontos DESC
    LIMIT 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).catch(error => {
        console.error("Erro ao executar a consulta SQL:", error);
        throw error; // Rethrow para ser tratado posteriormente
    });
}

function buscarPontuacao() {
    const instrucaoSql = `
        SELECT AVG(pontos) as 'avg(pontos)'
        FROM resultado;
    `;
    return database.executar(instrucaoSql);
}

function ultimoTempoUsuario(idUsuario, fkQuiz) {
  const instrucao = `
    SELECT tempo_segundos
    FROM resultado
    WHERE fkUsuario = ${idUsuario} AND fkQuiz = ${fkQuiz}
    ORDER BY idResultado DESC
    LIMIT 1;
  `;
  return database.executar(instrucao);
}

module.exports = {
    buscarJogadoresPontuacoes,
    buscarMelhoresPontuadores,
    buscarPontuacaoUsuarioPorLiga,
    buscarPontuacao,
    ultimoTempoUsuario
}