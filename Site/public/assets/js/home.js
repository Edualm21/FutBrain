function premier(){
    window.location = '../dashboard/quiz/premier.html'    
}

function laliga(){
    window.location = '../dashboard/quiz/laliga.html'    
}

function serieA(){
    window.location = '../dashboard/quiz/serieA_tim.html'    
}

function bundesliga(){
    window.location = '../dashboard/quiz/bundesliga.html'    
}

function brasileirao(){
    window.location = '../dashboard/quiz/brasileirao.html'    
}

function champions(){
    window.location = '../dashboard/quiz/champions.html'    
}

function worldCup(){
    window.location = '../dashboard/quiz/worldCup.html'    
}

function futebol(){
    window.location = '../dashboard/quiz/futebol.html'    
}

function premierDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Premier League");
    window.location = '../dashboard/dashs/premier.html';
}

function laligaDash() {
    sessionStorage.setItem("LIGA_ATUAL", "La Liga");
    window.location = '../dashboard/dashs/laliga.html';
}

function serieADash() {
    sessionStorage.setItem("LIGA_ATUAL", "Serie A");
    window.location = '../dashboard/dashs/serieA.html';
}

function bundesligaDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Bundesliga");
    window.location = '../dashboard/dashs/bundesliga.html';
}

function brasileiraoDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Brasileirão");
    window.location = '../dashboard/dashs/brasileirao.html';
}

function championsDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Champions League");
    window.location = '../dashboard/dashs/champions.html';
}

function worldCupDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Copa do Mundo");
    window.location = '../dashboard/dashs/worldCup.html';
}

function futebolDash() {
    sessionStorage.setItem("LIGA_ATUAL", "Futebol");
    window.location = '../dashboard/dashs/futebol.html';
}


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });
  });