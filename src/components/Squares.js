import React, { useContext, useState } from "react";
import { ColorsContext } from "./ColorsContext";
import { SquaresContext } from "./SquaresContext";
import Square from "./Square";
import AddColumn from "./AddColumn";
import DeleteColumn from "./DeleteColumn";
import AddRow from "./AddRow";
import DeleteRow from "./DeleteRow";

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
    let topLeftCorner = <div className="rowhead colhead" key={0} ></div>;
    gridItems.push(topLeftCorner);

    // first row: column heads
    let gridColheads = cols.map((col, index) =>
      <div className="colhead" key={`colhead-${index}`} id={`colhead-${index}`}>
        <button className="squares-settings col-sashing" style={{ width: squareWidth, height: squareWidth }} >
          <span >Sashing</span>
        </button>
        <AddColumn colId={col} squareWidth={squareWidth} />
        <DeleteColumn colId={col} squareWidth={squareWidth} />
        <div className="sashing-styler"></div>
      </div>
    );
    gridItems.push(gridColheads);

    // each row of squares
    for (let i = 0; i < squares.length; i++) {
      // rowhead
      let gridRowHeads =
        <div className="rowhead" key={`rowhead-${i}`} id={`rowhead-${i}`}>
          <button className="squares-settings row-sashing" style={{ width: squareWidth, height: squareWidth }}>
            <span >Sashing</span>
          </button>
          <AddRow rowId={i} squareWidth={squareWidth} />
          <DeleteRow rowId={i} squareWidth={squareWidth} />
          <div className="sashing-styler"></div>
        </div>

      gridItems.push(gridRowHeads);

      // squares in row
      for (let k = 0; k < squares[0].length; k++) {
        let gridSquare =
          <Square
            key={squares[i][k].id}
            id={squares[i][k].id}
            row={squares[i][k].row}
            col={squares[i][k].col}
            squareType={squares[i][k].squareType}
            fillSquare={squares[i][k].fillSquare}
            fillHstLdown={squares[i][k].fillHstLdown}
            fillHstRdown={squares[i][k].fillHstRdown}
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
    console.log(squares.map(squs => {
      return squs.map(squ => squ.id)
    }));
    return gridItems;
  }

  return (
    <>
      {allSquaresGrid()}
    </>
  )
}

export default Squares;