const comecarQuiz = document.querySelector(".start")
const perguntas = document.querySelector(".questoes")
const questao = document.querySelector(".pergunta")
const respostas = document.querySelector(".respostas")
const proximaPergunta = document.querySelector(".next")

comecarQuiz.addEventListener("click", start)
proximaPergunta.addEventListener("click", next)

var perguntaAtual = 0
var pontos = 0
const fkQuiz = 7

function start(){
    comecarQuiz.style.display = "none"
    perguntas.classList.remove("hide")
    next()
}

function sortearAlternativas(alternativas) {

    for (var i = alternativas.length - 1; i > 0; i--) {
        const sortear = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[sortear]] = [alternativas[sortear], alternativas[i]];
    }
    return alternativas;
}

function next(){

    if(listaDePerguntas.length == perguntaAtual){
        return finalizarQuiz()
    }

    listaDePerguntas[perguntaAtual].respostas = sortearAlternativas(listaDePerguntas[perguntaAtual].respostas);

    respostas.innerHTML = ""
    questao.textContent = listaDePerguntas[perguntaAtual].pergunta
    
    listaDePerguntas[perguntaAtual].respostas.forEach(answer => {

        const novaResposta = document.createElement("button")
        novaResposta.classList.add("botoes", "answer")
        novaResposta.textContent = answer.text

        // Armazenar a informação de 'correct' no dataset do botão
        if(answer.correct){
            novaResposta.dataset.correct = true
        }
        respostas.appendChild(novaResposta)

        novaResposta.addEventListener("click", selecionarRespostas)
        proximaPergunta.classList.add("hide")
    })
}

function enviarPontuacao(pontos, idUsuario, fkQuiz) {
    fetch("/quiz/cadastrarPontos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pontos: pontos,
            idUsuario: idUsuario,
            fkQuiz: fkQuiz
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao enviar pontuação.");
        }
        return res.json();
    })
    .then(data => {
        console.log("Pontuação cadastrada com sucesso:", data);
    })
    .catch(err => {
        console.error("Erro ao enviar pontuação:", err);
    });
}

function selecionarRespostas(event){
    const respostaClicada = event.target
    
    if(respostaClicada.dataset.correct){
        pontos++
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
        proximaPergunta.classList.remove("hide")
    })

    proximaPergunta.classList.remove("hide")
    perguntaAtual++
}

function finalizarQuiz(){
    const qtdPerguntas = listaDePerguntas.length
    proximaPergunta.classList.add("hide")

    perguntas.innerHTML = `
        <p class = "msgFinal"> Você acertou ${pontos} de ${qtdPerguntas} perguntas!
            <span>Tente de novo ou acesse a dashboard e veja como foi seu desempenho comparado ao dos outros usuários</span>
        </p>

        <button onclick = "window.location.reload()" class = "botoes">
            Tentar novamente
        </button>  
    `
    enviarPontuacao(pontos, sessionStorage.ID_USUARIO, 1);
}

var listaDePerguntas = [];

window.onload = () => { // Garante que o código dentro seja executado somente após o carregamento completo da página
    fetch("/quiz/perguntas/copa")
    .then(res => res.json()) // Quando a resposta da API chega, ela é convertida para o formato JSON
    .then(data => { // Os dados JSON convertidos são recebidos aqui

        // Objeto auxiliar para agrupar as alternativas por ID da pergunta
        const perguntasAgrupadas = {};

        // Itera sobre cada item (linha) retornado pela API
        data.forEach(item => {
            // Verifica se já existe uma entrada para o ID da pergunta atual no objeto perguntasAgrupadas
            if (!perguntasAgrupadas[item.idPergunta]) {
                // Se não existir, cria uma nova entrada com a descrição da pergunta e um array vazio para as respostas
                perguntasAgrupadas[item.idPergunta] = {
                    pergunta: item.pergunta,
                    respostas: []
                };
            }
            // Adiciona a alternativa atual ao array de respostas da pergunta correspondente
            perguntasAgrupadas[item.idPergunta].respostas.push({
                text: item.resposta,
                correct: item.correta == 1 // Converte o valor do banco (0 ou 1) para um booleano (false ou true)
            });
        });

        // Converte o objeto perguntasAgrupadas em um array de objetos
        listaDePerguntas = Object.values(perguntasAgrupadas);

        next(); // Chama a função next() para carregar a primeira pergunta assim que os dados são processados
    })
    .catch(err => console.error("Erro ao carregar perguntas:", err));
}