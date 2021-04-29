import React, { useState } from 'react';

import Board from './Components/Board';

import gameBoard from './logic/gameboard.js';

import produce from 'immer';

function App() {
  let [computerBoard, setComputerBoard] = useState(gameBoard(10));
  let [playerBoard, setPlayerBoard] = useState(gameBoard(10));

  let handleSquareClick = (coords) => {
    setComputerBoard((latest) => {
      return produce(latest, (draft) => {
        draft.receiveHit(coords);
      });
    });
  };

  return (
    <div className="App">
      <Board playerName="Player" board={playerBoard} />
      <Board
        playerName="Computer"
        board={computerBoard}
        handlers={handleSquareClick}
      />
    </div>
  );
}

export default App;
