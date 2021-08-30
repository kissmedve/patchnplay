import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const AddRow = ({ rowId, squareWidth }) => {
  // global states
  const { squares, rows, sashingCols, sashingRows, sashingHeights, updateSquares, updateRows, updateSashingRows, updateSashingHeights, insertedBigBlocks, updateInsertedBigBlocks } = useContext(SquaresContext);

  // row is always added below the clicked one
  // default new row is: 
  // individual squares (not sashing), hstUp, white

  const addRowDown = (rowId) => {

    // don't add row, if the clicked one AND the one below have "covered" squares (BigBlock sitting on them)

    let dontAdd = 0;
    let squsCovered = [];
    for (let k = 0; k < squares[0].length; k++) {
      !squares[rowId + 1] ? squsCovered.push(0) :
        (squares[rowId + 1] && squares[rowId][k].covered === true && squares[rowId + 1][k].covered === true) ? squsCovered.push(1) : squsCovered.push(0)
    }
    squsCovered.indexOf(1) > -1 ? dontAdd += 1 : dontAdd += 0;

    if (dontAdd === 0) {
      // add row for rowhead rendering
      const newRows = [...rows, rows.length];

      // insert default values for new row
      const newSashingRows = [...sashingRows.slice(0, rowId), false, ...sashingRows.slice(rowId)];
      const newSashingHeights = [...sashingHeights.slice(0, rowId), 1, ...sashingHeights.slice(rowId)];

      // prepare squares for update

      let squarez = squares;

      // make room for new row 

      for (let i = 0; i < squarez.length; i++) {
        for (let k = 0; k < squarez[0].length; k++) {
          squarez[i][k].row = squarez[i][k].row > rowId ? squarez[i][k].row + 1 : squarez[i][k].row;
          squarez[i][k].id = squarez[i][k].row > rowId ? (i + 1) + '-' + k : squarez[i][k].id;
        }
      }

      // build new row
      let newRow = [];
      for (let k = 0; k < squarez[0].length; k++) {
        newRow.push(
          {
            id: `${rowId + 1}-${k}`,
            row: rowId + 1,
            col: k,
            squareType: sashingCols[k] === true ? 'rect' : 'hstup',
            fillSquare: 'white',
            fillSashing: sashingCols[k] === true ? squares[0][k].fillSashing : 'white',
            fillHstLup: 'white',
            fillHstRup: 'white',
            fillHstLdown: 'white',
            fillHstRdown: 'white',
            covered: false,
            sashing: sashingCols[k] === true ? true : false,
            sashingCrossed: false,
            sashingWidth: 1,
            sashingHeight: sashingCols[k] === true ? squares[0][k].sashingHeight : 1,
          },
        )
      };

      squarez = [
        ...squarez.slice(0, (rowId + 1)),
        newRow,
        ...squarez.slice(rowId + 1)
      ];

      // adjust BigBlock position (anchorSquares)
      let newInsertedBigBlocks = insertedBigBlocks.map(block => {
        let anchorSplit = block.anchorSquare.split('-');
        anchorSplit = [parseInt(anchorSplit[0]), parseInt(anchorSplit[1])];
        anchorSplit[0] = anchorSplit[0] >= rowId ? anchorSplit[0] + 1 : anchorSplit[0];
        let newAnchorSquare = [anchorSplit[0], anchorSplit[1]].join('-');
        return {
          ...block,
          anchorSquare: newAnchorSquare,
        };
      }
      )

      updateSquares(squarez);
      updateRows(newRows);
      updateSashingRows(newSashingRows);
      updateSashingHeights(newSashingHeights);
      updateInsertedBigBlocks(newInsertedBigBlocks);
    }
  }

  return (
    <>
      <button
        className="squares-settings add-row"
        style={{ height: sashingHeights[rowId] * squareWidth }}
        onClick={() => addRowDown(rowId)}>
        <span>Add Row</span>
      </button>
    </>
  )
}

export default AddRow;