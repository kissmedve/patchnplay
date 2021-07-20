import React, { useState } from 'react';
import SquareStyler from "./SquareStyler";

const Square = ({ id }) => {

  // local states
  const [squStylerIsOpen, setSquStylerIsOpen] = useState(false);

  const closeSquStyler = (event) => {
    event.stopPropagation();
    setSquStylerIsOpen(false);
  }

  return (
    <>
      <div className="square" key={id} id={`id-${id}`} onClick={() => setSquStylerIsOpen(true)}>
        <svg
          viewBox={'0 0 50 50'}
          preserveAspectRatio="none">
          <rect className="rect" x="0" y="0"
            width="50" height="50" fill="red"
            stroke="ddd" />
          <polygon className="hstdown ldown" points="0,0 50,50 0,50" fill="blue" stroke="#ddd" />
          <polygon className="hstdown rdown" points="0,0 50,0 50,50" fill="yellow" stroke="#ddd" />
          <polygon className="hstup lup" points="0,50 0,0 50,0" fill="green" stroke="#ddd" />
          <polygon className="hstup rup" points="0,50 50,0 50,50" fill="turquoise" stroke="#ddd" />
        </svg>
        <SquareStyler
          squStylerIsOpen={squStylerIsOpen}
          closeSquStyler={closeSquStyler}
          squareId={id} />
      </div>
    </>
  )

}

export default Square;