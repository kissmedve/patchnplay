import React, { useState, useContext, useEffect, useCallback } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import { ColorsContext } from "./ColorsContext";
import Palette from "./Palette";
import elementBlocks from "../data/elementBlocks";
import { BigBlocksContext } from "./BigBlocksContext";
import Message from "./Message";
import { bottomDistance, rightDistance } from "../utils/stylerDistance";
import {
  topOffset,
  leftOffset,
  pointerVerticalPosition,
  pointerHorizontalPosition,
  pointerClass,
} from "../utils/stylerPosition";

const BigBlockStyler = ({
  id,
  squareType,
  squareWidth,
  sashingCrossed,
  sashingWidth,
  covered,
}) => {
  // global states
  const {
    squares,
    borders,
    sashingHeights,
    sashingWidths,
    borderBaseWidth,
    insertedBigBlocks,
    addInsertedBigBlock,
    editInsertedBigBlock,
    deleteInsertedBigBlock,
    insertedBigBlockEditSquares,
  } = useContext(SquaresContext);
  const { closeBigBlockStyler } = useContext(StylersContext);
  const { selectedBigBlocks } = useContext(BigBlocksContext);
  const { paletteColors } = useContext(ColorsContext);

  // local states
  // identify selectedBlock
  const [selectedBigBlockId, setSelectedBigBlockId] = useState(null);
  // data for rendering purposes:
  // covered squares horizontally/vertically
  const [selectedBigBlockStretchSquares, setSelectedBigBlockStretchSquares] =
    useState(1);
  // amount of colour palettes
  const [selectedBigBlockColours, setSelectedBigBlockColours] = useState(2);

  const [messageIsActive, setMessageIsActive] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [stylerBottomDistance, setStylerBottomDistance] = useState(null);
  const [stylerRightDistance, setStylerRightDistance] = useState(null);
  const [stylerLeftDistance, setStylerLeftDistance] = useState(null);

  // measurements
  // measurements height
  const stylerInitialHeight = 327; // measured w/o blocks applied + w/o colour bars
  const stylerAppliedBlock2ColorsHeight = 371; // measured w/o colour bars
  const stylerAppliedBlock3ColorsHeight = 387; // measured w/o colour bars (TODO: confirm colour block height)

  let blockRows = Math.ceil(selectedBigBlocks.length / 5);
  let paletteRows = Math.ceil(paletteColors.length / 5);

  let stylerHeight1 = covered === false ? stylerInitialHeight : null;
  let stylerHeight2 =
    covered === true && selectedBigBlockColours === 2
      ? stylerAppliedBlock2ColorsHeight
      : null;
  let stylerHeight3 =
    covered === true && selectedBigBlockColours === 3
      ? stylerAppliedBlock3ColorsHeight
      : null;

  // measurements width
  const stylerWidth = 258;

  const setDistanceValues = useCallback(() => {
    let stylBottomDistance = bottomDistance(
      id,
      null,
      stylerHeight1,
      stylerHeight2,
      stylerHeight3,
      squareWidth,
      paletteRows,
      blockRows,
      sashingHeights,
      selectedBigBlockStretchSquares,
      borders,
      borderBaseWidth
    );
    setStylerBottomDistance(stylBottomDistance[1]);

    let stylRightDistance = rightDistance(
      id,
      null,
      stylerWidth,
      squareWidth,
      sashingWidths,
      selectedBigBlockStretchSquares,
      borders,
      borderBaseWidth
    );
    setStylerRightDistance(stylRightDistance[1]);
    setStylerLeftDistance(stylRightDistance[0]);
  }, [
    id,
    stylerHeight1,
    stylerHeight2,
    stylerHeight3,
    squareWidth,
    paletteRows,
    blockRows,
    sashingHeights,
    selectedBigBlockStretchSquares,
    borders,
    borderBaseWidth,
    stylerWidth,
    sashingWidths,
  ]);

  // check if a BigBlock is set, and if so, transfer its id and data to local state
  useEffect(() => {
    if (insertedBigBlocks && insertedBigBlocks.length > 0) {
      let activeBlock = insertedBigBlocks.find(
        (block) => block.anchorSquare === id
      );
      if (activeBlock) {
        setSelectedBigBlockId(activeBlock.elementBlocksId);
        setSelectedBigBlockStretchSquares(activeBlock.stretchSquares);
        setSelectedBigBlockColours(activeBlock.colours);
      }
    }
  }, [insertedBigBlocks, id]);

  // adjust position of BigBlockStyler when it initially pops up
  // (without colour bars, if no block is selected/active)
  useEffect(() => {
    setDistanceValues();
  }, [setDistanceValues]);

  // adjust position of BigBlockStyler when stretch or number of palettes change
  useEffect(() => {
    setDistanceValues();
  }, [
    selectedBigBlockStretchSquares,
    selectedBigBlockColours,
    setDistanceValues,
  ]);

  // helper function / expression as to covered squares
  const checkSquares = (stretch) => {
    let arrayedIds = [];
    let anchorRowCol = id.split("-");
    for (let i = 0; i < stretch; i++) {
      for (let k = 0; k < stretch; k++) {
        arrayedIds.push([
          parseInt(anchorRowCol[0]) + i,
          parseInt(anchorRowCol[1]) + k,
        ]);
      }
    }
    let coveredIds = arrayedIds.map((id) => id[0] + "-" + id[1]);
    return coveredIds;
  };

  // // sashing cross is never more than 1 square
  // let coveredSquares =
  // sashingCrossed === false
  //   ? checkSquares(activeStretch)
  //   : [id];

  // insert or edit selected Big Block
  const selectBigBlock = (blockId) => {
    let newBigBlockId = blockId;
    setSelectedBigBlockId(newBigBlockId);
    // get new BigBlock
    let newBigBlock = elementBlocks.find((block) => block.id === newBigBlockId);

    // identify previous BigBlock
    if (
      insertedBigBlocks &&
      insertedBigBlocks.find((block) => block.anchorSquare === id)
    ) {
      let insIndex = insertedBigBlocks.indexOf(
        insertedBigBlocks.find((block) => block.anchorSquare === id)
      );
      let activeStretch = insertedBigBlocks[insIndex].stretchSquares;
      let coveredSquares = checkSquares(activeStretch);

      // change data of inserted BigBlock
      editInsertedBigBlock({
        ...insertedBigBlocks[insIndex],
        elementBlocksId: newBigBlockId,
        rowCol: newBigBlock.rowCol,
        colours: newBigBlock.colours,
      });
      // change associated squares

      insertedBigBlockEditSquares({
        ids: coveredSquares,
        covered: true,
        bigBlockAnchor: id,
      });
    }
    // if no previous BigBlock,
    // initial settings of inserted block
    else {
      addInsertedBigBlock({
        anchorSquare: id,
        stretchSquares: selectedBigBlockStretchSquares,
        elementBlocksId: newBigBlockId,
        rowCol: newBigBlock.rowCol,
        colours: newBigBlock.colours,
        squaresColor1: newBigBlock.squaresColor1,
        squaresColor2: newBigBlock.squaresColor2,
        squaresColor3: newBigBlock.squaresColor3,
        trianglesColor1: newBigBlock.trianglesColor1,
        trianglesColor2: newBigBlock.trianglesColor2,
        trianglesColor3: newBigBlock.trianglesColor3,
        color1: "#888",
        color2: "#ddd",
        color3: "#eee",
      });
      insertedBigBlockEditSquares({
        ids: [id],
        covered: true,
        bigBlockAnchor: id,
      });
    }
  };

  const handleBigBlockStretch = (event) => {
    event.stopPropagation();
    // evaluate BigBlock placement conflicts
    let newStretch = parseInt(event.target.value);
    const startRow = parseInt(id.split("-")[0]);
    const startCol = parseInt(id.split("-")[1]);
    for (let i = startRow; i < startRow + newStretch; i++) {
      for (let k = startCol; k < startCol + newStretch; k++) {
        if (squares[i] === undefined) {
          setMessageText(
            "A Big Block can't be placed outside of the Squares Grid."
          );
          setMessageIsActive(true);
          return;
        }
        if (squares[i][k] === undefined) {
          setMessageText(
            "A Big Block can't be placed outside of the Squares Grid."
          );
          setMessageIsActive(true);
          return;
        }
        if (
          squares[i][k].sashingCrossed === false &&
          squares[i][k].sashing === true
        ) {
          setMessageText("A Big Block can't be placed on top of sashing.");
          setMessageIsActive(true);
          return;
        }
        if (
          squares[i][k].covered === true &&
          //squares[i][k].bigBlockAnchor !== selectedBigBlock.anchorSquare
          squares[i][k].bigBlockAnchor !== id
        ) {
          setMessageText("Big Blocks can't overlap.");
          setMessageIsActive(true);
          return;
        }
      }
    }

    if (
      insertedBigBlocks.length > 0 &&
      insertedBigBlocks.find((block) => block.anchorSquare === id)
    ) {
      let insIndex = insertedBigBlocks.indexOf(
        insertedBigBlocks.find((block) => block.anchorSquare === id)
      );
      // check previous stretch value
      let previousStretch = insertedBigBlocks[insIndex].stretchSquares;

      // sashing cross is never more than 1 square
      let coveredSquares =
        sashingCrossed === false ? checkSquares(newStretch) : [id];

      editInsertedBigBlock({
        ...insertedBigBlocks[insIndex],
        stretchSquares: newStretch,
      });

      if (newStretch > previousStretch) {
        // stretch increased
        insertedBigBlockEditSquares({
          ids: coveredSquares,
          covered: true,
          bigBlockAnchor: id,
        });
      }
      if (newStretch < previousStretch) {
        // stretch decreased
        let previousAnchorSqus = squares.map((squs) => {
          return squs.filter((squ) => squ.bigBlockAnchor === id);
        });
        let obsoleteAnchorSqus = previousAnchorSqus
          .reduce((acc, val) => acc.concat(val), [])
          .map((squ) => squ.id)
          .filter((squ) => !coveredSquares.includes(squ));

        // remaining covered squares
        insertedBigBlockEditSquares({
          ids: coveredSquares,
          covered: true,
          bigBlockAnchor: id,
        });
        // no longer covered squares
        insertedBigBlockEditSquares({
          ids: obsoleteAnchorSqus,
          covered: false,
          bigBlockAnchor: "",
        });
      }
    }
    setSelectedBigBlockStretchSquares(newStretch);
  };

  const removeBigBlock = (event) => {
    event.stopPropagation();
    if (
      insertedBigBlocks &&
      insertedBigBlocks.find((block) => block.anchorSquare === id)
    ) {
      let blockToRemove = insertedBigBlocks.find(
        (block) => block.anchorSquare === id
      );
      let coveredSquares = checkSquares(blockToRemove.stretchSquares);
      deleteInsertedBigBlock(blockToRemove.anchorSquare);
      insertedBigBlockEditSquares({
        ids: coveredSquares,
        covered: false,
        bigBlockAnchor: "",
      });
      setSelectedBigBlockId(null);
    }
  };

  // colour palette only pops up when Big Block is selected
  // amount of subpalettes depending on selected Big Block
  const bigBlockColourType =
    selectedBigBlockColours !== 0
      ? selectedBigBlockColours === 2
        ? "bigBlockCol2"
        : "bigBlockCol3"
      : "";

  const preselectedBlocks = elementBlocks
    .filter((block) => selectedBigBlocks.includes(block.id))
    .map((block) => (
      <div
        className={`premade 
      ${selectedBigBlockId === block.id ? "active" : ""}`}
        key={block.id}
        onClick={(event) => selectBigBlock(block.id)}
      >
        <img src={`svgs/${block.file}.svg`} alt={`${block.name}`} />
      </div>
    ));

  const selectedBorder =
    preselectedBlocks.length === 0
      ? "dashed 1px #333"
      : "solid 1px transparent";
  const selectedMargin = preselectedBlocks.length === 0 ? "10px 0 20px" : "0";

  const closeMessage = (event) => {
    setMessageIsActive(false);
  };

  const sashingWidthStretch = sashingWidths[Number(id.split("-")[1])];
  const sashingHeightStretch = sashingHeights[Number(id.split("-")[0])];

  return (
    <>
      <div
        className="bigblock styling-dropdown popup active"
        style={{
          left:
            covered === true
              ? squareWidth * selectedBigBlockStretchSquares - 18 + `px`
              : sashingWidths[Number(id.split("-")[1])] * squareWidth -
                18 +
                `px`,
          top:
            covered === true
              ? squareWidth * selectedBigBlockStretchSquares - 18 + `px`
              : sashingHeights[Number(id.split("-")[0])] * squareWidth -
                18 +
                `px`,
          transform: `translate(${leftOffset(
            stylerRightDistance,
            stylerLeftDistance,
            stylerWidth,
            selectedBigBlockStretchSquares,
            null,
            sashingWidthStretch,
            squareWidth
          )}px, ${topOffset(
            stylerBottomDistance,
            null,
            null,
            selectedBigBlockStretchSquares,
            null,
            sashingHeightStretch,
            squareWidth
          )}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="card ">
          <button
            className="btn btn-clear"
            aria-label="Close"
            onClick={closeBigBlockStyler}
          ></button>

          <div className="card-body">
            <div className="card-title h6">Big Block</div>

            <div
              className="selected-gallery"
              style={{
                minHeight: "35px",
                minWidth: "35px",
                border: selectedBorder,
                margin: selectedMargin,
              }}
            >
              {preselectedBlocks}
            </div>

            {messageIsActive ? (
              <Message text={messageText} closeMessage={closeMessage} />
            ) : (
              ""
            )}

            {sashingCrossed === false ? (
              <div className="form-group bigblock-size">
                <div className="card-title h6">Stretch</div>
                <div className="form-group bigblock-width">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    name="stretchSquares"
                    value={selectedBigBlockStretchSquares}
                    onChange={handleBigBlockStretch}
                  />
                  <span className="explanation">columns / rows</span>
                </div>
              </div>
            ) : (
              ""
            )}

            <Palette squareId={id} paletteType={bigBlockColourType} />

            {covered === true ? (
              <button
                className="btn styler-btn"
                onClick={(event) => removeBigBlock(event)}
              >
                Delete Big Block
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <span
          className={`pointer ${pointerClass(
            stylerBottomDistance,
            stylerRightDistance,
            null,
            stylerWidth,
            null
          )}`}
          style={{
            top: `${pointerVerticalPosition(
              stylerBottomDistance,
              null,
              null
            )}px`,
            left: `${pointerHorizontalPosition(
              stylerRightDistance,
              stylerWidth,
              null
            )}px`,
          }}
        ></span>
      </div>
    </>
  );
};

export default BigBlockStyler;
