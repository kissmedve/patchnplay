import React, { createContext, useReducer } from "react";

const initialState = {
  selectedBigBlocks: []
};

export const BigBlocksContext = createContext(initialState);

export const BigBlocksReducer = (state, action) => {
  if (action.type === "ADD_BIGBLOCK") {
    const addedBigBlock = action.payload;
    const expandedSelection = [...state.selectedBigBlocks, addedBigBlock];
    return {
      ...state,
      selectedBigBlocks: expandedSelection
    };
  }
  if (action.type === "DELETE_BIGBLOCK") {
    const remainingSelection = state.selectedBigBlocks.filter(block => block !== action.payload);
    return {
      ...state,
      selectedBigBlocks: remainingSelection
    };
  };
  if (action.type === "UPDATE_BIGBLOCKS") {
    return {
      ...state,
      selectedBigBlocks: action.payload
    };
  }
};

export const BigBlocksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BigBlocksReducer, initialState);

  const addBigBlock = (block) => {
    dispatch({
      type: "ADD_BIGBLOCK",
      payload: block
    });
  }
  const deleteBigBlock = (block) => {
    dispatch({
      type: "DELETE_BIGBLOCK",
      payload: block
    });
  }
  // update all BigBlocks (e.g. uploading)
  const updateBigBlocks = (blocks) => {
    dispatch({
      type: "UPDATE_BIGBLOCKS",
      payload: blocks
    });
  };

  return (
    <BigBlocksContext.Provider
      value={{
        selectedBigBlocks: state.selectedBigBlocks,
        addBigBlock,
        deleteBigBlock,
        updateBigBlocks
      }}
    >
      {children}
    </BigBlocksContext.Provider>
  );
};
