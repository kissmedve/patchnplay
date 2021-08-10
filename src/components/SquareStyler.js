import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Palette from './Palette';

const SquareStyler = ({ id, squareType }) => {

  // global states
  const { editSquare } = useContext(SquaresContext);
  const { closeSquStyler, openBigBlockStyler, bigBlockStylerIsOpen } = useContext(StylersContext);

  // local states
  const [newSquareType, setNewSquareType] = useState(squareType);

  const selectSquareType = (event) => {
    setNewSquareType(event.target.value);
  }

  const showBigBlockForm = (event) => {
    event.stopPropagation();
    closeSquStyler();
    openBigBlockStyler(id);
  }

  const closeSquareStyler = (event) => {
    event.stopPropagation();
    closeSquStyler();
  }

  useEffect(() => {
    editSquare({
      id: id,
      propertyKey: 'squareType',
      propertyValue: newSquareType
    });
  }, [newSquareType]);

  return (
    <>
      <div className="styling-dropdown squares popup active" >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeSquareStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Square Type</div>
            <div className="form-group">

              <label className="form-radio rect">
                <input
                  className="square-type"
                  type="radio"
                  name="squareType"
                  value="rect"
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
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Down</span>
              </label>
            </div>
          </div>
          <Palette squareId={id} paletteType={newSquareType} />
          <div className="card-footer">
            <div className="form-title h6">
              Big Block
            </div>
            <button
              className="btn bigblock-insert"
              onClick={showBigBlockForm}
            >
              Insert Big Block
              </button>
          </div>
        </div>

      </div>
    </>

  )
}

export default SquareStyler;