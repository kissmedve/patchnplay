import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const AddColumn = ({ colId, squareWidth }) => {

  // global states
  const { squares, cols, sashingCols, sashingRows, sashingWidths, updateSquares, updateCols, updateSashingCols, updateSashingWidths } = useContext(SquaresContext);

  // column is always added to the right of the clicked one
  // default new column is: 
  // individual squares (not sashing), hstUp, white

  const addColumnRight = (colId) => {

    // don't add column, if the clicked one AND the right neighbouring one have "covered" squares (BigBlock sitting on them)

    let dontAdd = 0;
    let squCovered = 0;
    squares.map((squs, i) => {
      return squs.filter(squ => squ.col > colId - 1 && squ.col < colId + 2).forEach(squ => squ.covered === true ? squCovered += 1 : squCovered += 0);
    }
    )
    squCovered === 2 ? dontAdd += 1 : dontAdd += 0;

    if (dontAdd === 0) {
      // add column for colhead rendering
      const newCols = [...cols, cols.length];

      // insert default values for new column
      const newSashingCols = [...sashingCols.slice(0, colId), false, ...sashingCols.slice(colId)];
      const newSashingWidths = [...sashingWidths.slice(0, colId), 1, ...sashingWidths.slice(colId)];

      // prepare squares for update
      let squarez = squares;

      // add squares to new column 
      for (let i = 0; i < squarez.length; i++) {
        for (let k = 0; k < squarez[0].length; k++) {
          squarez[i][k].col = squarez[i][k].col > colId ? squarez[i][k].col + 1 : squarez[i][k].col;
          squarez[i][k].id = squarez[i][k].col > colId ? i + '-' + (k + 1) : squarez[i][k].id;
        }
      }

      squarez = squarez.map((squs, i) => {
        return [
          // squares left to new column
          squs.filter((squ) => squ.col < (colId + 1)),
          // new square
          {
            id: `${i}-${colId + 1}`,
            row: i,
            col: colId + 1,
            squareType: sashingRows[i] === true ? 'rect' : 'hstup',
            fillSquare: sashingRows[i] === true ? squs.squ[0].fillSquare : 'white',
            fillHstLup: 'white',
            fillHstRup: 'white',
            fillHstLdown: 'white',
            fillHstRdown: 'white',
            covered: false,
            sashing: sashingRows[i] === true ? true : false,
            sashingCrossed: false,
            sashingWidth: 1,
            sashingHeight: sashingRows[i] === true ? squs.squ[0].sashingHeight : 1,
          },
          // squares right to new column
          squs.filter((squ) => squ.col > (colId + 1)),
        ].flat(1)
      });

      updateSquares(squarez);
      updateCols(newCols);
      updateSashingCols(newSashingCols);
      updateSashingWidths(newSashingWidths);
    }
  }

  return (
    <>
      <button
        className="squares-settings add-column"
        style={{ width: squareWidth, height: squareWidth }}
        onClick={() => addColumnRight(colId)}>
        <span>Add Column</span>
      </button>
    </>
  )
}

export default AddColumn;