import React from "react";

const SquareStyler = () => {
  return (
    <>
      <div className="styling-dropdown popup">

        <div className="card ">

          <a className="btn btn-clear" aria-label="Close" role="button"></a>

          <div className="card-header">

            <div className="card-title h6">Square Type</div>
          </div>
          <div className="card-body">
            <div className="form-group">

              <label htmlFor="rect" className="form-radio rect">
                <input
                  type="radio"
                  id="rect"
                  name="squareType"
                  value="rect" />
                <i className="form-icon"></i>
                <span>Full Square</span>
              </label>
              <label htmlFor="hst-up" className="form-radio hst-up">
                <input
                  type="radio"
                  id="hst-up"
                  name="squareType"
                  value="hstUp" />
                <i className="form-icon"></i>
                <span>HST Up</span>
              </label>
              <label htmlFor="hst-down" className="form-radio hst-down">
                <input
                  type="radio"
                  id="hst-down"
                  name="squareType"
                  value="hstDown" />
                <i className="form-icon"></i>
                <span>HST Down</span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default SquareStyler;