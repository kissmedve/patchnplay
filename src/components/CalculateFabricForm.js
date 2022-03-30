import React, { useContext, useState, useEffect } from "react";
import { FabricsContext } from "./FabricsContext";
import CalculateFabrics from "./CalculateFabrics";

const CalculateFabricForm = () => {
  // global states
  const {
    fabricWidths,
    fabricSquareWidth,
    seamAllowance,
    editFabricWidth,
    calcFabricModalIsOpen,
    updateFabricSquareWidth,
    updateSeamAllowance,
  } = useContext(FabricsContext);

  // local states
  const [isCalculateFabricsActive, setIsCalculateFabricsActive] =
    useState(false);

  // close down calculate function when calculate modal closes
  useEffect(() => {
    if (isCalculateFabricsActive === true && calcFabricModalIsOpen === false) {
      setIsCalculateFabricsActive(false);
    }
  }, [calcFabricModalIsOpen, isCalculateFabricsActive]);

  useEffect(() => {
    setIsCalculateFabricsActive(false);
  }, [fabricWidths, fabricSquareWidth, seamAllowance]);

  const selectFabricWidth = (color, width) => {
    editFabricWidth({
      color: color,
      fabricWidth: width,
    });
  };

  const selectFabricSquareWidth = (event) => {
    updateFabricSquareWidth(event.target.value);
  };

  const selectSeamAllowance = (event) => {
    updateSeamAllowance(event.target.value);
  };

  const calculateFabrics = () => {
    setIsCalculateFabricsActive(true);
  };

  return (
    <>
      <div className="card calculate-fabrics fabrics-form">
        <div className="card-header">
          <div className="card-title h5">Settings</div>
        </div>
        <div className="card-body">
          <div className="form-table">
            <div className="card-title h6">Fabric Width</div>
            <div className="form-header">
              <div className="row-header">
                <div className="colorname">Color</div>
                <div className="colorbg"></div>
              </div>
              <div className="row-body">
                <div className="col">55 cm / 22"</div>
                <div className="col">90 cm / 35"</div>
                <div className="col">110 cm / 44"</div>
                <div className="col">140 cm / 55"</div>
              </div>
            </div>

            {fabricWidths.map((fabrWidth) => {
              return (
                <div className="form-row">
                  <div className="row-header">
                    <div key={fabrWidth.color} className="col colorname">
                      {fabrWidth.color}
                    </div>
                    <div
                      className="col colorbg"
                      style={{ background: `${fabrWidth.color}` }}
                    ></div>
                  </div>

                  <label className="form-radio fabric-width col">
                    <input
                      className="fabric-width"
                      type="radio"
                      name={fabrWidth.color}
                      value="55"
                      checked={fabrWidth.fabricWidth === "55" ? true : false}
                      onChange={(event) =>
                        selectFabricWidth(fabrWidth.color, event.target.value)
                      }
                    />
                    <i className="form-icon"></i>
                    <span>55 cm / 22"</span>
                  </label>

                  <label className="form-radio fabric-width col">
                    <input
                      className="fabric-width"
                      type="radio"
                      name={fabrWidth.color}
                      value="90"
                      checked={fabrWidth.fabricWidth === "90" ? true : false}
                      onChange={(event) =>
                        selectFabricWidth(fabrWidth.color, event.target.value)
                      }
                    />
                    <i className="form-icon"></i>
                    <span>90 cm / 35"</span>
                  </label>

                  <label className="form-radio fabric-width col">
                    <input
                      className="fabric-width"
                      type="radio"
                      name={fabrWidth.color}
                      value="110"
                      checked={fabrWidth.fabricWidth === "110" ? true : false}
                      onChange={(event) =>
                        selectFabricWidth(fabrWidth.color, event.target.value)
                      }
                    />
                    <i className="form-icon"></i>
                    <span>110 cm / 44"</span>
                  </label>

                  <div className="form-group row-body">
                    <label className="form-radio fabric-width col">
                      <input
                        className="fabric-width"
                        type="radio"
                        name={fabrWidth.color}
                        value="140"
                        checked={fabrWidth.fabricWidth === "140" ? true : false}
                        onChange={(event) =>
                          selectFabricWidth(fabrWidth.color, event.target.value)
                        }
                      />
                      <i className="form-icon"></i>
                      <span>140 cm / 55"</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="columns">
            <div className="column col-6">
              <div className="card-title h6">Square Size</div>

              <div className="form-group">
                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="3.81"
                    checked={fabricSquareWidth === "3.81" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>3.81 cm / 1.5"</span>
                </label>

                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="5.08"
                    checked={fabricSquareWidth === "5.08" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>5.08 cm / 2"</span>
                </label>

                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="6.35"
                    checked={fabricSquareWidth === "6.35" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>6.35 cm / 2.5"</span>
                </label>

                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="8.89"
                    checked={fabricSquareWidth === "8.89" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>8.89 cm / 3.5"</span>
                </label>

                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="11.43"
                    checked={fabricSquareWidth === "11.43" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>11.43 cm / 4.5"</span>
                </label>

                <label className="form-radio square-size">
                  <input
                    className="square-size"
                    type="radio"
                    name="fabricSquareWidth"
                    value="12.7"
                    checked={fabricSquareWidth === "12.7" ? true : false}
                    onChange={selectFabricSquareWidth}
                  />
                  <i className="form-icon"></i>
                  <span>12.7 cm / 5"</span>
                </label>
              </div>
            </div>
            <div className="column col-6">
              <div className="card-title h6">Seam Allowance</div>

              <div className="form-group">
                <label className="form-radio seam-allowance">
                  <input
                    className="seam-allowance"
                    type="radio"
                    name="seamAllowance"
                    value="0.7"
                    checked={seamAllowance === "0.7" ? true : false}
                    onChange={selectSeamAllowance}
                  />
                  <i className="form-icon"></i>
                  <span>0.7 cm / 0.25"</span>
                </label>

                <label className="form-radio seam-allowance">
                  <input
                    className="seam-allowance"
                    type="radio"
                    name="seamAllowance"
                    value="1"
                    checked={seamAllowance === "1" ? true : false}
                    onChange={selectSeamAllowance}
                  />
                  <i className="form-icon"></i>
                  <span>1 cm / 0.4"</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="calculate btn styler-btn" onClick={calculateFabrics}>
        Calculate Fabric Requirements
      </button>
      <div className="print-fabrics print">
        {isCalculateFabricsActive ? (
          <>
            <div className="card calculate-fabrics fabrics-result">
              <div className="card-header">
                <div className="card-title h5">Fabric Requirements</div>
              </div>
              <div className="card-body">
                <div className="content">
                  <CalculateFabrics />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CalculateFabricForm;
