import React, { useContext, useState, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Square from "./Square";
import AddColumn from "./AddColumn";
import DeleteColumn from "./DeleteColumn";
import AddRow from "./AddRow";
import DeleteRow from "./DeleteRow";
import SashingColStyler from "./SashingColStyler";
import SashingRowStyler from "./SashingRowStyler";
import SVGBlock from "./SVGBlock";

const Squares = () => {

  // global states
  const { squares, cols, sashingWidths, sashingHeights, insertedBigBlocks, id } = useContext(SquaresContext);
  const { sashStylerIsOpen, activeSashStyler, openSashStyler, squStylerIsOpen, bigBlockStylerIsOpen, activeBigBlockStyler, openBigBlockStyler, reopenBigBlockStyler } = useContext(StylersContext);

  // local states 
  const [squareWidth, setSquareWidth] = useState('50');

  // grid columns and rows

  // sashingWidths / sashingHeights have 1 as base value for every regular width (= squares) column or regular height row 
  let gridColumns = [90]; // starting value for column heads' widths
  sashingWidths.map((width) => gridColumns.push(width * squareWidth));
  let containerWidth = gridColumns.reduce((prev, curr) => prev + curr) + 'px';
  let gridColumnsStyle = gridColumns.map(col => col + 'px').join(' ');

  let gridRows = [90]; // starting value for row heads' heights
  sashingHeights.map((height) => gridRows.push(height * squareWidth));
  let containerHeight = gridRows.reduce((prev, curr) => prev + curr) + 'px';
  let gridRowsStyle = gridRows.map(row => row + 'px').join(' ');

  const allSquaresGrid = () => {
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

  const insertedBlocksOverlay = () => {
    let overlayBlocks = insertedBigBlocks.map((block, index) => {
      let anchor = block.anchorSquare.split('-');
      let widthOffset = (sashingWidths.slice(0, anchor[1]).reduce((acc, val) => acc + val, 0) * squareWidth) + 90;
      let heightOffset = (sashingHeights.slice(0, anchor[0]).reduce((acc, val) => acc + val, 0) * squareWidth) + 95;

      return (
        <>
          <div className="bigblock" key={block.anchorSquare} style={{ position: "absolute", left: widthOffset + "px", top: heightOffset + "px", width: (block.stretchSquares * squareWidth) + "px", height: (block.stretchSquares * squareWidth) + "px", background: "rgba(0,0,0,0.7)" }} onClick={(event) => openBiggBlockStyler(block.anchorSquare)(event)} >

            <SVGBlock anchorSquare={block.anchorSquare} rowCol={block.rowCol} blockId={block.elementBlocksId} color1={block.color1} color2={block.color2} color3={block.color3} squareWidth={squareWidth} />

          </div>
        </>
      )
    })
    return (
      <>{overlayBlocks}</>
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

  const openBiggBlockStyler = (id) => (event) => {
    event.stopPropagation();
    reopenBigBlockStyler(id);
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
            bigBlockAnchor={squares[i][k].bigBlockAnchor}
            coveredByBigBlock={squares[i][k].coveredByBigBlock}
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
      <div className="grid-container">
        {allSquaresGrid()}
        {insertedBlocksOverlay()}
      </div>
    </>
  )
}

export default Squares;