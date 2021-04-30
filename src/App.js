import React, { useEffect, useState } from 'react';

import Board from './Components/Board';

import ship from './logic/ship.js';
import gameBoard from './logic/gameboard.js';
import computer from './logic/computer.js';

import produce from 'immer';

import './App.css';

function App() {
  let [playerBoard, setPlayerBoard] = useState(gameBoard(10));
  let [computerBoard, setComputerBoard] = useState(gameBoard(10));

  let [orientation, setOrientation] = useState('vertical');

  useEffect(() => {
    let testBoard = gameBoard(10);
    let aShip = ship(5);
    testBoard.placeShip(aShip, { x: 0, y: 0 }, 'vertical');

    setComputerBoard(testBoard);
  }, []);

  let handleSquareClick = (coords) => {
    let setPlayerBoardCallback = (latest) => {
      return produce(latest, (draft) => {
        let move = computer.pickMove(draft);
        draft.receiveHit(move);
      });
    };

    setComputerBoard((latest) => {
      if (latest.squares[coords.y][coords.x].hit) return latest;

      setPlayerBoard(setPlayerBoardCallback);

      return produce(latest, (draft) => {
        draft.receiveHit(coords);
      });
    });
  };

  let handlePlayerBoardClick = (coords) => {
    setPlayerBoard((latest) => {
      return produce(latest, (draft) => {
        let newShip = ship(5);
        if (!draft.isValidPlaceForShip(newShip, coords, orientation)) return;
        draft.placeShip(newShip, coords, orientation);
      });
    });
  };

  return (
    <div className="App">
      <div className="App__title">Battleship🛥</div>
      <div className="App__container">
        <Board
          playerName="Player"
          board={playerBoard}
          handlers={handlePlayerBoardClick}
        />
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
