import React, { createContext, useReducer } from "react";

const initialState = {
  cols: [0, 1, 2],
  rows: [0, 1, 2],
  sashingCols: [false, false, false],
  sashingRows: [false, false, false],
  sashingWidths: [1, 1, 1],
  sashingHeights: [1, 1, 1],
  sashingColsColor: ["white", "white", "white"],
  sashingRowsColor: ["white", "white", "white"],
  squares: [
    [
      {
        id: "0-0",
        row: 0,
        col: 0,
        squareType: "rect",
        fillSquare: "#e30e0e",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "0-1",
        row: 0,
        col: 1,
        squareType: "rect",
        fillSquare: "#1212d5",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "0-2",
        row: 0,
        col: 2,
        squareType: "rect",
        fillSquare: "#ffe000",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
    ],
    [
      {
        id: "1-0",
        row: 1,
        col: 0,
        squareType: "rect",
        fillSquare: "#e302e3",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "1-1",
        row: 1,
        col: 1,
        squareType: "rect",
        fillSquare: "#008080",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "1-2",
        row: 1,
        col: 2,
        squareType: "rect",
        fillSquare: "#ff9900",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
    ],
    [
      {
        id: "2-0",
        row: 2,
        col: 0,
        squareType: "rect",
        fillSquare: "#e30e0e",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: false,
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "2-1",
        row: 2,
        col: 1,
        squareType: "rect",
        fillSquare: "#1212d5",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
      {
        id: "2-2",
        row: 2,
        col: 2,
        squareType: "rect",
        fillSquare: "#ffe000",
        fillHstLdown: "white",
        fillHstRdown: "white",
        fillHstLup: "white",
        fillHstRup: "white",
        fillSashing: "white",
        covered: false,
        bigBlockAnchor: "",
        coveredByBigBlock: "",
        sashing: false,
        sashingCrossed: false,
        sashingWidth: 1,
        sashingHeight: 1,
      },
    ],
  ],
  insertedBigBlocks: [],
  borders: [
    {
      pos: 0,
      background: "#e30e0e",
      widthTop: 1,
      widthRight: 1,
      widthBottom: 1,
      widthLeft: 1,
    },
    {
      pos: 1,
      background: "#1212d5",
      widthTop: 1,
      widthRight: 1,
      widthBottom: 1,
      widthLeft: 1,
    },
    {
      pos: 2,
      background: "#ffe000",
      widthTop: 1,
      widthRight: 1,
      widthBottom: 1,
      widthLeft: 1,
    },
    {
      pos: 3,
      background: "#40e0d0",
      widthTop: 1,
      widthRight: 1,
      widthBottom: 1,
      widthLeft: 1,
    },
  ],
  squareWidth: 50,
  borderBaseWidth: 10,
  baseColor: "eee",
};

export const SquaresContext = createContext(initialState);

export const SquaresReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SQUARE":
      const addedSquare = action.payload;
      const expandedSquares = [...state.squares, addedSquare];
      return {
        ...state,
        squares: expandedSquares,
      };

    case "DELETE_SQUARE":
      const deletedSquare = action.payload;
      const remainingSquares = state.squares.filter(
        (square) => square.id !== deletedSquare.id
      );
      return {
        ...state,
        squares: remainingSquares,
      };

    case "EDIT_SQUARE":
      // edit fill color depending on targeted svg part
      const { propertyKey, propertyValue, id } = action.payload;
      const updatedSquares = state.squares.map((squs) => {
        return squs.map((squ) => {
          if (squ.id === id) {
            let prop = propertyKey;
            return {
              ...squ,
              [prop]: propertyValue,
            };
          }
          return squ;
        });
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
      const updatedSquares2 = state.squares.map((squs) => {
        return squs.map((squ) => {
          if (propRowCol === "col" && squ.col === propId2) {
            let prop = propKey2;
            return {
              ...squ,
              [prop]: propValue2,
            };
          }
          if (propRowCol === "row" && squ.row === propId2) {
            let prop = propKey2;
            return {
              ...squ,
              [prop]: propValue2,
            };
          }
          return squ;
        });
      });

      return {
        ...state,
        squares: updatedSquares2,
      };

    case "UPDATE_SQUARES":
      // exchange full edited set of squares against previous set
      return {
        ...state,
        squares: action.payload,
      };

    case "INSERTED_BIGBLOCK_EDIT_SQUARES":
      const { covered, coveredByBigBlock, bigBlockAnchor, ids } =
        action.payload;
      const editedSquares = state.squares.map((squs) => {
        return squs.map((squ) => {
          if (ids.includes(squ.id)) {
            return {
              ...squ,
              covered,
              coveredByBigBlock,
              bigBlockAnchor,
            };
          }
          return squ;
        });
      });

      return {
        ...state,
        squares: editedSquares,
      };

    case "UPDATE_COLS":
      return {
        ...state,
        cols: action.payload,
      };

    case "UPDATE_ROWS":
      return {
        ...state,
        rows: action.payload,
      };

    case "UPDATE_SASHINGCOLS":
      return {
        ...state,
        sashingCols: action.payload,
      };

    case "UPDATE_SASHINGROWS":
      return {
        ...state,
        sashingRows: action.payload,
      };

    case "UPDATE_SASHINGWIDTHS":
      return {
        ...state,
        sashingWidths: action.payload,
      };

    case "UPDATE_SASHINGHEIGHTS":
      return {
        ...state,
        sashingHeights: action.payload,
      };

    case "UPDATE_SASHINGCOLSCOLOR":
      return {
        ...state,
        sashingColsColor: action.payload,
      };

    case "UPDATE_SASHINGROWSCOLOR":
      return {
        ...state,
        sashingRowsColor: action.payload,
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
      const remainingBigBlocks = state.insertedBigBlocks.filter(
        (block) => block.anchorSquare !== deletedBigBlock
      );
      return {
        ...state,
        insertedBigBlocks: remainingBigBlocks,
      };

    case "EDIT_INSERTED_BIGBLOCK":
      const {
        anchorSquare,
        stretchSquares,
        elementBlocksId,
        rowCol,
        colours,
        color1,
        color2,
        color3,
      } = action.payload;
      const updatedBigBlocks = state.insertedBigBlocks.map((block) => {
        if (block.anchorSquare === anchorSquare) {
          return {
            ...block,
            stretchSquares,
            elementBlocksId,
            rowCol,
            colours,
            color1: color1 !== "" ? color1 : block.color1,
            color2: color2 !== "" ? color2 : block.color2,
            color3: color3 !== "" ? color3 : block.color3,
          };
        }
        return block;
      });

      return {
        ...state,
        insertedBigBlocks: updatedBigBlocks,
      };

    case "UPDATE_INSERTED_BIGBLOCKS":
      // exchange full edited set of BigBlocks against previous set
      return {
        ...state,
        insertedBigBlocks: action.payload,
      };

    case "UPDATE_BORDERS":
      return {
        ...state,
        borders: action.payload,
      };

    case "EDIT_BORDER_WIDTHS":
      const { pos, widthTop, widthRight, widthBottom, widthLeft } =
        action.payload;
      const updatedBorders = state.borders.map((border) => {
        if (border.pos === pos) {
          return {
            ...border,
            widthTop,
            widthRight,
            widthBottom,
            widthLeft,
          };
        }
        return border;
      });

      return {
        ...state,
        borders: updatedBorders,
      };

    case "EDIT_BORDER_COLOR":
      const { bPos, background } = action.payload;
      const updateddBorders = state.borders.map((border) => {
        if (border.pos === bPos) {
          return {
            ...border,
            background: background,
          };
        }
        return border;
      });
      return {
        ...state,
        borders: updateddBorders,
      };

    default:
      return state;
  }
};

export const SquaresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SquaresReducer, initialState);

  const addSquare = (square) => {
    dispatch({
      type: "ADD_SQUARE",
      payload: square,
    });
  };
  const deleteSquare = (square) => {
    dispatch({
      type: "DELETE_SQUARE",
      payload: square,
    });
  };
  // edit a single square
  const editSquare = ({ id, propertyKey, propertyValue }) => {
    dispatch({
      type: "EDIT_SQUARE",
      payload: { id, propertyKey, propertyValue },
    });
  };
  // edit multiple squares (column or row)
  const editSquares = ({ rowCol, id, propertyKey, propertyValue }) => {
    dispatch({
      type: "EDIT_SQUARES",
      payload: { rowCol, id, propertyKey, propertyValue },
    });
  };

  // update all squares (e.g. uploading)
  const updateSquares = (squares) => {
    dispatch({
      type: "UPDATE_SQUARES",
      payload: squares,
    });
  };

  const insertedBigBlockEditSquares = ({
    ids,
    covered,
    coveredByBigBlock,
    bigBlockAnchor,
  }) => {
    dispatch({
      type: "INSERTED_BIGBLOCK_EDIT_SQUARES",
      payload: { ids, covered, coveredByBigBlock, bigBlockAnchor },
    });
  };

  const updateCols = (cols) => {
    dispatch({
      type: "UPDATE_COLS",
      payload: cols,
    });
  };

  const updateRows = (rows) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: rows,
    });
  };

  const updateSashingCols = (sashingCols) => {
    dispatch({
      type: "UPDATE_SASHINGCOLS",
      payload: sashingCols,
    });
  };

  const updateSashingRows = (sashingRows) => {
    dispatch({
      type: "UPDATE_SASHINGROWS",
      payload: sashingRows,
    });
  };

  const updateSashingWidths = (sashingWidths) => {
    dispatch({
      type: "UPDATE_SASHINGWIDTHS",
      payload: sashingWidths,
    });
  };

  const updateSashingHeights = (sashingHeights) => {
    dispatch({
      type: "UPDATE_SASHINGHEIGHTS",
      payload: sashingHeights,
    });
  };

  const updateSashingColsColor = (colors) => {
    dispatch({
      type: "UPDATE_SASHINGCOLSCOLOR",
      payload: colors,
    });
  };

  const updateSashingRowsColor = (colors) => {
    dispatch({
      type: "UPDATE_SASHINGROWSCOLOR",
      payload: colors,
    });
  };

  const addInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "ADD_INSERTED_BIGBLOCK",
      payload: bigBlock,
    });
  };

  const deleteInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "DELETE_INSERTED_BIGBLOCK",
      payload: bigBlock,
    });
  };

  const editInsertedBigBlock = (bigBlock) => {
    dispatch({
      type: "EDIT_INSERTED_BIGBLOCK",
      payload: bigBlock,
    });
  };

  const updateInsertedBigBlocks = (bigBlocks) => {
    dispatch({
      type: "UPDATE_INSERTED_BIGBLOCKS",
      payload: bigBlocks,
    });
  };

  const updateBorders = (borders) => {
    dispatch({
      type: "UPDATE_BORDERS",
      payload: borders,
    });
  };

  const editBorderWidths = ({
    pos,
    widthTop,
    widthRight,
    widthBottom,
    widthLeft,
  }) => {
    dispatch({
      type: "EDIT_BORDER_WIDTHS",
      payload: { pos, widthTop, widthRight, widthBottom, widthLeft },
    });
  };

  const editBorderColor = ({ bPos, background }) => {
    dispatch({
      type: "EDIT_BORDER_COLOR",
      payload: { bPos, background },
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
        sashingColsColor: state.sashingColsColor,
        sashingRowsColor: state.sashingRowsColor,
        insertedBigBlocks: state.insertedBigBlocks,
        borders: state.borders,
        squareWidth: state.squareWidth,
        borderBaseWidth: state.borderBaseWidth,
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
        updateSashingColsColor,
        updateSashingRowsColor,
        addInsertedBigBlock,
        deleteInsertedBigBlock,
        editInsertedBigBlock,
        updateInsertedBigBlocks,
        updateBorders,
        editBorderWidths,
        editBorderColor,
      }}
    >
      {children}
    </SquaresContext.Provider>
  );
};
