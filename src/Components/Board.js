import React from 'react';

import './Board.css';

function Board(props) {
  return (
    <div className="Board" data-testid="board">
      <div className="Board__title" data-testid="title">
        <span className="title__text">{props.playerName}</span>
      </div>
      <div className="squares">
        {props.board?.squares.map((row, y) => {
          return row.map((square, x) => {
            return (
              <div
                className={`square ${square.hit ? 'square--hit' : ''} 
                  ${square.shipIndex !== null ? 'ship' : ''}
                  `}
                data-testid="square"
                key={`${x},${y}`}
                onClick={
                  props.handlers
                    ? () => {
                        props.handlers({ x, y });
                      }
                    : null
                }
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
