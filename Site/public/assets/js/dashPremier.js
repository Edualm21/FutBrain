fetch('/quiz/listarPontos')
  .then(response => response.json())
  .then(data => {
    const media = data[0]?.['avg(pontos)'] || 0;
    document.getElementById('mediaPontuacaoJogador').innerText = parseFloat(media).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));


// Buscar top 3 pontuadores
fetch('/grafico/buscarMelhoresPontuadores')
  .then(response => response.json())
  .then(data => {
    const top3List = document.getElementById('top3Pontuadores');
    top3List.innerHTML = '';

    data.slice(0, 3).forEach((player, index) => {
      const listItem = document.createElement('li');
      const medalha = ['🥇', '🥈', '🥉'][index] || '';
      listItem.innerHTML = `${medalha} ${player.nome_jogador}: ${player.pontos} pontos`;
      top3List.appendChild(listItem);
    });
  })
  .catch(error => console.error('Erro ao buscar top 3 pontuadores:', error));



// Plotar gráfico de pontuação dos jogadores
fetch('/grafico/buscarJogadoresPontuacoes')
      .then(response => response.json())
      .then(data => {
        const jogadores = data.map(item => item.nome_jogador);
        const pontuacoes = data.map(item => item.pontos);

        const chartData = {
          labels: jogadores,
          datasets: [{ label: 'Pontuação dos jogadores', data: pontuacoes, backgroundColor: '#fafafc' }],
        };
        new Chart(document.getElementById('grafico1'), { type: 'bar', data: chartData });
      })
      .catch(error => console.error('Erro ao buscar pontuação dos jogadores:', error));


fetch('/grafico/buscarPontuacaoPorQuiz')
  .then(response => response.json())
  .then(data => {
    const jogadores = data.map(item => item.nome_jogador);
    const pontuacoes = data.map(item => item.pontos);

    const chartData = {
      labels: jogadores,
      datasets: [{ label: 'Sua pontuação nos quizzes', data: pontuacoes, backgroundColor: '#FFF' }],
    };
    new Chart(document.getElementById('grafico2'), { type: 'bar', data: chartData });
  })
  .catch(error => console.error('Erro ao buscar pontuação dos jogadores:', error));
