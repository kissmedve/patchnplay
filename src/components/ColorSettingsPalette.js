import React, { useContext, useState } from "react";
import { ColorsContext } from "./ColorsContext";
import { ChromePicker } from "react-color";
import { FabricsContext } from "./FabricsContext";
import { SquaresContext } from "./SquaresContext";
//import collectPieces from "../utils/collectPieces";
import checkColors from "../utils/checkColors";
import Message from "./Message";

const ColorSettingsPalette = () => {
  // global states
  const { paletteColors, addColor, deleteColor } = useContext(ColorsContext);
  const { addFabricWidth, deleteFabricWidth } = useContext(FabricsContext);
  const { squares, insertedBigBlocks, borders } = useContext(SquaresContext);

  // local states
  const [currentColor, setCurrentColor] = useState("transparent");
  const [clickedColor, setClickedColor] = useState("transparent");
  const [messageIsActive, setMessageIsActive] = useState(false);
  const [messageText, setMessageText] = useState("");

  // extract colors in use to check against later

  // const objects = collectPieces(  );
  // const allColors = objects.map((obj) => obj.color);
  // const distinctColorsInUse = [...new Set(allColors)];

  const distinctColorsInUse = checkColors(squares, insertedBigBlocks, borders);

  const swatchesList = paletteColors.map((pcolor, index) => (
    <button
      className="swatch"
      style={{ background: pcolor }}
      key={index}
      onClick={() => setClickedColor(pcolor)}
    />
  ));
  const defineCurrentColor = (color, event) => {
    setCurrentColor(color.hex);
  };
  const addToColors = (event) => {
    if (currentColor !== "transparent") {
      addColor(currentColor);
      addFabricWidth(currentColor);
      setCurrentColor("transparent");
    }
  };
  const removeFromColors = (event) => {
    if (distinctColorsInUse.indexOf(clickedColor) > -1) {
      setMessageText(
        "This colour is still in use. Therefore it can't be removed from the palette."
      );
      setMessageIsActive(true);
    } else {
      deleteColor(clickedColor);
      deleteFabricWidth(clickedColor);
      setClickedColor("transparent");
    }
  };
  const addSwatchesBorder =
    currentColor === "transparent"
      ? "dashed 1px #333"
      : "solid 1px transparent";
  const removeSwatchesBorder =
    clickedColor === "transparent"
      ? "dashed 1px #333"
      : "solid 1px transparent";
  const swatchesGroupStyle =
    paletteColors.length < 1
      ? { border: "dashed 1px #333", width: "7.5rem", height: "1.25rem" }
      : { border: "solid 1px transparent" };

  const closeMessage = (event) => {
    setMessageIsActive(false);
  };

  return (
    <>
      <div className="card colors">
        <div className="card-header">
          <div className="card-title h5">Pick Colours</div>
        </div>
        <div className="card-body">
          <div className="columns">
            <div className="column col-6">
              <ChromePicker
                color={currentColor}
                onChange={defineCurrentColor}
              />
            </div>
            <div className="column col-6">
              <div className="h6">Current Colour</div>
              <div className="swatch-action">
                <div
                  className="swatch current-color"
                  style={{
                    background: currentColor,
                    border: addSwatchesBorder,
                  }}
                ></div>

                <button
                  className="btn styler-btn add-color"
                  onClick={addToColors}
                >
                  Add to Palette
                </button>
              </div>

              <div className="h6">Custom Palette</div>
              <div className="swatches-group" style={swatchesGroupStyle}>
                {swatchesList}
              </div>
              <div className="swatch-action">
                <div
                  className="swatch styler-btn remove-color"
                  style={{
                    background: clickedColor,
                    border: removeSwatchesBorder,
                  }}
                ></div>
                <button
                  className="btn styler-btn remove-color"
                  onClick={removeFromColors}
                >
                  Remove Colour
                </button>
                {messageIsActive ? (
                  <Message text={messageText} closeMessage={closeMessage} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorSettingsPalette;
