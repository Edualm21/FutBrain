const ligaAtual = sessionStorage.getItem("LIGA_ATUAL");
const fkQuiz = obterFkQuizPorLiga(ligaAtual);
const idUsuario = sessionStorage.getItem('ID_USUARIO');

function obterFkQuizPorLiga(ligaAtual) {
  const ligasParaQuiz = {
    "Premier League": 1,
    "La Liga": 2,
    "Bundesliga": 3,
    "Serie A Tim": 4,
    "Brasileirão": 5,
    "Champions League": 6,
    "Copa do Mundo": 7,
    "Futebol": 8
  };

  return ligasParaQuiz[ligaAtual];
}

function obterCorPorLiga(ligaAtual) {
  const cores = {
    "Premier League": "#541C5D",
    "La Liga": "#DC052D",
    "Bundesliga": "#DC052D",
    "Serie A Tim": "#0000FF",
    "Brasileirão": "#004d96",
    "Champions League": "#004d96",
    "Copa do Mundo": "#F0E111",
    "Futebol": "#FFF"
  };

  return cores[ligaAtual];
}

fetch(`/grafico/buscarPontuacao/${fkQuiz}`)
  .then(response => response.json())
  .then(data => {
    const media = data[0]?.['avg(pontos)'] || 0;
    document.getElementById('mediaValor').innerText = parseFloat(media).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));

fetch(`/grafico/buscarMelhoresPontuadores/${fkQuiz}`)
  .then(response => response.json())
  .then(data => {
    console.log("Resposta recebida:", data);

    const top3List = document.getElementById('topTresPontuadores');
    top3List.innerHTML = '';

    data.slice(0, 3).forEach((player, index) => {
      const listItem = document.createElement('li');
      const medalha = ['🥇', '🥈', '🥉'][index] || '';
      listItem.innerHTML = `${medalha} ${player["Nome Jogador"]}: ${player.pontos} pontos`;
      top3List.appendChild(listItem);
    });
  })
  .catch(error => console.error('Erro ao buscar top 3 pontuadores:', error));

fetch('/grafico/buscarJogadoresPontuacoes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ liga: liga })
})
  .then(response => response.json())
  .then(data => {
    const jogadores = data.map(item => item.nome_jogador || item["Nome Jogador"]);
    const pontuacoes = data.map(item => item.pontos);

    const chartData = {
      labels: jogadores,
      datasets: [{ 
        label: 'Pontuação dos jogadores', 
        data: pontuacoes, 
        backgroundColor: obterCorPorLiga(liga),
        color: '#000' }],
    };

    new Chart(document.getElementById('grafico1'), { type: 'bar', data: chartData });
  })
  .catch(error => console.error('Erro ao buscar pontuação dos jogadores:', error));


fetch(`/grafico/buscarPontuacaoUsuarioPorLiga/${idUsuario}`)
  .then(response => response.json())
  .then(data => {
    const ligas = data.map(item => item.liga);
    const pontos = data.map(item => item.pontos);

    const chartData = {
      labels: ligas,
      datasets: [{
        label: 'Maior pontuação por liga',
        data: pontos,
        backgroundColor: obterCorPorLiga(liga),
        color: '#000'
      }]
    };

    new Chart(document.getElementById('grafico2'), {
      type: 'bar',
      data: chartData
    });
  })
  .catch(error => console.error('Erro ao buscar pontuação por liga:', error));


fetch(`/grafico/buscarTopTresTempos/${fkQuiz}`)
  .then(res => res.json())
  .then(data => {
    console.log('Dados recebidos:', data);
    const ul = document.getElementById('listaMelhoresTempos');
    ul.innerHTML = '';
    data.forEach((item, index) => {
      const li = document.createElement('li');
      const medalha = ['🥇', '🥈', '🥉'][index] || '';
      li.innerHTML = `${medalha}: ${item.usuario} - ${item.tempo_formatado}`;
      ul.appendChild(li);
    });
  })
  .catch(err => console.error('Erro ao buscar top 3 tempos:', err));


fetch(`/grafico/mediaPontuacao/${idUsuario}/${fkQuiz}`)
  .then(res => res.json())
  .then(data => {
    const media = data.media_pontuacao ? parseFloat(data.media_pontuacao).toFixed(2) : '0.00';
    document.getElementById('pontuacaoMediaJogador').innerHTML = `${media}`;
  })
  .catch(err => console.error('Erro ao buscar média de pontuação:', err));
