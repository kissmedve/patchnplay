import React from 'react';

const Square = () => {

  return (
    <>
      <div className="square">
        <div className="show-styler">
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

        </div>

      </div>
    </>
  )

}

export default Square;