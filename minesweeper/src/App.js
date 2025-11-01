import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Componentes/Board';
import BoardHead from './Componentes/BoardHead';
//import { clear } from '@testing-library/user-event/dist/clear';

function App() {
  const defaultGameMode = { rows: 9, columns: 9, mines: 10 };
  const [gameMode, setGameMode] = useState(defaultGameMode);
  const [flagCount, setFlagCount] = useState(defaultGameMode.mines);
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let timerId;
    if (startTime !== null && gameStatus === "ongoing") {
      timerId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [startTime, gameStatus]);

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setFlagCount(mode.mines);
    setGameStatus("ongoing");
    setStartTime(null);
    setElapsedTime(0);
  };

  const handleReset = () => {
    setGameMode(gameMode);
    setFlagCount(gameMode.mines);
    setGameStatus("ongoing");
    setStartTime(null);
    setElapsedTime(0);
    setReset((prev) => !prev);
  };

  const changeFlagAmount = (amount) => {
    setFlagCount((prevFlagCount) => Math.max(prevFlagCount + amount, 0));
  };

  const endGame = (status) => {
    alert(status ? "Winner!" : "You lost! Try again!");
    setGameStatus(status ? "win" : "lose");
  };

  const handleCellClick = () => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  };

  return (
    <div className="App">
      <h1 className="main_title">MineSweeper</h1>
      <BoardHead
        flagCount={flagCount}
        onReset={handleReset}
        onModeChange={handleModeChange}
        elapsedTime={elapsedTime}
      />
      <Board
        gameMode={gameMode}
        changeFlagAmount={changeFlagAmount}
        gameStatus={gameStatus}
        endGame={endGame}
        onReset={handleReset}
        onCellClick={handleCellClick}
        reset={reset}

      />
    </div>
  );
}

export default App;
