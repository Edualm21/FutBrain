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

function shuffleAlternatives(alternativas) {
    for (let i = alternativas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
    return alternativas;
}

function next(){

    if(listaDePerguntas.length == perguntaAtual){
        return finalizarQuiz()
    }

    listaDePerguntas[perguntaAtual].respostas = shuffleAlternatives(listaDePerguntas[perguntaAtual].respostas);

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

        <button onclick = cadastrarPontos(pontos) class = "botoes" id = "button_insert">
            Ver dashboard
        </button>
            
    `
}

let listaDePerguntas = [];


comecarQuiz.disabled = true

window.onload = () => {
    fetch("/quiz/perguntas/premier")
    .then(res => res.json())
    .then(data => {
        console.log("DADOS RECEBIDOS:", JSON.stringify(data, null, 2));
        listaDePerguntas = data.map(pergunta => {
            return {
                pergunta: pergunta.pergunta,
                respostas: pergunta.alternativas.map(alt => ({
                    text: alt.resposta,
                    correct: alt.correta == 1
                }))
            }
        });
        comecarQuiz.disabled = false;
    })
    .catch(err => console.error("Erro ao carregar perguntas:", err));
}