import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const AddRow = ({ rowId, squareWidth }) => {
  // global states
  const { squares, rows, sashingCols, sashingRows, sashingHeights, updateSquares, updateRows, updateSashingRows, updateSashingHeights } = useContext(SquaresContext);

  // row is always added below the clicked one
  // default new row is: 
  // individual squares (not sashing), hstUp, white

  const addRowDown = (rowId) => {

    // don't add row, if the clicked one AND the one below have "covered" squares (BigBlock sitting on them)

    let dontAdd = 0;
    let squCovered = 0;
    squares.map((squs, i) => {
      return squs.filter(squ => squ.row > rowId - 1 && squ.row < rowId + 2).forEach(squ => squ.covered === true ? squCovered += 1 : squCovered += 0);
    }
    )
    squCovered === 2 ? dontAdd += 1 : dontAdd += 0;

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
            fillSquare: sashingCols[k] === true ? squares[0][k].fillSquare : 'white',
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
      ]

      // squarez = squarez.map((squs, i) => {
      //   return [
      //     // squares above new row
      //     squs.filter((squ) => squ.row < (rowId + 1)),
      //     // new square
      //     {
      //       id: `${rowId + 1}-${k}`,
      //       row: rowId + 1,
      //       col: k,
      //       squareType: sashingCols[i] === true ? 'rect' : 'hstup',
      //       fillSquare: sashingCols[i] === true ? squs.squ[0].fillSquare : 'white',
      //       fillHstLup: 'white',
      //       fillHstRup: 'white',
      //       fillHstLdown: 'white',
      //       fillHstRdown: 'white',
      //       covered: false,
      //       sashing: sashingCols[i] === true ? true : false,
      //       sashingCrossed: false,
      //       sashingWidth: 1,
      //       sashingHeight: sashingRows[i] === true ? squs.squ[0].sashingHeight : 1,
      //     },
      //     // squares right to new column
      //     squs.filter((squ) => squ.row > (rowId + 1)),
      //   ].flat(1)
      // });

      updateSquares(squarez);
      updateRows(newRows);
      updateSashingRows(newSashingRows);
      updateSashingHeights(newSashingHeights);
    }
  }

  return (
    <>
      <button
        className="squares-settings add-row"
        style={{ width: squareWidth, height: squareWidth }}
        onClick={() => addRowDown(rowId)}>
        <span>Add Row</span>
      </button>
    </>
  )
}

export default AddRow;