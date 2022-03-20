import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import { ColorsContext } from "./ColorsContext";
import Palette from "./Palette";
import { bottomDistance, rightDistance } from "../utils/stylerDistance";
import {
  topOffset,
  leftOffset,
  pointerVerticalPosition,
  pointerHorizontalPosition,
  pointerClass,
} from "../utils/stylerPosition";

const SquareStyler = ({
  id,
  squareType,
  squareWidth,
  sashingCrossed,
  sashingRatioIsOne,
  squStylerIsOpen,
}) => {
  // global states
  const {
    editSquare,
    borders,
    sashingHeights,
    sashingWidths,
    borderBaseWidth,
  } = useContext(SquaresContext);
  const { closeSquStyler, openBigBlockStyler } = useContext(StylersContext);
  const { paletteColors } = useContext(ColorsContext);

  // local states
  const [newSquareType, setNewSquareType] = useState(squareType);
  const [stylerBottomDistance, setStylerBottomDistance] = useState(null);
  const [stylerRightDistance, setStylerRightDistance] = useState(null);

  // measurements height
  const stylerFullSquHeight = 299; // measured w/o colour bar
  const stylerHstsHeight = 328; // measured w/o colour bars
  let paletteRows = Math.ceil(paletteColors.length / 5);

  let stylerHeight1 = newSquareType === "rect" ? stylerFullSquHeight : null;
  let stylerHeight2 =
    newSquareType === "hstUp" || newSquareType === "hstDown"
      ? stylerHstsHeight
      : null;

  // measurements width
  const stylerWidth = 209;

  const setDistanceValues = () => {
    let stylBottomDistance = bottomDistance(
      id,
      stylerHeight1,
      stylerHeight2,
      null,
      squareWidth,
      paletteRows,
      null,
      null,
      sashingHeights,
      borders,
      borderBaseWidth
    );
    setStylerBottomDistance(stylBottomDistance);

    let stylRightDistance = rightDistance(
      id,
      stylerWidth,
      squareWidth,
      sashingWidths,
      null,
      borders,
      borderBaseWidth
    );
    setStylerRightDistance(stylRightDistance);
  };

  const selectSquareType = (event) => {
    event.stopPropagation();
    setNewSquareType(event.target.value);
  };

  const closeSquareStyler = (event) => {
    event.stopPropagation();
    closeSquStyler();
  };

  useEffect(() => {
    setDistanceValues();
  }, []);

  useEffect(() => {
    if (newSquareType === "bigBlockAnchor") {
      closeSquStyler();
      openBigBlockStyler(id);
    } else {
      editSquare({
        id: id,
        propertyKey: "squareType",
        propertyValue: newSquareType,
      });
    }
    if (stylerBottomDistance !== null && stylerRightDistance !== null) {
      setDistanceValues();
    }
  }, [newSquareType]);

  return (
    <>
      <div
        className={`styling-dropdown squares popup ${
          squStylerIsOpen === true ? "active" : ""
        }
        `}
        style={{
          top: `32px`,
          left: `32px`,
          transform: `translate(${leftOffset(
            stylerRightDistance,
            stylerWidth,
            null,
            null
          )}px, ${topOffset(stylerBottomDistance)}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="card ">
          <button
            className="btn btn-clear"
            aria-label="Close"
            onClick={closeSquareStyler}
          ></button>

          <div className="card-body">
            <div className="card-title h6">Square Type</div>
            <div className="form-group">
              {sashingCrossed === false ? (
                <>
                  <label className="form-radio rect">
                    <input
                      className="square-type"
                      type="radio"
                      name="squareType"
                      value="rect"
                      checked={newSquareType === "rect"}
                      onChange={selectSquareType}
                    />
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
                      onChange={selectSquareType}
                    />
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
                      onChange={selectSquareType}
                    />
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
                      onChange={selectSquareType}
                    />
                    <i className="form-icon"></i>
                    <span>Big Block Anchor</span>
                  </label>
                </>
              ) : sashingCrossed === true && sashingRatioIsOne === true ? (
                <>
                  <label className="form-radio rect">
                    <input
                      className="square-type"
                      type="radio"
                      name="squareType"
                      value="rectSashing"
                      checked={newSquareType === "rectSashing"}
                      onChange={selectSquareType}
                    />
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
                      onChange={selectSquareType}
                    />
                    <i className="form-icon"></i>
                    <span>Big Block Anchor</span>
                  </label>
                </>
              ) : sashingCrossed === true && sashingRatioIsOne === false ? (
                <>
                  <label className="form-radio rect">
                    <input
                      className="square-type"
                      type="radio"
                      name="squareType"
                      value="rectSashing"
                      checked={newSquareType === "rectSashing"}
                      onChange={selectSquareType}
                    />
                    <i className="form-icon"></i>
                    <span>Sashing Cross</span>
                  </label>
                  <label className="form-radio hst-bigblock">
                    <input
                      className="square-type"
                      type="radio"
                      name="squareType"
                      disabled="bigBlockAnchor"
                    />
                    <i className="form-icon"></i>
                    <span className="disabled">Big Block Anchor</span>
                  </label>
                  <div className="explanation">
                    Width and height of sashing cross must be equal!
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <Palette squareId={id} paletteType={newSquareType} />
          </div>
        </div>
        <span
          className={`pointer ${pointerClass(
            stylerBottomDistance,
            stylerRightDistance,
            stylerWidth
          )}`}
          style={{
            top: `${pointerVerticalPosition(stylerBottomDistance)}px`,
            left: `${pointerHorizontalPosition(
              stylerRightDistance,
              stylerWidth
            )}px`,
          }}
        ></span>
      </div>
    </>
  );
};

export default SquareStyler;
