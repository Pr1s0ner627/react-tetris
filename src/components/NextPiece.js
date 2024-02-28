import React from 'react';

const NextPiece = ({ nextPiece }) => {

    if(!nextPiece)
        return null;

  return (
    <div>
      <h2>Next Piece:</h2>
      {/* Render the next piece here */}
      <div className="next-piece">
        {nextPiece.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
