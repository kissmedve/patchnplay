import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";
import { BigBlocksContext } from "./BigBlocksContext";
import { ColorsContext } from "./ColorsContext";

const DownloadJSON = () => {

  // global states
  const { cols, rows, sashingCols, sashingRows, sashingWidths, sashingHeights, squares, insertedBigBlocks, borders, squareWidth, borderBaseWidth } = useContext(SquaresContext);
  const { selectedBigBlocks } = useContext(BigBlocksContext);
  const { paletteColors } = useContext(ColorsContext);

  const data = {
    cols,
    rows,
    sashingCols,
    sashingRows,
    sashingWidths,
    sashingHeights,
    squares,
    insertedBigBlocks,
    borders,
    squareWidth,
    borderBaseWidth,
    selectedBigBlocks,
    paletteColors,
  };

  return (
    <a className="btn btn-link"
      type="button"
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`}
      download="patchnplay.json"
    >
      <img src="icon-download.svg" alt="Download" />
      <span>Download</span>
    </a>
  )

}

export default DownloadJSON;

