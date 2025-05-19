const comecarQuiz = document.querySelector(".start")
const perguntas = document.querySelector(".questoes")
const questao = document.querySelector(".pergunta")
const respostas = document.querySelector(".respostas")
const proximaPergunta = document.querySelector(".next")

comecarQuiz.addEventListener("click", start)
proximaPergunta.addEventListener("click", next)

var perguntaAtual = 0
var pontos = 0
const fkQuiz = sessionStorage.getItem("fkQuiz")

if (!fkQuiz) {
    alert("Quiz não identificado.")
    window.location.href = "../../home.html"
}

function start() {
    comecarQuiz.style.display = "none"
    perguntas.classList.remove("hide")
    iniciarCronometro()
    next()
}

function sortearAlternativas(alternativas) {
    for (var i = alternativas.length - 1; i > 0; i--) {
        const sortear = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[sortear]] = [alternativas[sortear], alternativas[i]];
    }
    return alternativas;
}

function next() {
    if (listaDePerguntas.length == perguntaAtual) {
        return finalizarQuiz()
    }

    listaDePerguntas[perguntaAtual].respostas = sortearAlternativas(listaDePerguntas[perguntaAtual].respostas);

    respostas.innerHTML = ""
    questao.textContent = listaDePerguntas[perguntaAtual].pergunta

    listaDePerguntas[perguntaAtual].respostas.forEach(answer => {
        const novaResposta = document.createElement("button")
        novaResposta.classList.add("botoes", "answer")
        novaResposta.textContent = answer.text

        if (answer.correct) {
            novaResposta.dataset.correct = true
        }

        respostas.appendChild(novaResposta)

        novaResposta.addEventListener("click", selecionarRespostas)
        proximaPergunta.classList.add("hide")
    })
}

function selecionarRespostas(event) {
    const respostaClicada = event.target

    if (respostaClicada.dataset.correct) {
        pontos++
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
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

let cronometroIntervalo;
let tempoDecorrido = 0;

function iniciarCronometro() {
    tempoDecorrido = 0;
    cronometroIntervalo = setInterval(() => {
        tempoDecorrido++;
        document.getElementById('cronometro').innerText = `Tempo: ${tempoDecorrido}s`;
    }, 1000);
}

function pararCronometro() {
    clearInterval(cronometroIntervalo);
    return tempoDecorrido;
}

function finalizarQuiz() {
    const qtdPerguntas = listaDePerguntas.length
    proximaPergunta.classList.add("hide")
    const tempo = pararCronometro();

    perguntas.innerHTML = `
        <p class="msgFinal">
            <p style="margin-top:-10%; color: #FFFFFF;">
                Você acertou ${pontos} de ${qtdPerguntas} perguntas!
            </p>
            <span style="color: #FFFFFF;">
                Tente de novo ou acesse a dashboard e veja como foi seu desempenho comparado ao dos outros usuários
            </span>
        </p>

        <button onclick="window.location.reload()" class="botoes" style="margin-top: 50%;">
            Tentar novamente
        </button>
    `
    enviarPontuacao(pontos, sessionStorage.ID_USUARIO, fkQuiz, tempo);
}

function enviarPontuacao(pontos, idUsuario, fkQuiz, tempo) {
    fetch("/quiz/cadastrarPontos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pontos: pontos,
            idUsuario: idUsuario,
            fkQuiz: fkQuiz,
            tempo: tempo
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao enviar pontuação.")
            return res.json()
        })
        .then(data => {
            console.log("Pontuação cadastrada com sucesso:", data);
        })
        .catch(err => {
            console.error("Erro ao enviar pontuação:", err);
        });
}

var listaDePerguntas = [];

window.onload = () => {
    fetch(`/quiz/perguntas/${fkQuiz}`)
        .then(res => res.json())
        .then(data => {
            const perguntasAgrupadas = {}

            data.forEach(item => {
                if (!perguntasAgrupadas[item.idPergunta]) {
                    perguntasAgrupadas[item.idPergunta] = {
                        pergunta: item.pergunta,
                        respostas: []
                    }
                }

                perguntasAgrupadas[item.idPergunta].respostas.push({
                    text: item.resposta,
                    correct: item.correta == 1
                })
            })

            listaDePerguntas = Object.values(perguntasAgrupadas)
            next()
        })
        .catch(err => console.error("Erro ao carregar perguntas:", err))
}
