var database = require("../database/config");

function buscarJogadoresPontuacoes() {
    const instrucaoSql = `
    SELECT 
        usuario.idUsuario AS jogador_id, 
        usuario.nome AS nome_jogador, 
        resultado.pontos 
    FROM resultado 
    JOIN usuario ON resultado.fkUsuario = usuario.idUsuario
    ORDER BY resultado.pontos DESC;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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



module.exports = {
    buscarJogadoresPontuacoes,
    buscarMelhoresPontuadores,
}