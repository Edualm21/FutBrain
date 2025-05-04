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
function premierDash(){
    window.location = '../dashboard/dashs/premier.html'    
}
function laligaDash(){
    window.location = '../dashboard/dashs/laliga.html'    
}
function serieADash(){
    window.location = '../dashboard/dashs/serieA.html'    
}
function bundesligaDash(){
    window.location = '../dashboard/dashs/bundesliga.html'    
}
function brasileiraoDash(){
    window.location = '../dashboard/dashs/brasileirao.html'    
}
function championsDash(){
    window.location = '../dashboard/dashs/champions.html'    
}
function worldCupDash(){
    window.location = '../dashboard/dashs/worldCup.html'    
}
function futebolDash(){
    window.location = '../dashboard/dashs/futebol.html'    
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });
  });