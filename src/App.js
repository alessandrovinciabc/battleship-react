import React, { useState } from 'react';

import Board from './Components/Board';

import gameBoard from './logic/gameboard.js';
import computer from './logic/computer.js';

import produce from 'immer';

import './App.css';

function App() {
  let [playerBoard, setPlayerBoard] = useState(gameBoard(10));
  let [computerBoard, setComputerBoard] = useState(gameBoard(10));

  let handleSquareClick = (coords) => {
    setComputerBoard((latest) => {
      return produce(latest, (draft) => {
        draft.receiveHit(coords);
      });
    });

    setPlayerBoard((latest) => {
      return produce(latest, (draft) => {
        let move = computer.pickMove(draft);
        draft.receiveHit(move);
      });
    });
  };

  return (
    <div className="App">
      <div className="App__title">Battleship🛥</div>
      <div className="App__container">
        <Board playerName="Player" board={playerBoard} />
        <Board
          playerName="Computer"
          board={computerBoard}
          handlers={handleSquareClick}
        />
      </div>
    </div>
  );
}

export default App;
