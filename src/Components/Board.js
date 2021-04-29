import React from 'react';

import './Board.css';

function Board(props) {
  return (
    <div className="Board">
      <div className="Board__title" data-testid="title">
        {props.playerName}
      </div>
      <div className="squares">
        {props.board?.squares.map((row, y) => {
          return row.map((square, x) => {
            return (
              <div
                className={`square ${square.hit && 'square--hit'}`}
                data-testid="square"
                key={`${x},${y}`}
                onClick={() => {
                  props.handlers({ x, y });
                }}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
