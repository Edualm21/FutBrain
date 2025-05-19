var database = require("../database/config");

function buscarPerguntasPorQuiz(fkQuiz) {
    const instrucao = `
        SELECT p.idPergunta, p.descricao AS pergunta, a.idAlternativa, a.resposta, a.correta
        FROM (
            SELECT idPergunta, descricao
            FROM perguntas
            WHERE fkQuiz = ${fkQuiz}
            ORDER BY RAND()
            LIMIT 10
        ) AS p
        JOIN alternativas a ON a.fkPergunta = p.idPergunta
        ORDER BY p.idPergunta, a.idAlternativa;
    `;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}

function listarPontos() {
    console.log("ACESSEI O QUIZ  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
    select avg(pontos) from resultado;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarPontos(idUsuario, fkQuiz, pontos, tempo) {
  const instrucao = `
    INSERT INTO resultado (fkUsuario, fkQuiz, pontos, tempo_segundos) VALUES 
    ('${idUsuario}', '${fkQuiz}', '${pontos}', '${tempo}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}



module.exports = {
    buscarPerguntasPorQuiz,
    listarPontos,
    cadastrarPontos
};




