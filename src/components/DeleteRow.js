import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const DeleteRow = ({ rowId, squareWidth }) => {

  // global states
  const { squares, rows, sashingRows, sashingHeights, updateSquares, updateRows, updateSashingRows, updateSashingHeights, insertedBigBlocks, updateInsertedBigBlocks, sashingRowsColor, updateSashingRowsColor } = useContext(SquaresContext);

  const deleteThisRow = (rowId) => {

    // don't remove row, if it has "covered" squares (BigBlock sitting on them)
    let dontRemove = 0;
    squares.map((squs, i) => {
      return squs.filter(squ => squ.row === rowId).forEach(squ => squ.covered === true ? dontRemove += 1 : dontRemove += 0);
    })

    // never remove the last existing row
    if (dontRemove === 0 && rows.length > 1) {

      // remove one row for rowhead rendering
      const newRows = rows.slice(0, rows.length - 1);

      // remove the indicated row
      const newSashingRows = [...sashingRows.slice(0, rowId), ...sashingRows.slice(rowId + 1)];
      const newSashingHeights = [...sashingHeights.slice(0, rowId), ...sashingHeights.slice(rowId + 1)];
      const newSashingRowsColor = [...sashingRowsColor.slice(0, rowId), ...sashingRowsColor.slice(rowId + 1)];

      // prepare squares for update

      // remove the indicated row
      let squarez = [...squares.slice(0, rowId), ...squares.slice(rowId + 1)];

      // close the gap
      for (let i = 0; i < squarez.length; i++) {
        for (let k = 0; k < squarez[0].length; k++) {
          squarez[i][k].row = squarez[i][k].row > rowId ? squarez[i][k].row - 1 : squarez[i][k].row;
          squarez[i][k].id = squarez[i][k].row > rowId - 1 ? i + '-' + k : squarez[i][k].id;
        }
      }

      // adjust BigBlock position (anchorSquares)
      let newInsertedBigBlocks = insertedBigBlocks.map(block => {
        let anchorSplit = block.anchorSquare.split('-');
        anchorSplit = [parseInt(anchorSplit[0]), parseInt(anchorSplit[1])];
        anchorSplit[0] = anchorSplit[0] >= rowId ? anchorSplit[0] - 1 : anchorSplit[0];
        let newAnchorSquare = [anchorSplit[0], anchorSplit[1]].join('-');
        return {
          ...block,
          anchorSquare: newAnchorSquare,
        };
      })

      updateSquares(squarez);
      updateRows(newRows);
      updateSashingRows(newSashingRows);
      updateSashingHeights(newSashingHeights);
      updateInsertedBigBlocks(newInsertedBigBlocks);
      updateSashingRowsColor(newSashingRowsColor);
    }
  }

  return (
    <>
      <button className="squares-settings delete-row" style={{ height: sashingHeights[rowId] * squareWidth }} onClick={() => deleteThisRow(rowId)}>
        <span>Delete Row</span>
      </button>
    </>
  )
}

export default DeleteRow;