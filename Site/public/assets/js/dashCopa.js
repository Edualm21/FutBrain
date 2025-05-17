fetch('/grafico/buscarPontuacao')
  .then(response => response.json())
  .then(data => {
    const media = data[0]?.['avg(pontos)'] || 0;
    document.getElementById('mediaValor').innerText = parseFloat(media).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));


// Buscar top 3 pontuadores
fetch('/grafico/buscarMelhoresPontuadores')
  .then(response => response.json())
  .then(data => {
    console.log("Dados recebidos:", data); 
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



// Plotar gráfico de pontuação dos jogadores
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
        backgroundColor: '#FFFF00' }],
    };

    new Chart(document.getElementById('grafico1'), { type: 'bar', data: chartData });
  })
  .catch(error => console.error('Erro ao buscar pontuação dos jogadores:', error));



const idUsuario = sessionStorage.getItem('ID_USUARIO');

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
        backgroundColor: '#FFFF00'
      }]
    };

    new Chart(document.getElementById('grafico2'), {
      type: 'bar',
      data: chartData
    });
  })
  .catch(error => console.error('Erro ao buscar pontuação por liga:', error));

