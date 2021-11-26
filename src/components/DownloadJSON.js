import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";
import { BigBlocksContext } from "./BigBlocksContext";
import { ColorsContext } from "./ColorsContext";
import { FabricsContext } from "./FabricsContext";

const DownloadJSON = () => {
  // global states
  const {
    cols,
    rows,
    sashingCols,
    sashingRows,
    sashingWidths,
    sashingHeights,
    sashingColsColor,
    sashingRowsColor,
    squares,
    insertedBigBlocks,
    borders,
    squareWidth,
    borderBaseWidth,
  } = useContext(SquaresContext);
  const { selectedBigBlocks } = useContext(BigBlocksContext);
  const { paletteColors } = useContext(ColorsContext);
  const { fabricWidths, fabricSquareWidth, seamAllowance } =
    useContext(FabricsContext);

  const data = {
    cols,
    rows,
    sashingCols,
    sashingRows,
    sashingWidths,
    sashingHeights,
    sashingColsColor,
    sashingRowsColor,
    squares,
    insertedBigBlocks,
    borders,
    squareWidth,
    borderBaseWidth,
    selectedBigBlocks,
    paletteColors,
    fabricWidths,
    fabricSquareWidth,
    seamAllowance,
  };

  return (
    <a
      className="btn btn-link"
      type="button"
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`}
      download="patchnplay.json"
    >
      <img src="icon-download.svg" alt="Download" />
      <span>Download</span>
    </a>
  );
};

export default DownloadJSON;
