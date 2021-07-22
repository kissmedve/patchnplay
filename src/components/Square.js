import React, { useState, useContext } from 'react';
import { StylersContext } from "./StylersContext";
import SquareStyler from "./SquareStyler";

const Square = ({ id, row, col, squareType, fillSquare, fillHstLdown, fillHstRdown, fillHstLup, fillHstRup, covered, sashing, sashingCrossed }) => {

  // global states
  const { squStylerIsOpen, activeSquStyler, openSquStyler } = useContext(StylersContext);

  const openSquareStyler = (event) => {
    event.stopPropagation();
    openSquStyler(id);
  }

  return (
    <>
      <div className={`square ${squareType.toLowerCase()} ${covered === true ? 'covered' : 'not-covered'} ${sashing === true ? 'sashing' : ''} ${sashingCrossed === true ? 'sashing-crossed' : ''}`} onClick={openSquareStyler}>
        <svg
          viewBox={'0 0 50 50'} >
          <rect className="rect" x="0" y="0"
            width="50" height="50" fill={fillSquare}
            stroke="ddd" />
          <polygon className="hstdown ldown" points="0,0 50,50 0,50" fill={fillHstLdown} stroke="#ddd" />
          <polygon className="hstdown rdown" points="0,0 50,0 50,50" fill={fillHstRdown} stroke="#ddd" />
          <polygon className="hstup lup" points="0,50 0,0 50,0" fill={fillHstLup} stroke="#ddd" />
          <polygon className="hstup rup" points="0,50 50,0 50,50" fill={fillHstRup} stroke="#ddd" />
        </svg>
        <SquareStyler
          id={id} />
      </div>
    </>
  )

}

export default Square;