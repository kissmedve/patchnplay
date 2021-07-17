import React, { createContext, useReducer } from "react";

const initialState = {
  squares: [
    {
      // square: "1",
      // colour: "black",
      // colourhex: "#000"
    }
  ]
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
