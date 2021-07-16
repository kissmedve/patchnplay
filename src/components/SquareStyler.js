import React, { useState } from "react";
import Palette from './Palette';

const SquareStyler = () => {

  // local states
  const [squareType, setSquareType] = useState('');

  const selectSquareType = (event) => {
    setSquareType(event.target.value);
  }

  return (
    <>
      <div className="styling-dropdown popup">

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" ></button>

          {/* <div className="card-header">

            
          </div> */}
          <div className="card-body">
            <div className="card-title h6">Square Type</div>
            <div className="form-group">

              <label htmlFor="rect" className="form-radio rect">
                <input
                  type="radio"
                  id="rect"
                  name="squareType"
                  value="rect"
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>Full Square</span>
              </label>
              <label htmlFor="hst-up" className="form-radio hst-up">
                <input
                  type="radio"
                  id="hst-up"
                  name="squareType"
                  value="hstUp"
                  onChange={selectSquareType} />
                <i className="form-icon"></i>
                <span>HST Up</span>
              </label>
              <label htmlFor="hst-down" className="form-radio hst-down">
                <input
                  type="radio"
                  id="hst-down"
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