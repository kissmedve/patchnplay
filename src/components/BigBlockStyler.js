import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Palette from './Palette';

const BigBlockStyler = ({ id, squareType }) => {

  // global states
  //const { editSquare } = useContext(SquaresContext);
  const { closeBigBlockStyler, closeSquStyler } = useContext(StylersContext);

  // local states
  const [bigBlockCols, setBigBlockCols] = useState(1);
  const [bigBlockRows, setBigBlockRows] = useState(1);

  // useEffect(() => {
  //   editSquare({
  //     id: id,
  //     propertyKey: 'squareType',
  //     propertyValue: newSquareType
  //   });
  // }, [newSquareType]);

  const handleBigBlockInputCols = (event) => {
    event.stopPropagation();
    setBigBlockCols(event.target.value);
  }

  const handleBigBlockInputRows = (event) => {
    event.stopPropagation();
    setBigBlockRows(event.target.value);
  }

  const applyBigBlockSizes = () => {

  }

  return (
    <>
      <div className="styling-dropdown popup active" >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeBigBlockStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Insert Big Block</div>
            <div className="explanation">(including this square, spanning x columns to the right and y rows down)</div>
            <div className="form-group bigblock-sizes">
              <label className="form-number bigblock-width">
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="bigBlockCols"
                  value={bigBlockCols}
                  onChange={handleBigBlockInputCols}
                />
                Width in columns
              </label>
              <label className="form-number bigblock-height">
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="bigBlockRows"
                  value={bigBlockRows}
                  onChange={handleBigBlockInputRows}
                />
                Height in rows
              </label>
              <button
                className="btn btn-apply"
                onClick={applyBigBlockSizes}
              >Apply</button>
            </div>
          </div>

          {/* <BigBlockPreChoice /> */}
          {/* <Palette squareId={id} paletteType={'bigBlock'} /> */}
        </div>
      </div>
    </>

  )
}

export default BigBlockStyler;