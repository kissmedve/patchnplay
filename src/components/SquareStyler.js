import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Palette from './Palette';

const SquareStyler = ({ id, squareType, squareWidth, sashingCrossed, sashingRatioIsOne }) => {

  // global states
  const { editSquare } = useContext(SquaresContext);
  const { closeSquStyler, openBigBlockStyler } = useContext(StylersContext);

  // local states
  const [newSquareType, setNewSquareType] = useState(squareType);

  const selectSquareType = (event) => {
    event.stopPropagation();
    setNewSquareType(event.target.value);
  }

  const closeSquareStyler = (event) => {
    event.stopPropagation();
    closeSquStyler();
  }

  useEffect(() => {
    if (newSquareType === 'bigBlockAnchor') {
      closeSquStyler();
      openBigBlockStyler(id);
    } else {
      editSquare({
        id: id,
        propertyKey: 'squareType',
        propertyValue: newSquareType
      });
    }
  }, [newSquareType]);

  return (
    <>
      <div className="styling-dropdown squares popup active" style={{ left: (squareWidth - 18) + `px`, top: (squareWidth - 18) + `px` }} >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeSquareStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Square Type</div>
            <div className="form-group">

                {sashingCrossed === false ?
<>
                  <label className="form-radio rect">
                  <input
                    className="square-type"
                    type="radio"
                    name="squareType"
                    value="rect"
                    checked={newSquareType === "rect"}
                    onChange={selectSquareType} />
                  <i className="form-icon"></i>
                  <span>Full Square</span>
                </label>

                <label className="form-radio hst-up">
                <input
                  className="square-type"
                  type="radio"
                  name="squareType"
                  value="hstUp"
                  checked={newSquareType === "hstUp"}
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Up</span>
                </label>

                <label className="form-radio hst-down">
                <input
                  className="square-type"
                  type="radio"
                  name="squareType"
                  value="hstDown"
                  checked={newSquareType === "hstDown"}
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Down</span>
                </label>

                <label className="form-radio hst-bigblock">
                    <input
                      className="square-type"
                      type="radio"
                      name="squareType"
                      value="bigBlockAnchor"
                      checked={newSquareType === "bigBlockAnchor"}
                      onChange={selectSquareType} />
                    <i className="form-icon"></i>
                    <span>Big Block Anchor</span>
                  </label>
                </>
                :

                (sashingCrossed === true && sashingRatioIsOne === true ) ?

                <>
                  <label className="form-radio rect">
                  <input
                    className="square-type"
                    type="radio"
                    name="squareType"
                    value="rectSashing"
                    checked={newSquareType === "rectSashing"}
                    onChange={selectSquareType} />
                  <i className="form-icon"></i>
                  <span>Full Square</span>
                </label>
                <label className="form-radio hst-bigblock">
                  <input
                    className="square-type"
                    type="radio"
                    name="squareType"
                    value="bigBlockAnchor"
                    checked={newSquareType === "bigBlockAnchor"}
                    onChange={selectSquareType} />
                  <i className="form-icon"></i>
                  <span>Big Block Anchor</span>
                </label>
                </>
                :
                sashingCrossed === true && sashingRatioIsOne === false ?
                <>
                <label className="form-radio rect">
                <input
                  className="square-type"
                  type="radio"
                  name="squareType"
                  value="rectSashing"
                  checked={newSquareType === "rectSashing"}
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>Sashing Cross</span>
              </label>
              <label className="form-radio hst-bigblock">
                <input
                  className="square-type"
                  type="radio"
                  name="squareType"
                  disabled="bigBlockAnchor" />
                <i className="form-icon"></i>
                <span className="disabled">Big Block Anchor</span>
              </label>
              <div className="explanation">Width and height of sashing cross must be equal!</div>
                </>
                : ''
              }
            </div>
            <Palette squareId={id} paletteType={newSquareType} />
          </div>
        </div>

      </div>
    </>

  )
}

export default SquareStyler;