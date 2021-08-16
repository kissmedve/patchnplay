import React, { createContext, useReducer } from "react";

const initialState = {
  cols: [0, 1, 2],
  rows: [0, 1, 2],
  sashingCols: [false, false, false],
  sashingRows: [false, false, false],
  sashingWidths: [1, 1, 1],
  sashingHeights: [1, 1, 1],
  squares: [
    [
      { id: '0-0', row: 0, col: 0, squareType: 'rect', fillSquare: 'red', fillHstLdown: 'red', fillHstRdown: 'white', fillHstLup: 'red', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '0-1', row: 0, col: 1, squareType: 'rect', fillSquare: 'blue', fillHstLdown: 'blue', fillHstRdown: 'white', fillHstLup: 'blue', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '0-2', row: 0, col: 2, squareType: 'rect', fillSquare: 'yellow', fillHstLdown: 'yellow', fillHstRdown: 'white', fillHstLup: 'yellow', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ],
    [
      { id: '1-0', row: 1, col: 0, squareType: 'rect', fillSquare: 'magenta', fillHstLdown: 'magenta', fillHstRdown: 'white', fillHstLup: 'magenta', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '1-1', row: 1, col: 1, squareType: 'rect', fillSquare: 'teal', fillHstLdown: 'teal', fillHstRdown: 'white', fillHstLup: 'teal', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '1-2', row: 1, col: 2, squareType: 'rect', fillSquare: 'orange', fillHstLdown: 'orange', fillHstRdown: 'white', fillHstLup: 'orange', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ],
    [
      { id: '2-0', row: 2, col: 0, squareType: 'rect', fillSquare: 'red', fillHstLdown: 'red', fillHstRdown: 'white', fillHstLup: 'red', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: false, coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '2-1', row: 2, col: 1, squareType: 'rect', fillSquare: 'blue', fillHstLdown: 'blue', fillHstRdown: 'white', fillHstLup: 'blue', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { id: '2-2', row: 2, col: 2, squareType: 'rect', fillSquare: 'yellow', fillHstLdown: 'yellow', fillHstRdown: 'white', fillHstLup: 'yellow', fillHstRup: 'white', fillSashing: 'white', covered: false, bigBlockAnchor: '', coveredByBigBlock: '', sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ]
  ],
  insertedBigBlocks: [],
  baseColor: 'eee',
};

export const SquaresContext = createContext(initialState);

export const SquaresReducer = (state, action) => {
  switch (action.type) {

    case "ADD_SQUARE":
      const addedSquare = action.payload;
      const expandedQuares = [...state.squares, addedSquare];
      return {
        ...state,
        squares: expandedQuares,
      };

    case "DELETE_SQUARE":
      const deletedSquare = action.payload;
      const remainingSquares = state.squares.filter((square) => square.id !== deletedSquare.id);
      return {
        ...state,
        squares: remainingSquares,
      }

    case "EDIT_SQUARE":
      // edit fill color depending on targeted svg part
      const propKey = action.payload.propertyKey;
      const propValue = action.payload.propertyValue;
      const propId = action.payload.id;
      const updatedSquares = state.squares.map(squs => {
        return squs.map(squ => {
          if (squ.id === propId) {
            let prop = propKey;
            return {
              ...squ,
              [prop]: propValue
            }
          }
          return squ;
        })
      });

      return {
        ...state,
        squares: updatedSquares,
      };

    case "EDIT_SQUARES":
      // edit fill color in multiple squares,
      // depending on targeted svg part, here in particular sashing rects
      const propKey2 = action.payload.propertyKey;
      const propValue2 = action.payload.propertyValue;
      const propId2 = action.payload.id;
      const propRowCol = action.payload.rowCol;
      const updatedSquares2 = state.squares.map(squs => {
        return squs.map(squ => {
          if (propRowCol === 'col' && squ.col === propId2) {
            let prop = propKey2;
            return {
              ...squ,
              [prop]: propValue2
            }
          }
          if (propRowCol === 'row' && squ.row === propId2) {
            let prop = propKey2;
            return {
              ...squ,
              [prop]: propValue2
            }
          }
          return squ;
        })
      });

      return {
        ...state,
        squares: updatedSquares2,
      };

    case "UPDATE_SQUARES":
      // exchange full edited set of squares against previous set
      return {
        ...state,
        squares: action.payload
      };

    case "INSERTED_BIGBLOCK_EDIT_SQUARES":
      const covered = action.payload.covered;
      const coveredByBigBlock = action.payload.coveredByBigBlock;
      const bigBlockAnchor = action.payload.bigBlockAnchor;
      const ids = action.payload.ids;
      const editedSquares = state.squares.map(squs => {
        return squs.map(squ => {
          if (ids.includes(squ.id)) {
            return {
              ...squ,
              covered,
              coveredByBigBlock,
              bigBlockAnchor,
            }
          }
          return squ;
        })
      });

      return {
        ...state,
        squares: editedSquares,
      };

    case "UPDATE_COLS":
      return {
        ...state,
        cols: action.payload
      };

    case "UPDATE_ROWS":
      return {
        ...state,
        rows: action.payload
      };

    case "UPDATE_SASHINGCOLS":
      return {
        ...state,
        sashingCols: action.payload
      };

    case "UPDATE_SASHINGROWS":
      return {
        ...state,
        sashingRows: action.payload
      };

    case "UPDATE_SASHINGWIDTHS":
      return {
        ...state,
        sashingWidths: action.payload
      };

    case "UPDATE_SASHINGHEIGHTS":
      return {
        ...state,
        sashingHeights: action.payload
      };

    case "ADD_INSERTED_BIGBLOCK":
      const addedBigBlock = action.payload;
      const expandedBigBlocks = [...state.insertedBigBlocks, addedBigBlock];
      return {
        ...state,
        insertedBigBlocks: expandedBigBlocks,
      };

    case "DELETE_INSERTED_BIGBLOCK":
      const deletedBigBlock = action.payload;
      const remainingBigBlocks = state.insertedBigBlocks.filter((block) => block.anchorSquare !== deletedBigBlock);
      return {
        ...state,
        insertedBigBlocks: remainingBigBlocks,
      };

    case "EDIT_INSERTED_BIGBLOCK":
      const anchorSquare = action.payload.anchorSquare;
      const newStretchSquares = action.payload.stretchSquares;
      const newElementBlocksId = action.payload.elementBlocksId;
      const newColor1 = action.payload.color1;
      const newColor2 = action.payload.color2;
      const newColor3 = action.payload.color3;
      const updatedBigBlocks = state.insertedBigBlocks.map(block => {
        if (block.anchorSquare === anchorSquare) {
          return {
            ...block,
            stretchSquares: newStretchSquares,
            elementBlocksId: newElementBlocksId,
            color1: newColor1 !== '' ? newColor1 : block.color1,
            color2: newColor2 !== '' ? newColor2 : block.color2,
            color3: newColor3 !== '' ? newColor3 : block.color3,
          }
        }
        return block;
      });

      return {
        ...state,
        insertedBigBlocks: updatedBigBlocks,
      };

  }

};

export const SquaresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SquaresReducer, initialState);

  const addSquare = (square) => {
    dispatch({
      type: "ADD_SQUARE",
      payload: square
    });
  };
  const deleteSquare = (square) => {
    dispatch({
      type: "DELETE_SQUARE",
      payload: square
    });
  };
  // edit a single square
  const editSquare = ({ id, propertyKey, propertyValue }) => {
    dispatch({
      type: "EDIT_SQUARE",
      payload: { id, propertyKey, propertyValue }
    });
  };
  // edit multiple squares (column or row) 
  const editSquares = ({ rowCol, id, propertyKey, propertyValue }) => {
    dispatch({
      type: "EDIT_SQUARES",
      payload: { rowCol, id, propertyKey, propertyValue }
    });
  };

  // update all squares (e.g. uploading)
  const updateSquares = (squares) => {
    dispatch({
      type: "UPDATE_SQUARES",
      payload: squares
    });
  };

  const insertedBigBlockEditSquares = ({ ids, covered, coveredByBigBlock, bigBlockAnchor }) => {
    dispatch({
      type: "INSERTED_BIGBLOCK_EDIT_SQUARES",
      payload: { ids, covered, coveredByBigBlock, bigBlockAnchor }
    });
  };

  const updateCols = (cols) => {
    dispatch({
      type: "UPDATE_COLS",
      payload: cols
    });
  };

  const updateRows = (rows) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: rows
    });
  };

  const updateSashingCols = (sashingCols) => {
    dispatch({
      type: "UPDATE_SASHINGCOLS",
      payload: sashingCols
    });
  };

  const updateSashingRows = (sashingRows) => {
    dispatch({
      type: "UPDATE_SASHINGROWS",
      payload: sashingRows
    });
  };

  const updateSashingWidths = (sashingWidths) => {
    dispatch({
      type: "UPDATE_SASHINGWIDTHS",
      payload: sashingWidths
    });
  };

  const updateSashingHeights = (sashingHeights) => {
    dispatch({
      type: "UPDATE_SASHINGHEIGHTS",
      payload: sashingHeights
    });
  };

  const addInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "ADD_INSERTED_BIGBLOCK",
      payload: bigBlock
    });
  };

  const deleteInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "DELETE_INSERTED_BIGBLOCK",
      payload: bigBlock
    });
  };

  const editInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "EDIT_INSERTED_BIGBLOCK",
      payload: bigBlock,
    });
  };

  return (
    <SquaresContext.Provider
      value={{
        squares: state.squares,
        cols: state.cols,
        rows: state.rows,
        sashingCols: state.sashingCols,
        sashingRows: state.sashingRows,
        sashingWidths: state.sashingWidths,
        sashingHeights: state.sashingHeights,
        insertedBigBlocks: state.insertedBigBlocks,
        addSquare,
        deleteSquare,
        editSquare,
        editSquares,
        updateSquares,
        insertedBigBlockEditSquares,
        updateCols,
        updateRows,
        updateSashingCols,
        updateSashingRows,
        updateSashingWidths,
        updateSashingHeights,
        addInsertedBigBlock,
        deleteInsertedBigBlock,
        editInsertedBigBlock,
      }}
    >
      {children}
    </SquaresContext.Provider>
  );
};
