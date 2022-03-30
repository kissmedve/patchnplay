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
import Border from "./Border";
import BorderStyler from "./BorderStyler";
import Modal from "./Modal";
import InfoModal from "./InfoModal";

const Squares = () => {
  // global states
  const {
    squares,
    cols,
    sashingWidths,
    sashingHeights,
    insertedBigBlocks,
    squareWidth,
    borders,
    borderBaseWidth,
  } = useContext(SquaresContext);
  const {
    sashStylerIsOpen,
    activeSashStyler,
    openSashStyler,
    reopenBigBlockStyler,
    openBorderStyler,
    borderStylerIsOpen,
  } = useContext(StylersContext);

  // local states
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  // check window width upon resizing
  // TODO: add debounce funtion
  useEffect(() => {
    let currentClientWidth = document.body.clientWidth;

    const handleResize = () => {
      setWindowWidth(currentClientWidth);
    };
    window.addEventListener("resize", handleResize);

    // clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // summed up widths of borders
  let bordersTopWidth = borders
    .map((border) => border.widthTop)
    .reduce((acc, curr) => acc + curr, 0);
  let bordersRightWidth = borders
    .map((border) => border.widthRight)
    .reduce((acc, curr) => acc + curr, 0);
  let bordersLeftWidth = borders
    .map((border) => border.widthLeft)
    .reduce((acc, curr) => acc + curr, 0);

  // calculate grid columns width
  let gridColumns = [90]; // starting value for column heads' widths
  gridColumns[0] += bordersLeftWidth * borderBaseWidth;

  // sashingWidths / sashingHeights have 1 as base value for every regular width (= squares) column or regular height row
  //sashingWidths.map((width) => gridColumns.push(width * squareWidth));
  sashingWidths.map((width) => gridColumns.push(width * squareWidth));

  let containerWidthNumber =
    gridColumns.reduce((prev, curr) => prev + curr) +
    bordersRightWidth * borderBaseWidth;
  let containerWidth = containerWidthNumber + "px";
  let gridColumnsStyle = gridColumns.map((col) => col + "px").join(" ");

  // =======================

  // check window size initially,
  // and every time the gridcontainer width changes
  // depending on which one is wider,
  // the grid will be centered or get a scrollbar

  useEffect(() => {
    let currentClientWidth = document.body.clientWidth;
    setWindowWidth(currentClientWidth);
  }, [containerWidthNumber]);

  // =========================

  // calculate grid rows height
  let gridRows = [90]; // starting value for row heads' heights
  gridRows[0] += bordersTopWidth * borderBaseWidth;

  sashingHeights.map((height) => gridRows.push(height * squareWidth));
  let gridRowsStyle = gridRows.map((row) => row + "px").join(" ");

  // build squares grid container
  const allSquaresGrid = () => {
    let styles = {
      display: "grid",
      gridTemplateColumns: gridColumnsStyle,
      gridTemplateRows: gridRowsStyle,
      width: containerWidth,
    };
    return (
      <div id="squares-container" style={styles}>
        {allSquares()}
      </div>
    );
  };

  // define offsets of inserted BigBlocks related to squares grid, build them
  const insertedBlocksOverlay = () => {
    let overlayBlocks = insertedBigBlocks.map((block) => {
      let anchor = block.anchorSquare.split("-");
      let widthOffset =
        sashingWidths.slice(0, anchor[1]).reduce((acc, val) => acc + val, 0) *
          squareWidth +
        bordersLeftWidth * borderBaseWidth +
        90;
      let heightOffset =
        sashingHeights.slice(0, anchor[0]).reduce((acc, val) => acc + val, 0) *
          squareWidth +
        bordersTopWidth * borderBaseWidth +
        90;

      return (
        <>
          <div
            className="bigblock"
            key={block.anchorSquare + "-bb"}
            style={{
              position: "absolute",
              left: widthOffset + "px",
              top: heightOffset + "px",
              width: block.stretchSquares * squareWidth + "px",
              height: block.stretchSquares * squareWidth + "px",
              background: "rgba(0,0,0,0.7)",
            }}
            onClick={(event) => openBiggBlockStyler(block.anchorSquare)(event)}
          >
            <SVGBlock
              anchorSquare={block.anchorSquare}
              rowCol={block.rowCol}
              blockId={block.elementBlocksId}
              color1={block.color1}
              color2={block.color2}
              color3={block.color3}
              squareWidth={squareWidth}
              key={block.anchorSquare + "-svg"}
            />
          </div>
        </>
      );
    });
    return <>{overlayBlocks}</>;
  };
  const openSashColStyler = (id) => (event) => {
    event.stopPropagation();
    openSashStyler({ rowCol: "col", id: id });
  };
  const openSashRowStyler = (id) => (event) => {
    event.stopPropagation();
    openSashStyler({ rowCol: "row", id: id });
  };
  const openBiggBlockStyler = (id) => (event) => {
    event.stopPropagation();
    reopenBigBlockStyler(id);
  };

  // build the grid of all squares with "column heads" and "row heads"
  const allSquares = () => {
    let gridItems = [];

    // left top corner with buttons
    let topLeftCorner = (
      <div className="rowhead colhead" key={0}>
        <button
          className="info-button"
          onClick={() => setInfoModalIsOpen(!infoModalIsOpen)}
        >
          <span>Info</span>
        </button>

        <button className="border-styler" onClick={openBorderStyler}>
          <span>Border</span>
        </button>
        {borderStylerIsOpen === true ? <BorderStyler /> : null}
      </div>
    );
    gridItems.push(topLeftCorner);

    // first row: column heads
    let gridColheads = cols.map((col, index) => (
      <div className="colhead" key={`colhead-${index}`} id={`colhead-${index}`}>
        <div className="squares-settings col-sashing">
          <button
            className="switch-sashing"
            style={{ width: sashingWidths[index] * squareWidth }}
            onClick={openSashColStyler(index)}
          >
            <span>Sashing</span>
          </button>
          {sashStylerIsOpen === true &&
          activeSashStyler.rowCol === "col" &&
          activeSashStyler.id === index ? (
            <SashingColStyler
              rowCol={"col"}
              id={index}
              key={col + "-sashcol"}
            />
          ) : null}
        </div>
        <AddColumn
          colId={col}
          squareWidth={squareWidth}
          key={col + "-addcol"}
        />
        <DeleteColumn
          colId={col}
          squareWidth={squareWidth}
          key={col + "-delcol"}
        />
      </div>
    ));
    gridItems.push(gridColheads);

    // each row of squares
    for (let i = 0; i < squares.length; i++) {
      // rowhead
      let gridRowHeads = (
        <div className="rowhead" key={`rowhead-${i}`} id={`rowhead-${i}`}>
          <div className="squares-settings row-sashing">
            <button
              className="switch-sashing"
              style={{ height: sashingHeights[i] * squareWidth }}
              onClick={openSashRowStyler(i)}
            >
              <span>Sashing</span>
            </button>
            {sashStylerIsOpen === true &&
            activeSashStyler.rowCol === "row" &&
            activeSashStyler.id === i ? (
              <SashingRowStyler rowCol={"row"} id={i} key={i + "-sashrow"} />
            ) : null}
          </div>
          <AddRow rowId={i} squareWidth={squareWidth} key={i + "-addrow"} />
          <DeleteRow rowId={i} squareWidth={squareWidth} key={i + "-delrow"} />
        </div>
      );

      gridItems.push(gridRowHeads);

      // squares in row
      for (let k = 0; k < squares[0].length; k++) {
        let gridSquare = (
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
        );

        gridItems.push(gridSquare);
      }
    }
    return gridItems;
  };

  const bordersUnderlay = () => {
    return (
      <div className="borders-underlay">
        <Border />
      </div>
    );
  };

  return (
    <>
      <div
        id="main"
        style={
          windowWidth > containerWidthNumber
            ? { justifyContent: "center" }
            : { overflowX: "scroll" }
        }
      >
        <div className="grid-container">
          {bordersUnderlay()}
          {allSquaresGrid()}
          {insertedBlocksOverlay()}
        </div>
      </div>
      <Modal
        modalIsOpen={infoModalIsOpen}
        closeModal={() => setInfoModalIsOpen(false)}
      >
        <InfoModal />
      </Modal>
    </>
  );
};

export default Squares;
