import React, { useState } from "react";
import Palette from './Palette';

const SquareStyler = ({ squStylerIsOpen, closeSquStyler, squareId }) => {
  console.log(squareId);

  // local states
  const [squareType, setSquareType] = useState('');

  const selectSquareType = (event) => {
    setSquareType(event.target.value);
  }

  return (
    <>
      <div className={`styling-dropdown popup ${squStylerIsOpen === true ? "active" : ""}`}>

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeSquStyler} ></button>

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
          <Palette paletteType={squareType} />
        </div>

      </div>
    </>
  )
}

export default SquareStyler;