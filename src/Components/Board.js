import React from 'react';

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
                className="square"
                data-testid="square"
                key={`${x},${y}`}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Board;
