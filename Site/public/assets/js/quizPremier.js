const comecarQuiz = document.querySelector(".start")
const perguntas = document.querySelector(".questoes")
const questao = document.querySelector(".pergunta")
const respostas = document.querySelector(".respostas")
const proximaPergunta = document.querySelector(".next")

comecarQuiz.addEventListener("click", start)
proximaPergunta.addEventListener("click", next)

var perguntaAtual = 0
var pontos = 0

function start(){
    comecarQuiz.classList.add("hide")
    perguntas.classList.remove("hide")
    next()
}

function next(){
    
    if(listaDePerguntas.length == perguntaAtual){
        return finalizarQuiz()
    }

    respostas.innerHTML = ""
    questao.textContent = listaDePerguntas[perguntaAtual].pergunta

    listaDePerguntas[perguntaAtual].respostas.forEach(answer => {
        const novaResposta = document.createElement("button")
        novaResposta.classList.add("botoes", "answer")
        novaResposta.textContent = answer.text

        if(answer.correct){
            novaResposta.dataset.correct = answer.correct
        }
        respostas.appendChild(novaResposta)

        novaResposta.addEventListener("click", selecionarRespostas)
    })
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
    })

    proximaPergunta.classList.remove("hide")
    perguntaAtual++
}

function finalizarQuiz(){
    const qtdPerguntas = listaDePerguntas.length

    perguntas.innerHTML = `
        <p class = "msgFinal"> Você acertou ${pontos} de ${qtdPerguntas} perguntas!
            <span>Tente de novo ou acesse a dashboard e veja como foi seu desempenho comparado ao dos outros usuários</span>
        </p>

        <button onclick = "window.location.reload()" class = "botoes">
            Tentar novamente
        </button>

        <button onclick = cadastrarPontos(pontos) class = "botoes" id = "button_insert">
            Ver dashboard
        </button>
            
    `
}

const listaDePerguntas = [

    {
        pergunta: "Qual o maior campeão da história do campeonato inglês?",
        respostas: [
            { text: "Liverpool", correct: false },
            { text: "Arsenal", correct: false },
            { text: "Manchester United", correct: true },
            { text: "Chelsea", correct: false },
        ]
    },
    {
        pergunta: "Qual o maior campeão da era Premier League?",
        respostas: [
            { text: "Manchester City", correct: false },
            { text: "Chelsea", correct: false },
            { text: "Liverpool", correct: false },
            { text: "Manchester United", correct: true },
        ]
    },
    {
        pergunta: "Quem é o maior artilheiro da história do campeonato inglês?",
        respostas: [
            { text: "Wayne Rooney", correct: false },
            { text: "Sergio Agüero", correct: false },
            { text: "Alan Shearer", correct: true },
            { text: "Harry Kane", correct: false },
        ]
    },
    {
        pergunta: "Quem é o maior artilheiro de uma única edição do campeonato inglês?",
        respostas: [
            { text: "Mohamed Salah", correct: false },
            { text: "Andy Cole", correct: false },
            { text: "Erling Haaland", correct: true },
            { text: "Thierry Henry", correct: false },
        ]
    },
    {
        pergunta: "Qual o maior campeão de Londres?",
        respostas: [
            { text: "Chelsea", correct: false },
            { text: "Arsenal", correct: true },
            { text: "Tottenham", correct: false },
            { text: "West Ham", correct: false },
        ]
    },
    {
        pergunta: "Em que ano o campeonato inglês passou a se chamar Premier League?",
        respostas: [
            { text: "1990", correct: false },
            { text: "1992", correct: true },
            { text: "1994", correct: false },
            { text: "1996", correct: false },
        ]
    },
    {
        pergunta: "Qual o único time na era Premier League a ganhar um título invicto?",
        respostas: [
            { text: "Chelsea", correct: false },
            { text: "Manchester United", correct: false },
            { text: "Liverpool", correct: false },
            { text: "Arsenal", correct: true },
        ]
    },
    {
        pergunta: "Qual goleiro tem mais jogos sem sofrer gols (clean sheets) na história da Premier League?",
        respostas: [
            { text: "David De Gea", correct: false },
            { text: "Petr Čech", correct: true },
            { text: "Joe Hart", correct: false },
            { text: "Edwin van der Sar", correct: false },
        ]
    },
    {
        pergunta: "Qual clube foi rebaixado mais vezes na era Premier League?",
        respostas: [
            { text: "Norwich City", correct: true },
            { text: "West Bromwich", correct: false },
            { text: "Fulham", correct: false },
            { text: "Sunderland", correct: false },
        ]
    },
    {
        pergunta: "Qual foi o jogo com mais gols em uma única partida da Premier League?",
        respostas: [
            { text: "Tottenham 6x4 Reading", correct: false },
            { text: "Arsenal 7x3 Newcastle", correct: false },
            { text: "Manchester United 8x2 Arsenal", correct: false },
            { text: "Portsmouth 7x4 Reading", correct: true },
        ]
    }
]