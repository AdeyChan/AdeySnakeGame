import React from "react";
import "./app.css";

function App() {
  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");
  const controls = document.querySelectorAll(".controls i");

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5,
    snakeY = 5;
  let velocityX = 0,
    velocityY = 0;
  let snakeBody = [];
  let setIntervalId;
  let score = 0;

  // Get high score from local storage

  let highScore = localStorage.getItem("high-score") || 0;
  highScoreElement.innerText = `High Score: ${highScore}`;

  // Pass a random between 1 and 30 as a food position

  const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  };
  const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to relay...");
    location.reload();
  };

  // Change velocity value based on key press

  const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velcoityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };

  // Change Direction on each key click

  controls.forEach((button) =>
    button.addEventListener("click", () =>
      changeDirection({ key: button.dataset.key })
    )
  );

  const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // When snake eat food
    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodY, foodX]);
      score++;
      highScore = score >= highScore ? score : highScore; // if score > high score => high score = score

      localStorage.setItem("high-score", highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `HighScore: ${highScore}`;
    }

    // Update Snake Head
    snakeX += velocityX;
    snakeY += velocityY;

    //Shifting forward values of elements in snake body by one

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // Check snake body is out of wall or no

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      return (gameOver = true);
    }

    // Add div for each part of snake body

    for (let i = 0; i < snakeBody.length; i++) {
      html += `<div class="head" style="grid-area: ${snakeBody[i][i]} / ${snakeBody[i][0]}"></div>`;
      // Check snake head hit body or no
      if (
        i !== 0 &&
        snakeBody[0][i] === snakeBody[i][1] &&
        snakeBody[0][0] === snakeBody[i][0]
      ) {
        gameOver = true;
      }
    }
    playBoard.innerHTML = html;
  };

  updateFoodPosition();
  setInterval = setInterval(initGame, 100);
  document.addEventListener("keyup", changeDirection);

  return (
    <div className="wrapper">
      <div className="game-details">
        <span className="score">Score: 0</span>
        <span className="high-score">High Score: 0</span>
      </div>

      <div className="play-board"></div>

      <div className="controls">
        <i data-key="ArrowLeft" className="fas fa-arrow-left"></i>
        <i data-key="ArrowUp" className="fas fa-arrow-up"></i>
        <i data-key="ArrowDown" className="fas fa-arrow-down"></i>
        <i data-key="ArrowRight" className="fas fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default App;
