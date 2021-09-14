import React from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";

const CalcStyler = () => {

  // global states
  const { squareWidth, squares } = useContext(SquaresContext);
  const { closeCalcStyler } = useContext(StylersContext);

  return (
    <>
      <div className="styling-dropdown border popup active" style={{ left: (squareWidth - 18) + `px`, top: (squareWidth - 18) + `px` }} >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeCalcStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Fabric Widths</div>

            <div className="form-group fabric-widths">


            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default CalcStyler;