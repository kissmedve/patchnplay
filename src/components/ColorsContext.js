import React, { createContext, useReducer } from "react";

const initialState = {
  colors: []
};

export const ColorsContext = createContext(initialState);

export const ColorsReducer = (state, action) => {
  if (action.type === "ADD_COLOR") {
    const addedColor = action.payload;
    const expandedColors = [...state.colors, addedColor];
    return {
      ...state,
      colors: expandedColors
    };
  }
  if (action.type === "DELETE_COLOR") {
    const deletedColor = action.payload;
    const remainingColors = state.colors.filter(color => color !== action.payload);
    return {
      ...state,
      colors: remainingColors
    };
  };
  if (action.type === "UPDATE_COLORS") {
    return {
      ...state,
      colors: action.payload
    };
  }
};

export const ColorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ColorsReducer, initialState);

  const addColor = (color) => {
    dispatch({
      type: "ADD_COLOR",
      payload: color
    });
  }
  const deleteColor = (color) => {
    dispatch({
      type: "DELETE_COLOR",
      payload: color
    });
  }
  // update all colors (e.g. uploading)
  const updateColors = (colors) => {
    dispatch({
      type: "UPDATE_COLORS",
      payload: colors
    });
  };

  return (
    <ColorsContext.Provider
      value={{
        colors: state.colors,
        addColor,
        deleteColor,
        updateColors
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
