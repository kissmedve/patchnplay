import React, { useContext } from 'react';
import { StylersContext } from "./StylersContext";
import SquareStyler from "./SquareStyler";
import BigBlockStyler from "./BigBlockStyler";

const Square = ({ id, row, col, squareType, fillSquare, fillHstLdown, fillHstRdown, fillHstLup, fillHstRup, fillSashing, covered, bigBlockAnchor, coveredByBigBlock, sashing, sashingCrossed, sashingWidth, sashingHeight, squareWidth }) => {

  // global states
  const { openSquStyler, squStylerIsOpen, sashStylerIsOpen, activeSquStyler, bigBlockStylerIsOpen, activeBigBlockStyler } = useContext(StylersContext);

  const openSquareStyler = (event) => {
    event.stopPropagation();
    if ((sashing === false || (sashing === true && sashingCrossed === true)) && covered === false && bigBlockStylerIsOpen === false) {
      openSquStyler(id);
    }
  }

  return (
    <>
      <div className={`square ${squareType.toLowerCase()} ${covered === true ? 'covered' : 'not-covered'} ${sashing === true ? 'sashing' : ''} ${sashingCrossed === true ? 'sashing-crossed' : ''} `} style={{ width: sashingWidth > 1 ? sashingWidth * squareWidth + `px` : ``, height: sashingHeight > 1 ? sashingHeight * squareWidth + `px` : '' }} key={id} onClick={openSquareStyler}>
        <svg
          viewBox={'0 0 50 50'} width="100%" height="100%" preserveAspectRatio="none" >
          <rect className="sashing" x="0" y="0"
            width="50" height="50" fill={fillSashing}
            stroke="ddd" />
          <rect className="rect" x="0" y="0"
            width="50" height="50" fill={fillSquare}
            stroke="ddd" />
          <polygon className="hstdown ldown" points="0,0 50,50 0,50" fill={fillHstLdown} stroke="#ddd" />
          <polygon className="hstdown rdown" points="0,0 50,0 50,50" fill={fillHstRdown} stroke="#ddd" />
          <polygon className="hstup lup" points="0,50 0,0 50,0" fill={fillHstLup} stroke="#ddd" />
          <polygon className="hstup rup" points="0,50 50,0 50,50" fill={fillHstRup} stroke="#ddd" />
        </svg>
        {squStylerIsOpen === true && sashStylerIsOpen === false && bigBlockStylerIsOpen === false && activeSquStyler === id ?
          <SquareStyler
            id={id} key={id} squareType={squareType} squareWidth={squareWidth} />
          : null}
        {bigBlockStylerIsOpen === true && sashStylerIsOpen === false && squStylerIsOpen === false && activeBigBlockStyler === id ?
          <BigBlockStyler
            id={id} key={id} squareType={'bigBlock'} squareWidth={squareWidth} />
          : null}
      </div>
    </>
  )

}

export default Square;