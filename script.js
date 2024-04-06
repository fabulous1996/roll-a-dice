// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Évènements se produisant au lancé du dé
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Génère un nombre aléatoire entre 1 et 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Affiche le nombre aléatoire
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Vérifie le nombre affiché
    if (dice !== 1) {
      // Ajoue le score du dé au current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Passe au joueur suivant
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Ajouter le score en cours au score du joueur actif
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Vérifier si le score est >= 50
    if (scores[activePlayer] >= 50) {
      // Termine le jeu
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Passe au joueur suivant
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
