const cible = PIXI.Texture.from('assets/cible.png');
const success = PIXI.Texture.from('assets/success.png');
const supprimer = PIXI.Texture.from('assets/supprimer.png');
const play = PIXI.Texture.from('assets/play.png');
let score = 0;
let gameSpeed = 800;
var combo = 1;
var comboMax = 0;

function updateAffichageScore() {
  document.getElementById('affichageScore').innerHTML = "Score : " + score + "<br> Combo : " + (combo-1);
  if(combo < 3){
      document.body.style.backgroundColor = "#ecfaf2";
  }
  if(combo > 6 && combo < 12){
      document.body.style.backgroundColor = "#aed6f1";
  }
  if(combo > 12 && combo < 16){
      document.body.style.backgroundColor = "#d2b4de";
  }
  if(combo > 20){
      document.body.style.backgroundColor = "#f5b7b1";
  }
  updateComboMax();
}


function updateGameSpeed() {
  gameSpeed = document.getElementById('vitesse').value;
  document.getElementById('affichagGameSpeed').innerHTML = gameSpeed;
}

function updateComboMax(){
    if(combo > comboMax){
        comboMax = combo;
    }
}


function gameStart() {
  //When the game start the score is 0.
  score = 0;
  combo = 1;
  const playBtn = new PIXI.Sprite(play);
  playBtn.anchor.set(0.5);
  playBtn.width = 80;
  playBtn.height = 80;
  playBtn.x = app.screen.width / 2;
  playBtn.y = app.screen.height / 2;
  // Opt-in to interactivity
  playBtn.interactive = true;
  playBtn.on('pointerdown', () => {
    app.stage.removeChild(playBtn);
    changeCursor("crosshair");
    createNewCible();
    startChrono();
  });
  app.stage.addChild(playBtn);
}


function main() {
  document.getElementById('affichagGameSpeed').innerHTML = gameSpeed;
  gameStart();
  updateAffichageScore();
}



function stopGame() {
  updateComboMax();
  destroyView();
  document.body.innerHTML = '';
  let scoreFinal = `
    <h1 style="text-align:center">Votre score final : ${score}</h1>
    <p  style="text-align:center">Avec une vitesse de ${gameSpeed}
        <br>
        Avec un maximum de ${comboMax} Combos !!!
    </p>
    <div class="restarBtn">
    <button onclick='window.location.reload()'>Rejouer</button></div>
  `;
  document.body.innerHTML = scoreFinal;
  // affichageFinalScore = document.getElementById('affichageFinalScore');

}




function createNewCible() {
  const uneCible = new PIXI.Sprite(cible);
  uneCible.width = 30;
  uneCible.height = 30;
  // Positionnement de la cible dans l'espace :
  uneCible.anchor.set(0.5);
  uneCible.x = getRandomInt(15, app.screen.width - 15);
  uneCible.y = getRandomInt(15, app.screen.height - 15);
  // Donner a la cible la possibilité d'etre cliquer : 
  uneCible.interactive = true;
  // Dans le cas d'un clique :
  uneCible.on('pointerdown', () => {
    onCibleClick(uneCible);
    // La cible a été touché donc n'est plus visible :
    cibleVisible = false
  });
  app.stage.addChild(uneCible);

  // La cible vien d'etre ajouter donc elle est visible :
  let cibleVisible = true;

  setTimeout(() => {
    //Si la sible n'a pas encore été detruit depuis 0.5 secondes alors :
    if (cibleVisible) {
        combo = 1;
      //Rendre la cible inclicable :
      uneCible.interactive = false;
      // Changer d'icone :
      uneCible.texture = supprimer;

      setTimeout(() => {
        // La cible est retirer au bous de 0.5 secondes :
        app.stage.removeChild(uneCible);
        createNewCible();
      }, gameSpeed)
    }
  }, gameSpeed)
}






function onCibleClick(uneCible) {

  // À chaque cible toucher le score augmente de 1 :
  uneCible.interactive = false;
  score += combo;
  combo++;
  updateAffichageScore();
  uneCible.texture = success;
  createNewCible();
  setTimeout(() => {
    app.stage.removeChild(uneCible);
  }, gameSpeed)

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
