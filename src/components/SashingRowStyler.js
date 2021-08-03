import React, { useContext, useState } from "react";
import { StylersContext } from "./StylersContext";
import { SquaresContext } from "./SquaresContext";
import Palette from './Palette';

const SashingRowStyler = ({ rowCol, id }) => {

  // global states
  const { sashStylerIsOpen, closeSashStyler, activeSashStyler } = useContext(StylersContext);
  const { cols, squares, sashingRows, updateSashingRows, updateSquares, sashingHeights, updateSashingHeights } = useContext(SquaresContext);

  // local states
  const [inputSashingHeight, setInputSashingHeight] = useState(1);

  const handleInputHeight = (event) => {
    setInputSashingHeight(Number(event.target.value));
  }

  const switchToSashing = (event) => {
    let onSashingRows = sashingRows.map((sashRow, index) => index === id ? sashRow = true : sashRow = false);

    let squarez = squares;
    for (let i = 0; i < squarez.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        // mark all squares of the sashing row
        if (squarez[i][k].row === id) {
          squarez[i][k].sashing = true;
        }
        // square is sashing cross, if squares above or below are part of sashing col
        if ((squarez[i][k].row === id && (squarez[i - 1][k] && squarez[i - 1][k].sashing === true)) || (squarez[i + 1][k] && squarez[i + 1][k].sashing === true)) {
          squarez[i][k].sashingCrossed = true;
        }
      }
    }
    updateSashingRows(onSashingRows);
    updateSquares(squarez);
  }

  const switchToSquares = () => {
    let offSashingRows = sashingRows.map((sashRow, index) => index === id ? sashRow = false : sashRow = true);

    let offSashingHeights = sashingHeights.map((sashHeight, index) => index === id ? sashHeight = 1 : null);

    let squarezz = squares;
    for (let i = 0; i < squarezz.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        // unmark all squares of the sashing row,
        // sashing height back to normal
        if (squarezz[i][k].row === id) {
          squarezz[i][k].sashing = false;
          squarezz[i][k].sashingWidth = 1;
        }
        // with squares above and/or below being sashing, the square is part of sashing column
        if ((squarezz[i][k].row === id && (squarezz[i - 1][k] && squarezz[i - 1][k].sashing === true)) || (squarezz[i + 1][k] && squarezz[i + 1][k].sashing === true)) {
          squarezz[i][k].sashing = true;
          // without sashing row no more sashing cross
          squarezz[i][k].sashingCrossed = false;
        }
      }
    }
    updateSashingRows(offSashingRows);
    updateSashingHeights(offSashingHeights);
    updateSquares(squarezz);

  }

  const applySashingHeight = (event) => {
    let onSashingHeights = sashingHeights.map((sashHeight, index) => index === id ? sashHeight = inputSashingHeight : sashHeight);

    let sashSquares = squares;
    for (let i = 0; i < sashSquares.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        if (sashSquares[i][k].row === id) {
          sashSquares[i][k].sashingHeight = inputSashingHeight;
        }
      }
    }

    updateSashingHeights(onSashingHeights);
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
            {sashingRows[id] === false ?
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
              Height
            </div>
            <div className="explanation">(square units)</div>
            <div className="form-group sashing-number">
              <input
                type="number"
                min="1"
                step="0.5"
                name="sashingHeight"
                value={inputSashingHeight}
                onChange={handleInputHeight}
                disabled={sashingRows[id] === false ? true : false}
              />
              <button
                className="btn btn-apply"
                onClick={applySashingHeight}
              >Apply</button>
            </div>

          </div>
        </div>
        {/* <Palette paletteType={sashColumn} /> */}
      </div>

    </>
  )

}

export default SashingRowStyler;