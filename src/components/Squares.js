import React, { useContext, useState } from "react";
import { ColorsContext } from "./ColorsContext";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Square from "./Square";
import AddColumn from "./AddColumn";
import DeleteColumn from "./DeleteColumn";
import AddRow from "./AddRow";
import DeleteRow from "./DeleteRow";
import SashingColStyler from "./SashingColStyler";
import SashingRowStyler from "./SashingRowStyler";

const Squares = () => {

  // global states
  const { colors } = useContext(ColorsContext);
  const { squares, cols, sashingWidths, sashingHeights } = useContext(SquaresContext);
  const { sashStylerIsOpen, activeSashStyler, openSashStyler } = useContext(StylersContext);

  // local states 
  const [squareWidth, setSquareWidth] = useState('50');

  const allSquaresGrid = () => {

    let gridColumns = [90];

    // sashingWidths has 1 as base value for every regular width (= squares) column
    sashingWidths.map((width) => gridColumns.push(width * squareWidth));
    let containerWidth = gridColumns.reduce((prev, curr) => prev + curr) + 'px';
    let gridColumnsStyle = gridColumns.map(col => col + 'px').join(' ');
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
  const openSashColStyler = (id) => (event) => {
    event.stopPropagation();
    openSashStyler({ rowCol: 'col', id: id });
  }
  const openSashRowStyler = (id) => (event) => {
    event.stopPropagation();
    openSashStyler({ rowCol: 'row', id: id });
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
        <div className="squares-settings col-sashing">
          <button className="switch-sashing" style={{ width: sashingWidths[index] * squareWidth }} onClick={openSashColStyler(index)} >
            <span >Sashing</span>
          </button>
          {
            sashStylerIsOpen === true && activeSashStyler.rowCol === 'col' && activeSashStyler.id === index ?
              <SashingColStyler rowCol={'col'} id={index} />
              : null
          }
        </div>
        <AddColumn colId={col} squareWidth={squareWidth} />
        <DeleteColumn colId={col} squareWidth={squareWidth} />
      </div>
    );
    gridItems.push(gridColheads);

    // each row of squares
    for (let i = 0; i < squares.length; i++) {
      // rowhead
      let gridRowHeads =
        <div className="rowhead" key={`rowhead-${i}`} id={`rowhead-${i}`}>
          <div className="squares-settings row-sashing">
            <button className="switch-sashing" style={{ height: sashingHeights[i] * squareWidth }} onClick={openSashRowStyler(i)} >
              <span >Sashing</span>
            </button>
            {
              sashStylerIsOpen === true && activeSashStyler.rowCol === 'row' && activeSashStyler.id === i ?
                <SashingRowStyler rowCol={'row'} id={i} />
                : null
            }
          </div>
          <AddRow rowId={i} squareWidth={squareWidth} />
          <DeleteRow rowId={i} squareWidth={squareWidth} />
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
            fillSashing={squares[i][k].fillSashing}
            covered={squares[i][k].covered}
            sashing={squares[i][k].sashing}
            sashingCrossed={squares[i][k].sashingCrossed}
            sashingWidth={squares[i][k].sashingWidth}
            sashingHeight={squares[i][k].sashingHeight}
            squareWidth={squareWidth}
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