// jshint esversion:6

const homePage = document.getElementById('home');
const playPage = document.getElementById('play');
const btn = document.getElementById('playbtn');

const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');

const score = document.getElementById('score');

const clickColor = document.getElementById('clickColor');

const timer = document.getElementById('timer');

const clickBtns = document.querySelectorAll('.btn');

const popup = document.querySelector('#popup');
const popupScore = document.querySelector('#popupScore');
const playAgain = document.querySelector('#playAgain');

const colors = ['#776AE3', '#88E570', '#3AB0FF', '#FFB44A'];
const colorsList = ['Orange', 'Green', 'Purple', 'Blue'];
let scoreCount = 0;

const ok = new Audio('Ok.mp3');
const no = new Audio('No.wav');
const click = new Audio('Click.wav');

btn.addEventListener('click', open);
playAgain.addEventListener('click', playagain);

for (var i = 0; i < clickBtns.length; i++) {
  const btnsClick = clickBtns[i].addEventListener('click', function () {
    const btnStyles = window.getComputedStyle(this);
    const btnColor = btnStyles.getPropertyValue('background-color');
    btnClick(btnColor);
  });
}

function open() {
  click.play();
  setTimeout(() => {
    homePage.style.display = 'none';
    playPage.style.display = 'block';
    pickColor();
  }, 400);
}

function pickColor() {
  const i = Math.floor(Math.random() * colors.length);
  const j = Math.floor(Math.random() * colorsList.length);
  clickColor.style.color = colors[i];
  clickColor.innerHTML = colorsList[j];

  return true;
}

let lifeCount = 3;

function lifesCount(lifes) {
  if (lifes === 3) {
    l3.classList.add('scale');
    return 2;
  } else if (lifes === 2) {
    l2.classList.add('scale');
    return 1;
  } else if (lifes === 1) {
    l1.classList.add('scale');
    setTimeout(() => {
      popupScore.innerHTML = score.innerHTML;
      popup.style.display = 'block';
      return 3;
    }, 300);
  }
}

function btnClick(color) {
  if (color === clickColor.style.color) {
    scoreCount += 2;
    score.innerHTML = scoreCount;
    ok.play();
    pickColor();
    return true;
  } else {
    no.play();
    pickColor();
    const lifes = lifesCount(lifeCount);
    lifeCount = lifes;
    return false;
  }
}

function playagain() {
  l1.classList.remove('scale');
  l2.classList.remove('scale');
  l3.classList.remove('scale');
  scoreCount = 0;
  score.innerHTML = 0;
  lifeCount = 3;
  click.play();
  setTimeout(() => {
    popup.style.display = 'none';
    playPage.style.display = 'none';
    homePage.style.display = 'block';
    return true;
  }, 300);
}
