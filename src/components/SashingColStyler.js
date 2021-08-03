import React, { useContext, useState } from "react";
import { StylersContext } from "./StylersContext";
import { SquaresContext } from "./SquaresContext";
import Palette from './Palette';

const SashingColStyler = ({ rowCol, id }) => {

  // global states
  const { sashStylerIsOpen, closeSashStyler, activeSashStyler } = useContext(StylersContext);
  const { cols, squares, sashingCols, updateSashingCols, updateSquares, sashingWidths, updateSashingWidths } = useContext(SquaresContext);

  // local states
  const [inputSashingWidth, setInputSashingWidth] = useState(1);

  const handleInputWidth = (event) => {
    setInputSashingWidth(Number(event.target.value));
  }

  const switchToSashing = (event) => {
    let onSashingCols = sashingCols.map((sashCol, index) => index === id ? sashCol = true : sashCol = false);

    let squarez = squares;
    for (let i = 0; i < squarez.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        // mark all squares of the sashing column
        if (squarez[i][k].col === id) {
          squarez[i][k].sashing = true;
        }
        // square is sashing cross, if left and/or right squares are part of sashing row
        if ((squarez[i][k].col === id && (squarez[i][k - 1] && squarez[i][k - 1].sashing === true)) || (squarez[i][k + 1] && squarez[i][k + 1].sashing === true)) {
          squarez[i][k].sashingCrossed = true;
        }
      }
    }
    updateSashingCols(onSashingCols);
    updateSquares(squarez);
  }

  const switchToSquares = () => {
    let offSashingCols = sashingCols.map((sashCol, index) => index === id ? sashCol = false : sashCol = true);

    let offSashingWidths = sashingWidths.map((sashWidth, index) => index === id ? sashWidth = 1 : null);

    let squarezz = squares;
    for (let i = 0; i < squarezz.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        // unmark all squares of the sashing column,
        // sashing width back to normal
        if (squarezz[i][k].col === id) {
          squarezz[i][k].sashing = false;
          squarezz[i][k].sashingWidth = 1;
        }
        // with squares left and/or right being sashing, the square is part of sashing row
        if ((squarezz[i][k].col === id && (squarezz[i][k - 1] && squarezz[i][k - 1].sashing === true)) || (squarezz[i][k + 1] && squarezz[i][k + 1].sashing === true)) {
          squarezz[i][k].sashing = true;
          // without sashing column no more sashing cross
          squarezz[i][k].sashingCrossed = false;
        }
      }
    }
    updateSashingCols(offSashingCols);
    updateSashingWidths(offSashingWidths);
    updateSquares(squarezz);

  }

  const applySashingWidth = (event) => {
    let onSashingWidths = sashingWidths.map((sashWidth, index) => index === id ? sashWidth = inputSashingWidth : sashWidth);

    let sashSquares = squares;
    for (let i = 0; i < sashSquares.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        if (sashSquares[i][k].col === id) {
          sashSquares[i][k].sashingWidth = inputSashingWidth;
        }
      }
    }

    updateSashingWidths(onSashingWidths);
    updateSquares(sashSquares);
  }

  return (
    <>
      <div className={`styling-dropdown sashing popup ${sashStylerIsOpen === true && activeSashStyler.rowCol === rowCol && activeSashStyler.id === id ? "active" : ""}`}>

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeSashStyler} ></button>

          <div className="card-body">
            <div className="form-title h6">
              Sashing
            </div>
            {sashingCols[id] === false ?
              <button
                className="btn sashing-switch"
                onClick={switchToSashing}
              >
                Switch to Sashing
              </button> :
              <button
                className="btn sashing-switch"
                onClick={switchToSquares}
              >
                Switch to Squares
              </button>
            }

            <div className="form-title h6">
              Width
            </div>
            <div className="explanation">(square units)</div>
            <div className="form-group sashing-number">
              <input
                type="number"
                min="1"
                step="0.5"
                name="sashingWidth"
                value={inputSashingWidth}
                onChange={handleInputWidth}
                disabled={sashingCols[id] === false ? true : false}
              />
              <button
                className="btn btn-apply"
                onClick={applySashingWidth}
              >Apply</button>
            </div>

          </div>
        </div>
        {/* <Palette paletteType={sashColumn} /> */}
      </div>

    </>
  )

}

export default SashingColStyler;