import React, { useState, useContext, useEffect } from "react";
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
  const [selectedBigBlock, setSelectedBigBlock] = useState({
    elementBlocksId: "",
    stretchSquares: 1,
    anchorSquare: id,
    rowCol: 2,
    colours: 2,
    squaresColor1: 0,
    squaresColor2: 0,
    squaresColor3: 0,
    trianglesColor1: 0,
    trianglesColor2: 0,
    trianglesColor3: 0,
  });
  const [selectedBigBlockColours, setSelectedBigBlockColours] = useState({
    color1: "",
    color2: "",
    color3: "",
  });
  const [messageIsActive, setMessageIsActive] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [stylerBottomDistance, setStylerBottomDistance] = useState(null);
  const [stylerRightDistance, setStylerRightDistance] = useState(null);

  // adjust position when BigBlockStyler initially pops up
  // (without colour bars, if no block is selected/active)
  useEffect(() => {
    setDistanceValues();
  }, []);

  useEffect(() => {
    setDistanceValues();
  }, [
    selectedBigBlock.elementBlocksId,
    selectedBigBlock.stretchSquares,
    selectedBigBlock.colours,
  ]);

  // check if a BigBlock is set, and if so, transfer its properties to local state
  useEffect(() => {
    if (insertedBigBlocks && insertedBigBlocks.length > 0) {
      let activeBlock = insertedBigBlocks.find(
        (block) => block.anchorSquare === id
      );
      if (activeBlock) {
        setSelectedBigBlock({
          elementBlocksId: activeBlock.elementBlocksId,
          stretchSquares: activeBlock.stretchSquares,
          anchorSquare: activeBlock.anchorSquare,
          rowCol: activeBlock.rowCol,
          colours: activeBlock.colours,
        });
        setSelectedBigBlockColours({
          color1: activeBlock.color1,
          color2: activeBlock.color2,
          color3: activeBlock.color3,
        });
      }
    }
  }, []);

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

  // sashing cross is never more than 1 square
  const coveredSquares =
    sashingCrossed === false
      ? checkSquares(selectedBigBlock.stretchSquares)
      : [id];

  // insert or edit when selected Big Block changes
  useEffect(() => {
    if (!selectedBigBlock.elementBlocksId) {
      return;
    }
    if (
      insertedBigBlocks &&
      insertedBigBlocks.find((block) => block.anchorSquare === id)
    ) {
      let insIndex = insertedBigBlocks.indexOf(
        insertedBigBlocks.find((block) => block.anchorSquare === id)
      );

      // block changes, so change id of inserted block
      editInsertedBigBlock({
        ...insertedBigBlocks[insIndex],
        elementBlocksId: selectedBigBlock.elementBlocksId,
        rowCol: selectedBigBlock.rowCol,
        colours: selectedBigBlock.colours,
      });
      insertedBigBlockEditSquares({
        ids: coveredSquares,
        covered: true,
        bigBlockAnchor: id,
      });
    } else {
      // initial settings of inserted block
      addInsertedBigBlock({
        anchorSquare: id,
        stretchSquares:
          selectedBigBlock.stretchSquares !== ""
            ? selectedBigBlock.stretchSquares
            : 1,
        elementBlocksId: selectedBigBlock.elementBlocksId,
        rowCol: selectedBigBlock.rowCol,
        colours: selectedBigBlock.colours,
        squaresColor1: selectedBigBlock.squaresColor1,
        squaresColor2: selectedBigBlock.squaresColor2,
        squaresColor3: selectedBigBlock.squaresColor3,
        trianglesColor1: selectedBigBlock.trianglesColor1,
        trianglesColor2: selectedBigBlock.trianglesColor2,
        trianglesColor3: selectedBigBlock.trianglesColor3,
        color1:
          selectedBigBlockColours.color1 !== ""
            ? selectedBigBlockColours.color1
            : "#888",
        color2:
          selectedBigBlockColours.color2 !== ""
            ? selectedBigBlockColours.color2
            : "#ddd",
        color3:
          selectedBigBlockColours.color3 !== ""
            ? selectedBigBlockColours.color3
            : "#eee",
      });
      insertedBigBlockEditSquares({
        ids: coveredSquares,
        covered: true,
        bigBlockAnchor: id,
      });
    }
  }, [selectedBigBlock.elementBlocksId]);

  // edit when stretch (covered squares) changes
  useEffect(() => {
    if (
      !selectedBigBlock.stretchSquares ||
      selectedBigBlock.stretchSquares < 1
    ) {
      return;
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

      editInsertedBigBlock({
        stretchSquares:
          selectedBigBlock.stretchSquares !== ""
            ? selectedBigBlock.stretchSquares
            : 1,
        anchorSquare: id,
        elementBlocksId: selectedBigBlock.elementBlocksId,
        rowCol: selectedBigBlock.rowCol,
        colours: selectedBigBlock.colours,
        color1:
          selectedBigBlockColours.color1 !== ""
            ? selectedBigBlockColours.color1
            : "#888",
        color2:
          selectedBigBlockColours.color2 !== ""
            ? selectedBigBlockColours.color2
            : "#ddd",
        color3:
          selectedBigBlockColours.color3 !== ""
            ? selectedBigBlockColours.color3
            : "#eee",
      });

      if (selectedBigBlock.stretchSquares > previousStretch) {
        // stretch increased
        insertedBigBlockEditSquares({
          ids: coveredSquares,
          covered: true,
          bigBlockAnchor: id,
        });
      }
      if (selectedBigBlock.stretchSquares < previousStretch) {
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
  }, [selectedBigBlock.stretchSquares]);

  const handleBigBlockStretch = (event) => {
    event.stopPropagation();
    // evaluate BigBlock placement conflicts
    let evalStretch = parseInt(event.target.value);
    const startRow = parseInt(id.split("-")[0]);
    const startCol = parseInt(id.split("-")[1]);
    for (let i = startRow; i < startRow + evalStretch; i++) {
      for (let k = startCol; k < startCol + evalStretch; k++) {
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
          squares[i][k].bigBlockAnchor !== selectedBigBlock.anchorSquare
        ) {
          setMessageText("Big Blocks can't overlap.");
          setMessageIsActive(true);
          return;
        }
      }
    }
    setSelectedBigBlock({
      ...selectedBigBlock,
      stretchSquares: event.target.value,
    });
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
      deleteInsertedBigBlock(blockToRemove.anchorSquare);
      insertedBigBlockEditSquares({
        ids: coveredSquares,
        covered: false,
        bigBlockAnchor: "",
      });
      setSelectedBigBlock({
        elementBlocksId: "",
        stretchSquares: 1,
        anchorSquare: id,
        rowCol: 2,
        colours: 2,
        squaresColor1: 0,
        squaresColor2: 0,
        squaresColor3: 0,
        trianglesColor1: 0,
        trianglesColor2: 0,
        trianglesColor3: 0,
      });
    }
  };

  const preselectedBlocks = elementBlocks
    .filter((block) => selectedBigBlocks.includes(block.id))
    .map((block) => (
      <div
        className={`premade 
    ${selectedBigBlock.id === block.id ? "active" : ""}`}
        key={block.id}
        onClick={() => {
          setSelectedBigBlock({
            ...selectedBigBlock,
            elementBlocksId: block.id,
            anchorSquare: id,
            rowCol: block.rowCol,
            colours: block.colours,
            squaresColor1: block.squaresColor1,
            squaresColor2: block.squaresColor2,
            squaresColor3: block.squaresColor3,
            trianglesColor1: block.trianglesColor1,
            trianglesColor2: block.trianglesColor2,
            trianglesColor3: block.trianglesColor3,
            stretchSquares:
              sashingCrossed === true
                ? sashingWidth
                : selectedBigBlock.stretchSquares > 1
                ? selectedBigBlock.stretchSquares
                : 1,
          });
        }}
      >
        <img src={`svgs/${block.file}.svg`} alt={`${block.name}`} />
      </div>
    ));

  // colour palette only pops up when Big Block is selected
  // amount of subpalettes depending on selected Big Block
  const bigBlockColourType =
    selectedBigBlock.colours !== ""
      ? selectedBigBlock.colours === 2
        ? "bigBlockCol2"
        : "bigBlockCol3"
      : "";

  const selectedBorder =
    preselectedBlocks.length === 0
      ? "dashed 1px #333"
      : "solid 1px transparent";
  const selectedMargin = preselectedBlocks.length === 0 ? "10px 0 20px" : "0";

  const closeMessage = (event) => {
    setMessageIsActive(false);
  };

  // measurements height
  const stylerInitialHeight = 327; // measured w/o blocks applied + w/o colour bars
  const stylerAppliedBlock2ColorsHeight = 371; // measured w/o colour bars
  const stylerAppliedBlock3ColorsHeight = 387; // measured w/o colour bars (TODO: confirm colour block height)

  let blockRows = Math.ceil(selectedBigBlocks.length / 5);
  let paletteRows = Math.ceil(paletteColors.length / 5);

  let stylerHeight1 = covered === false ? stylerInitialHeight : null;
  let stylerHeight2 =
    covered === true && selectedBigBlock.colours === 2
      ? stylerAppliedBlock2ColorsHeight
      : null;
  let stylerHeight3 =
    covered === true && selectedBigBlock.colours === 3
      ? stylerAppliedBlock3ColorsHeight
      : null;

  // measurements width
  const stylerWidth = 258;

  const setDistanceValues = () => {
    let stylBottomDistance = bottomDistance(
      id,
      stylerHeight1,
      stylerHeight2,
      stylerHeight3,
      squareWidth,
      paletteRows,
      blockRows,
      selectedBigBlock.stretchSquares,
      sashingHeights,
      borders,
      borderBaseWidth
    );
    setStylerBottomDistance(stylBottomDistance);

    let stylRightDistance = rightDistance(
      id,
      stylerWidth,
      squareWidth,
      sashingWidths,
      selectedBigBlock.stretchSquares,
      borders,
      borderBaseWidth
    );
    setStylerRightDistance(stylRightDistance);
  };

  return (
    <>
      <div
        className="bigblock styling-dropdown popup active"
        style={{
          left:
            covered === true
              ? squareWidth * selectedBigBlock.stretchSquares - 18 + `px`
              : squareWidth - 18 + `px`,
          top:
            covered === true
              ? squareWidth * selectedBigBlock.stretchSquares - 18 + `px`
              : squareWidth - 18 + `px`,
          transform: `translate(${leftOffset(
            stylerRightDistance,
            stylerWidth,
            selectedBigBlock.stretchSquares,
            squareWidth
          )}px, ${topOffset(stylerBottomDistance)}px)`,
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
                    value={selectedBigBlock.stretchSquares}
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
            stylerWidth
          )}`}
          style={{
            top: `${pointerVerticalPosition(stylerBottomDistance)}px`,
            left: `${pointerHorizontalPosition(
              stylerRightDistance,
              stylerWidth
            )}px`,
          }}
        ></span>
      </div>
    </>
  );
};

export default BigBlockStyler;
