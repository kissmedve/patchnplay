import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Palette from './Palette';

const SquareStyler = ({ id }) => {

  console.log('squarestyler id:', id);
  // global states
  const { editSquare } = useContext(SquaresContext);
  const { squStylerIsOpen, activeSquStyler, closeSquStyler } = useContext(StylersContext);

  // local states
  const [squareType, setSquareType] = useState('');

  const selectSquareType = (event) => {
    setSquareType(event.target.value);
  }

  const closeSquareStyler = (event) => {
    event.stopPropagation();
    closeSquStyler();
  }

  useEffect(() => {
    if (squStylerIsOpen === true && activeSquStyler === id) {
      editSquare({
        id: id,
        propertyKey: 'squareType',
        propertyValue: squareType
      });
    }
  }, [squareType]);

  return (
    <>
      <div className={`styling-dropdown popup ${squStylerIsOpen === true && activeSquStyler === id ? "active" : ""}`}>

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeSquareStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Square Type</div>
            <div className="form-group">

              <label className="form-radio rect">
                <input
                  type="radio"
                  name="squareType"
                  value="rect"
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>Full Square</span>
              </label>
              <label className="form-radio hst-up">
                <input
                  type="radio"
                  name="squareType"
                  value="hstUp"
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Up</span>
              </label>
              <label className="form-radio hst-down">
                <input
                  type="radio"
                  name="squareType"
                  value="hstDown"
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Down</span>
              </label>
            </div>
          </div>
          <Palette squareId={id} paletteType={squareType} />
        </div>

      </div>
    </>
  )
}

export default SquareStyler;