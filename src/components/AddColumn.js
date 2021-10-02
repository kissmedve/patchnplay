import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";

const AddColumn = ({ colId, squareWidth }) => {

  // global states
  const { squares, cols, sashingCols, sashingRows, sashingWidths, updateSquares, updateCols, updateSashingCols, updateSashingWidths, insertedBigBlocks, updateInsertedBigBlocks, sashingColsColor, updateSashingColsColor } = useContext(SquaresContext);

  // column is always added to the right of the clicked one
  // default new column is: 
  // individual squares (not sashing), squareType 'rect', white

  const addColumnRight = (colId) => {

    // don't add column, if the clicked one AND the right neighbouring one have "covered" squares (BigBlock sitting on them)

    let dontAdd = 0;
    let squsCovered = [];
    squares.map((squs, i) => {
      let squsCoveredByRow = 0;
      return squs.filter(squ => squ.col > colId - 1 && squ.col < colId + 2).forEach(squ => {
        squ.covered === true ? squsCoveredByRow += 1 : squsCoveredByRow += 0;
        squsCovered.push(squsCoveredByRow);
      });
    });
    squsCovered.indexOf(2) > -1 ? dontAdd += 1 : dontAdd += 0;

    if (dontAdd === 0) {
      // add column for colhead rendering
      const newCols = [...cols, cols.length];

      // insert default values for new column
      const newSashingCols = [...sashingCols.slice(0, colId + 1), false, ...sashingCols.slice(colId + 1)];
      const newSashingWidths = [...sashingWidths.slice(0, colId + 1), 1, ...sashingWidths.slice(colId + 1)];
      const newSashingColsColor = [...sashingColsColor.slice(0, colId + 1), 'white', ...sashingColsColor.slice(colId + 1)];

      // prepare squares for update

      let squarez = squares;

      // push columns to the right to make room for new column
      for (let i = 0; i < squarez.length; i++) {
        for (let k = 0; k < squarez[0].length; k++) {
          squarez[i][k].col = squarez[i][k].col > colId ? squarez[i][k].col + 1 : squarez[i][k].col;
          squarez[i][k].id = squarez[i][k].col > colId ? i + '-' + (k + 1) : squarez[i][k].id;
        }
      }

      // add squares to new column 
      squarez = squarez.map((squs, i) => {
        return [
          // squares left to new column
          squs.filter((squ) => squ.col < (colId + 1)),
          // new square
          {
            id: `${i}-${colId + 1}`,
            row: i,
            col: colId + 1,
            squareType: 'rect',
            fillSquare: 'white',
            fillSashing: sashingRows[i] === true ? squarez[i][0].fillSashing : 'white',
            fillHstLup: 'white',
            fillHstRup: 'white',
            fillHstLdown: 'white',
            fillHstRdown: 'white',
            covered: false,
            sashing: sashingRows[i] === true ? true : false,
            sashingCrossed: false,
            sashingWidth: 1,
            sashingHeight: sashingRows[i] === true ? squarez[i][0].sashingHeight : 1,
          },
          // squares right to new column
          squs.filter((squ) => squ.col > (colId + 1)),
        ].flat(1)
      });

      // adjust BigBlock position (anchorSquares)
      let newInsertedBigBlocks = insertedBigBlocks.map(block => {
        let anchorSplit = block.anchorSquare.split('-');
        anchorSplit = [parseInt(anchorSplit[0]), parseInt(anchorSplit[1])];
        anchorSplit[1] = anchorSplit[1] > colId ? anchorSplit[1] + 1 : anchorSplit[1];
        let newAnchorSquare = [anchorSplit[0], anchorSplit[1]].join('-');
        return {
          ...block,
          anchorSquare: newAnchorSquare,
        };
      })

      updateSquares(squarez);
      updateCols(newCols);
      updateSashingCols(newSashingCols);
      updateSashingWidths(newSashingWidths);
      updateInsertedBigBlocks(newInsertedBigBlocks);
      updateSashingColsColor(newSashingColsColor);
    }
  }

  return (
    <>
      <button
        className="squares-settings add-column"
        style={{ width: sashingWidths[colId] * squareWidth }}
        onClick={() => addColumnRight(colId)}>
        <span>Add Column</span>
      </button>
    </>
  )
}

export default AddColumn;