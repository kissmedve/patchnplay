import React, { useContext, useState } from "react";
import { ColorsContext } from "./ColorsContext";
import { SquaresContext } from "./SquaresContext";
import Square from "./Square";

const Squares = () => {

  // global states
  const { colors } = useContext(ColorsContext);
  const { squares, cols, rows } = useContext(SquaresContext);

  // local states 
  const [squareWidth, setSquareWidth] = useState('50');

  const allSquaresGrid = () => {

    let gridColumns = ['90px'];
    cols.map((col) => gridColumns.push('1fr'));
    let gridColumnsStyle = gridColumns.join(' ');
    let containerWidth = (cols.length * squareWidth + 90) + 'px';
    let styles = {
      display: 'grid',
      gridTemplateColumns: gridColumnsStyle,
      width: containerWidth
    }
    return (
      <div id="squares-container" style={styles} >
        {allSquares()}
      </div>
    )
  }

  // build the grid of all squares with "column heads" and "row heads"
  const allSquares = () => {

    let gridItems = [];

    // left top unfilled corner
    let topLeftCorner = <div className="rowhead colhead"></div>;
    gridItems.push(topLeftCorner);

    // first row: column heads
    let gridColheads = cols.map((col, index) =>
      <div className="colhead" key={index}>
        <button className="squares-settings col-sashing" style={{ width: squareWidth, height: squareWidth }}>
          <span >Sashing</span>
        </button>
        <button className="squares-settings add-column" style={{ width: squareWidth, height: squareWidth }}>
          <span>Add Column</span>
        </button>
        <button className="squares-settings delete-column" style={{ width: squareWidth, height: squareWidth }}>
          <span>Delete Column</span>
        </button>
        <div className="sashing-styler"></div>
      </div>
    );
    gridItems.push(gridColheads);

    // each row of squares
    for (let i = 0; i < squares.length; i++) {
      // rowhead
      let gridRowHeads = <div className="rowhead" >
        <button className="squares-settings row-sashing" style={{ width: squareWidth, height: squareWidth }}>
          <span >Sashing</span>
        </button>
        <button className="squares-settings add-row" style={{ width: squareWidth, height: squareWidth }}>
          <span>Add Column</span>
        </button>
        <button className="squares-settings delete-row" style={{ width: squareWidth, height: squareWidth }}>
          <span>Delete Column</span>
        </button>
        <div className="sashing-styler"></div>
      </div>

      gridItems.push(gridRowHeads);

      // squares in row
      for (let k = 0; k < squares[0].length; k++) {
        let gridSquare =
          <Square
            key={`${squares[i][k].row}-${squares[i][k].col}`}
            id={`${squares[i][k].row}-${squares[i][k].col}`}
            row={squares[i][k].row}
            col={squares[i][k].col}
            squareType={squares[i][k].squareType}
            fillSquare={squares[i][k].fillSquare}
            fillHstLdown={squares[i][k].fillHstLdown}
            fillHstLup={squares[i][k].fillHstLup}
            fillHstRup={squares[i][k].fillHstRup}
            covered={squares[i][k].covered}
            sashing={squares[i][k].sashing}
            sashingCrossed={squares[i][k].sashingCrossed}
            sashingWidth={squares[i][k].sashingWidth}
            sashingHeight={squares[i][k].sashingHeight}
          />

        gridItems.push(gridSquare);
      }
    }
    return gridItems;
  }

  return (
    <>
      {allSquaresGrid()}
    </>
  )
}

export default Squares;