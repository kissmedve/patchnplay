import React, { useState, useContext, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import { StylersContext } from "./StylersContext";
import Palette from './Palette';
import elementBlocks from "../data/elementBlocks";
import { BigBlocksContext } from "./BigBlocksContext";

const BigBlockStyler = ({ id, squareType, squareWidth }) => {

  // global states
  const { squares, insertedBigBlocks, addInsertedBigBlock, editInsertedBigBlock, deleteInsertedBigBlock, insertedBigBlockEditSquares } = useContext(SquaresContext);
  const { closeBigBlockStyler } = useContext(StylersContext);
  const { selectedBigBlocks } = useContext(BigBlocksContext);

  // local states
  const [selectedBigBlock, setSelectedBigBlock] = useState({
    elementBlocksId: '',
    stretchSquares: 1,
    anchorSquare: id,
    colours: '',
  });
  const [selectedBigBlockColours, setSelectedBigBlockColours] = useState({
    color1: '',
    color2: '',
    color3: '',
  })

  // first, check if a BigBlock is set, and if so, transfer its properties to local state
  useEffect(() => {
    if (insertedBigBlocks && insertedBigBlocks.length > 0) {
      let activeBlock = insertedBigBlocks.find(block => block.anchorSquare === id);
      if (activeBlock) {
        setSelectedBigBlock({
          elementBlocksId: activeBlock.elementBlocksId,
          stretchSquares: activeBlock.stretchSquares,
          anchorSquare: activeBlock.anchorSquare,
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

  const coveredSquares = () => {
    let arrayedIds = [];
    let anchorRowCol = id.split('-');
    let stretched = selectedBigBlock.stretchSquares !== '' ? selectedBigBlock.stretchSquares : 1;
    for (let i = 0; i < stretched; i++) {
      for (let k = 0; k < stretched; k++) {
        arrayedIds.push([parseInt(anchorRowCol[0]) + i, parseInt(anchorRowCol[1]) + k]);
      }
    }
    let coveredIds = arrayedIds.map(id => id[0] + '-' + id[1]);
    return coveredIds;
  }

  // insert or edit when selected Big Block changes
  useEffect(() => {
    if (!selectedBigBlock.elementBlocksId) {
      return;
    }
    if (insertedBigBlocks && insertedBigBlocks.find(block => block.anchorSquare === id)) {
      let insIndex = insertedBigBlocks.indexOf(insertedBigBlocks.find(block => block.anchorSquare === id));
      // just change id of inserted block
      editInsertedBigBlock({
        ...insertedBigBlocks[insIndex],
        elementBlocksId: selectedBigBlock.elementBlocksId,
        colours: selectedBigBlock.colours,
      });
      insertedBigBlockEditSquares({
        ids: coveredSquares(),
        covered: true,
        bigBlockAnchor: id,
      });
    } else {
      // initial settings of inserted block
      addInsertedBigBlock({
        anchorSquare: id,
        stretchSquares: selectedBigBlock.stretchSquares !== '' ? selectedBigBlock.stretchSquares : 1,
        elementBlocksId: selectedBigBlock.elementBlocksId,
        colours: selectedBigBlock.colours,
        color1: selectedBigBlockColours.color1 !== '' ? selectedBigBlockColours.color1 : '#888',
        color2: selectedBigBlockColours.color2 !== '' ? selectedBigBlockColours.color2 : '#ddd',
        color3: selectedBigBlockColours.color3 !== '' ? selectedBigBlockColours.color3 : '#eee',
      });
      insertedBigBlockEditSquares({
        ids: coveredSquares(),
        covered: true,
        bigBlockAnchor: id,
      });

    }
  }, [selectedBigBlock.elementBlocksId]);

  // edit when stretch (covered squares) changes
  useEffect(() => {
    if (!selectedBigBlock.stretchSquares || selectedBigBlock.stretchSquares < 1) {
      return;
    }
    if (insertedBigBlocks.length > 0 && insertedBigBlocks.find(block => block.anchorSquare === id)) {
      let insIndex = insertedBigBlocks.indexOf(insertedBigBlocks.find(block => block.anchorSquare === id));
      // check previous stretch value
      let previousStretch = insertedBigBlocks[insIndex].stretchSquares;

      editInsertedBigBlock({
        stretchSquares: selectedBigBlock.stretchSquares !== '' ? selectedBigBlock.stretchSquares : 1,
        anchorSquare: id,
        elementBlocksId: selectedBigBlock.elementBlocksId,
        colours: selectedBigBlock.colours,
        color1: selectedBigBlockColours.color1 !== '' ? selectedBigBlockColours.color1 : '#888',
        color2: selectedBigBlockColours.color2 !== '' ? selectedBigBlockColours.color2 : '#ddd',
        color3: selectedBigBlockColours.color3 !== '' ? selectedBigBlockColours.color3 : '#eee',
      });

      if (selectedBigBlock.stretchSquares > previousStretch) {
        // stretch increased
        insertedBigBlockEditSquares({
          ids: coveredSquares(),
          covered: true,
          bigBlockAnchor: id,
        });
      }
      if (selectedBigBlock.stretchSquares < previousStretch) {
        // stretch decreased
        let previousAnchorSqus = squares.map(squs => {
          return squs.filter(squ => squ.bigBlockAnchor === id)
        });
        let obsoleteAnchorSqus = previousAnchorSqus.reduce((acc, val) => acc.concat(val), []).map(squ => squ.id).filter(squ => !coveredSquares().includes(squ));

        // remaining covered squares
        insertedBigBlockEditSquares({
          ids: coveredSquares(),
          covered: true,
          bigBlockAnchor: id,
        });
        // no longer covered squares
        insertedBigBlockEditSquares({
          ids: obsoleteAnchorSqus,
          covered: false,
          bigBlockAnchor: '',
        });
      }

    }
  }, [selectedBigBlock.stretchSquares]);

  const handleBigBlockStretch = (event) => {
    event.stopPropagation();
    setSelectedBigBlock({ ...selectedBigBlock, stretchSquares: event.target.value });
  }

  const removeBigBlock = (event) => {
    event.stopPropagation();
    if (insertedBigBlocks && insertedBigBlocks.find(block => block.anchorSquare === id)) {
      let blockToRemove = insertedBigBlocks.find(block => block.anchorSquare === id);
      deleteInsertedBigBlock(blockToRemove.anchorSquare);
      insertedBigBlockEditSquares({
        ids: coveredSquares(),
        covered: false,
        bigBlockAnchor: '',
      });
    }
  }

  const preselectedBlocks = elementBlocks.filter(block => selectedBigBlocks.includes(block.id)).map(block =>
    <div className={`premade 
    ${selectedBigBlock.id === block.id ? "active" : ''}`} key={block.id} onClick={() => { setSelectedBigBlock({ ...selectedBigBlock, elementBlocksId: block.id, colours: block.colours }) }} >
      <img src={`svgs/${block.file}.svg`} alt={`${block.name}`} />
    </div>)

  // colour palette only pops up when Big Block is selected
  // amount of subpalettes depending on selected Big Block
  const bigBlockColourType = selectedBigBlock.colours !== '' ?
    (selectedBigBlock.colours === 2 ?
      'bigBlockCol2' :
      'bigBlockCol3') : '';

  const selectedBorder = preselectedBlocks.length === 0 ? 'dashed 1px #333' : 'solid 1px transparent';
  const selectedMargin = preselectedBlocks.length === 0 ? '15px 0 25px' : '0';

  return (
    <>
      <div className="bigblock styling-dropdown popup active" style={{ left: ((squareWidth * selectedBigBlock.stretchSquares - 1) - 18) + `px`, top: ((squareWidth * selectedBigBlock.stretchSquares - 1) - 18) + `px` }} >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeBigBlockStyler} ></button>

          <div className="card-body">
            <div className="card-title h6">Big Block</div>

            <div className="selected-gallery" style={{ minHeight: "50px", minWidth: "50px", border: selectedBorder, margin: selectedMargin }}>
              {preselectedBlocks}
            </div>

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
            <Palette squareId={id} paletteType={bigBlockColourType} />

            <button
              className="btn btn-apply"
              onClick={(event) => removeBigBlock(event)}
            >Delete Big Block</button>
          </div>

        </div>
      </div>
    </>

  )
}

export default BigBlockStyler;