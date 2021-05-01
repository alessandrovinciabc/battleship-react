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
  let [remainingShips, setRemainingShips] = useState([5, 4, 3, 3, 2]);

  let [gameEnded, setGameEnded] = useState(false);
  let [playerHasWon, setPlayerHasWon] = useState(false);

  let [order, setOrder] = useState(
    'Place your ships by clicking. Press R to rotate.'
  );

  useEffect(() => {
    let testBoard = gameBoard(10);
    let ships = [5, 4, 3, 3, 2];

    ships = ships.map((shipSize) => {
      return ship(shipSize);
    });

    testBoard.autoPlaceShips(ships);

    setComputerBoard(testBoard);
  }, []);

  let handleSquareClick = (coords) => {
    if (gameEnded || remainingShips.length > 0) return;
    let setPlayerBoardCallback = (latest) => {
      return produce(latest, (draft) => {
        let move = computer.pickMove(draft);
        draft.receiveHit(move);
        if (!draft.hasWorkingShips()) {
          setGameEnded(true);
          setOrder('');
        }
      });
    };

    setComputerBoard((latest) => {
      if (latest.squares[coords.y][coords.x].hit) return latest;

      setPlayerBoard(setPlayerBoardCallback);

      return produce(latest, (draft) => {
        draft.receiveHit(coords);

        if (!draft.hasWorkingShips()) {
          setGameEnded(true);
          setPlayerHasWon(true);
          setOrder('');
        }
      });
    });
  };

  useEffect(() => {
    let onKeyDown = (e) => {
      if (e.key === 'r' || e.key === 'R') {
        setOrientation((prev) => {
          return prev === 'horizontal' ? 'vertical' : 'horizontal';
        });
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  let handlePlayerBoardClick = (coords) => {
    setPlayerBoard((latest) => {
      if (remainingShips.length === 0) return latest;

      let result = produce(latest, (draft) => {
        let newShip = ship(remainingShips[0]);
        if (!draft.isValidPlaceForShip(newShip, coords, orientation)) return;
        draft.placeShip(newShip, coords, orientation);

        setRemainingShips(remainingShips.slice(1));
        if (remainingShips.length - 1 === 0) {
          setOrder('Game has begun! Make your move.');
        }
      });

      return result;
    });
  };

  return (
    <div className="App">
      <div className="App__title">Battleship🛥</div>
      <div className="text--order">{order}</div>
      {gameEnded ? (
        <div className="text--winning">
          {playerHasWon ? 'Player' : 'Computer'} has won!
        </div>
      ) : null}
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
