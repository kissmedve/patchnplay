import React, { useContext, useState } from "react";
import { StylersContext } from "./StylersContext";
import { SquaresContext } from "./SquaresContext";
import Palette from './Palette';

const SashingRowStyler = ({ rowCol, id }) => {

  // global states
  const { closeSashStyler } = useContext(StylersContext);
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
      for (let k = 0; k < squarez[0].length; k++) {
        // mark squares also belonging to sashing columns as sashing cross
        if (squarez[i][k].row === id && squarez[i][k].sashing === true) {
          squarez[i][k].sashingCrossed = true;
        }
        // mark all squares of the sashing row
        if (squarez[i][k].row === id) {
          squarez[i][k].sashing = true;
        }
      }
    }
    updateSashingRows(onSashingRows);
    updateSquares(squarez);
  }

  const switchToSquares = () => {
    let offSashingRows = sashingRows.map((sashRow, index) => index === id ? sashRow = false : sashRow = true);

    let offSashingHeights = sashingHeights.map((sashHeight, index) => index === id ? sashHeight = 1 : sashHeight);

    let squarezz = squares;
    for (let i = 0; i < squarezz.length; i++) {
      for (let k = 0; k < cols.length; k++) {
        // unmark all squares of the sashing row,
        // sashing height back to normal
        if (squarezz[i][k].row === id) {
          squarezz[i][k].sashing = false;
          squarezz[i][k].sashingHeight = 1;
        }
        // square that was sashing cross still remains sashing
        if (squarezz[i][k].row === id && squarezz[i][k].sashingCrossed === true) {
          squarezz[i][k].sashing = true;
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
      <div className="styling-dropdown sashing popup active">

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