// const num = Math.floor(Math.random() * 10);

const colorCodeContainer = document.getElementById("target");
const options = document.getElementById("boxes");
let count = document.getElementById("count");
let newGame = document.getElementById("new_game");

let popUp = document.getElementById('popupMessage')
popUp.innerText = 'm'


let randomColor = null;
let score = 0;

function generateRandomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateRandomColorRGB() {
  const red = generateRandomNumberBetween(0, 255);
  const green = generateRandomNumberBetween(0, 255);
  const blue = generateRandomNumberBetween(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function incrementScore() {
  score += 1;
  count.innerText = score;

  // document.getElementById('count').innerText = score
}

function validateResult(e) {
  console.log(e.target);
  console.log(randomColor);
  const selectedColor = e.target.style.backgroundColor;

  if (selectedColor == randomColor) {
    incrementScore();
    // popUp.classList.add('show')
    popUp.innerText = 'correct'
    popUp.style.backgroundColor = "green"; 

  } else {
    // alert("wrong try again");
    // score = 0;
    popUp.innerText = 'wrong'
    popUp.style.backgroundColor = "red";
  }

  popUp.classList.add("show");
  popUp.classList.remove("hide"); 

  setTimeout(() => {
    popUp.classList.add("hide");
    popUp.classList.remove("show");
  }, 600);


  window.localStorage.setItem("score", score);
  startGame();
}

function startGame() {
  score = Number(window.localStorage.getItem("score")) ?? 0;
  count.innerText = score;

  options.innerText = null;
  randomColor = generateRandomColorRGB();
  colorCodeContainer.style.backgroundColor = randomColor;

  let ansIndex = generateRandomNumberBetween(0, 5);
  console.log(ansIndex);

  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.setAttribute("data-testid", "colorOption");
    div.addEventListener("click", validateResult);
    div.style.backgroundColor =
      i == ansIndex ? randomColor : generateRandomColorRGB();
    options.append(div);
  }
}

function validateNewGame(e) {
  // console.log(e.target);
  // console.log(randomColor);
  const selectedColor = e.target.style.backgroundColor;

  if (selectedColor == randomColor) {
    incrementScore();
  } else {
    // alert('wrong try again')
    score = 0;
  }

  window.localStorage.setItem("score", score);
  startGame();
}



window.addEventListener("load", () => startGame());
newGame.addEventListener("click", validateNewGame);
