import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const Border = ({ index = 0 }) => {
  const {
    borders,
    sashingWidths,
    sashingHeights,
    squareWidth,
    borderBaseWidth,
  } = useContext(SquaresContext);

  let currentBorder = borders.find((border) => border.pos === index);

  // width and height of the squares grid without button bars
  const coreGridWidth =
    sashingWidths.reduce((acc, curr) => acc + curr) * squareWidth + "px";
  const coreGridHeight =
    sashingHeights.reduce((acc, curr) => acc + curr) * squareWidth + "px";

  // build borders recursively
  if (index >= borders.length) {
    return;
  }

  if (index === borders.length - 1) {
    return (
      <div
        className="border"
        key={currentBorder.pos}
        style={{
          background: `${currentBorder.background}`,
          padding: `${currentBorder.widthTop * borderBaseWidth}px ${
            currentBorder.widthRight * borderBaseWidth
          }px ${currentBorder.widthBottom * borderBaseWidth}px ${
            currentBorder.widthLeft * borderBaseWidth
          }px`,
        }}
      >
        <div
          className="squares-core"
          style={{ width: `${coreGridWidth}`, height: `${coreGridHeight}` }}
        ></div>
      </div>
    );
  }
  return (
    <div
      className="border"
      style={{
        background: `${currentBorder.background}`,
        padding: `${currentBorder.widthTop * borderBaseWidth}px ${
          currentBorder.widthRight * borderBaseWidth
        }px ${currentBorder.widthBottom * borderBaseWidth}px ${
          currentBorder.widthLeft * borderBaseWidth
        }px`,
      }}
    >
      <Border index={index + 1} />
    </div>
  );
};

export default Border;
