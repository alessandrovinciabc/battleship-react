import React, { useState } from 'react';

import Board from './Components/Board';

import gameBoard from './logic/gameboard.js';

import produce from 'immer';

function App() {
  let [playerBoard, setPlayerBoard] = useState(gameBoard(10));

  let handleSquareClick = (coords) => {
    setPlayerBoard((latest) => {
      return produce(latest, (draft) => {
        draft.receiveHit(coords);
      });
    });
  };

  return (
    <div className="App">
      <Board title="Player" board={playerBoard} handlers={handleSquareClick} />
    </div>
  );
}

export default App;
