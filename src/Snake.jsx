import React, { useState, useEffect } from "react";
import "./app.css";

const Snake = () => {
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("high-score") || 0
  );

  useEffect(() => {
    const handleGameOver = () => {
      alert("Game Over! Press OK to replay...");
      setSnake([{ x: 5, y: 5 }]);
      setDirection({ x: 0, y: 0 });
      setGameOver(false);
      setScore(0);
    };

    const updateGame = () => {
      if (gameOver) return handleGameOver();

      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        let newHead = {
          x: newSnake[0].x + direction.x,
          y: newSnake[0].y + direction.y,
        };

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 30),
          });
          setScore((prev) => prev + 1);
        } else {
          newSnake.pop();
        }

        if (
          newHead.x < 0 ||
          newHead.x > 30 ||
          newHead.y < 0 ||
          newHead.y > 30
        ) {
          setGameOver(true);
        }

        newSnake.unshift(newHead);
        return newSnake;
      });
    };

    const gameInterval = setInterval(updateGame, 200);
    return () => clearInterval(gameInterval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" && direction.y === 0)
        setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y === 0)
        setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x === 0)
        setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x === 0)
        setDirection({ x: 1, y: 0 });
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  return (
    <div className="wrapper">
      <div className="game-details">
        <span className="score">Score: {score}</span>
        <span className="high-score">High Score: {highScore}</span>
      </div>

      <div className="play-board">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="head"
            style={{ gridColumn: segment.x, gridRow: segment.y }}
          />
        ))}
        <div className="food" style={{ gridColumn: food.x, gridRow: food.y }} />
      </div>

      <div className="controls">
        <button onClick={() => setDirection({ x: -1, y: 0 })}>Left</button>
        <button onClick={() => setDirection({ x: 1, y: 0 })}>Right</button>
        <button onClick={() => setDirection({ x: 0, y: -1 })}>Up</button>
        <button onClick={() => setDirection({ x: 0, y: 1 })}>Down</button>
      </div>
    </div>
  );
};

export default Snake;
