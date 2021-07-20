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
      { row: 0, col: 0, squareType: 'rect', fillSquare: 'red', fillHstLdown: 'red', fillHstRdown: 'white', fillHstLup: 'red', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 0, col: 1, squareType: 'rect', fillSquare: 'blue', fillHstLdown: 'blue', fillHstRdown: 'white', fillHstLup: 'blue', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 0, col: 2, squareType: 'rect', fillSquare: 'yellow', fillHstLdown: 'yellow', fillHstRdown: 'white', fillHstLup: 'yellow', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ],
    [
      { row: 1, col: 0, squareType: 'rect', fillSquare: 'magenta', fillHstLdown: 'magenta', fillHstRdown: 'white', fillHstLup: 'magenta', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 1, col: 1, squareType: 'rect', fillSquare: 'teal', fillHstLdown: 'teal', fillHstRdown: 'white', fillHstLup: 'teal', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 1, col: 2, squareType: 'rect', fillSquare: 'orange', fillHstLdown: 'orange', fillHstRdown: 'white', fillHstLup: 'orange', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ],
    [
      { row: 2, col: 0, squareType: 'rect', fillSquare: 'red', fillHstLdown: 'red', fillHstRdown: 'white', fillHstLup: 'red', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 2, col: 1, squareType: 'rect', fillSquare: 'blue', fillHstLdown: 'blue', fillHstRdown: 'white', fillHstLup: 'blue', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 },
      { row: 2, col: 2, squareType: 'rect', fillSquare: 'yellow', fillHstLdown: 'yellow', fillHstRdown: 'white', fillHstLup: 'yellow', fillHstRup: 'white', covered: false, sashing: false, sashingCrossed: false, sashingWidth: 1, sashingHeight: 1 }
    ]
  ],
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
      const updatedSquare = action.payload;
      const updatedSquares = state.squares.map((squ) => {
        if (squ.id === updatedSquare.id) {
          return updatedSquare;
        }
        return squ;
      });
      return {
        ...state,
        squares: updatedSquares
      };

    case "UPDATE_SQUARES":
      return {
        ...state,
        squares: action.payload
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
  const editSquare = (square) => {
    dispatch({
      type: "EDIT_SQUARE",
      payload: square
    });
  };

  // update all squares (e.g. uploading)
  const updateSquares = (squares) => {
    dispatch({
      type: "UPDATE_SQUARES",
      payload: squares
    });
  };

  return (
    <SquaresContext.Provider
      value={{
        squares: state.squares,
        cols: state.cols,
        rows: state.rows,
        addSquare,
        deleteSquare,
        editSquare,
        updateSquares
      }}
    >
      {children}
    </SquaresContext.Provider>
  );
};
