async function gerarResposta() {
    const timeBr = document.getElementById('input_time_br').value;
    const timeEuropeu = document.getElementById('time_europeu').value;
    const anoQueComecou = document.getElementById('input_tempo_que_acompanha').value;

    const respostaEl = document.getElementById('resposta');
    const loadingEl = document.getElementById('loading');

    respostaEl.style.display = 'none';
    loadingEl.style.display = 'block';


    const response = await fetch('/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({timeBr, timeEuropeu, anoQueComecou })
    });

    const data = await response.json();

    loadingEl.style.display = 'none';
    respostaEl.style.display = 'block';
    
    document.getElementById('resposta').innerHTML = data.resultado
        .split('\n')
        .filter(linha => linha.trim() !== '')
        .map(linha => `<p>${linha.trim()}</p>`)
        .join('');
}