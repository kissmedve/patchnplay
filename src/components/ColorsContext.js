import React, { createContext, useReducer } from "react";

const initialState = {
  paletteColors: [],
};

export const ColorsContext = createContext(initialState);

export const ColorsReducer = (state, action) => {
  if (action.type === "ADD_COLOR") {
    const addedColor = action.payload;
    const expandedColors = [...state.paletteColors, addedColor];
    return {
      ...state,
      paletteColors: expandedColors,
    };
  }
  if (action.type === "DELETE_COLOR") {
    const remainingColors = state.paletteColors.filter(
      (color) => color !== action.payload
    );
    return {
      ...state,
      paletteColors: remainingColors,
    };
  }
  if (action.type === "UPDATE_COLORS") {
    return {
      ...state,
      paletteColors: action.payload,
    };
  }
};

export const ColorsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ColorsReducer, initialState);

  const addColor = (color) => {
    dispatch({
      type: "ADD_COLOR",
      payload: color,
    });
  };
  const deleteColor = (color) => {
    dispatch({
      type: "DELETE_COLOR",
      payload: color,
    });
  };
  // update all colors (e.g. uploading)
  const updateColors = (colors) => {
    dispatch({
      type: "UPDATE_COLORS",
      payload: colors,
    });
  };

  return (
    <ColorsContext.Provider
      value={{
        paletteColors: state.paletteColors,
        addColor,
        deleteColor,
        updateColors,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
