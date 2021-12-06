import React, { createContext, useReducer } from "react";

const initialState = {
  fabricWidths: [],
  fabricSquareWidth: "8.89",
  seamAllowance: "0.7",
  calcFabricModalIsOpen: false,
};

export const FabricsContext = createContext(initialState);

export const FabricsReducer = (state, action) => {
  switch (action.type) {
    // fabrics are only defined via color,
    // colors are always introduced via ColorSettingsPalette
    case "ADD_FABRIC_WIDTH":
      const addedFabricWidth = {
        color: action.payload,
        fabricWidth: "110", // initial setting
      };
      const expandedFabricWidths = [...state.fabricWidths, addedFabricWidth];
      return {
        ...state,
        fabricWidths: expandedFabricWidths,
      };

    case "DELETE_FABRIC_WIDTH":
      const deletedColor = action.payload;
      const remainingFabricWidths = state.fabricWidths.filter(
        (fabricWidth) => fabricWidth.color !== deletedColor
      );
      return {
        ...state,
        fabricWidths: remainingFabricWidths,
      };

    case "EDIT_FABRIC_WIDTH":
      const { fabricWidth, color } = action.payload;
      const editedFabricWidths = state.fabricWidths.map((fabrWidth) => {
        if (fabrWidth.color === color) {
          return {
            fabricWidth,
            color,
          };
        }
        return fabrWidth;
      });
      return {
        ...state,
        fabricWidths: editedFabricWidths,
      };

    case "UPDATE_FABRIC_WIDTHS":
      return {
        ...state,
        fabricWidths: action.payload,
      };

    case "UPDATE_FABRIC_SQUARE_WIDTH":
      return {
        ...state,
        fabricSquareWidth: action.payload,
      };

    case "UPDATE_SEAM_ALLOWANCE":
      return {
        ...state,
        seamAllowance: action.payload,
      };

    case "SET_CALC_FABRIC_MODAL_IS_OPEN":
      return {
        ...state,
        calcFabricModalIsOpen: action.payload,
      };

    default:
      return state;
  }
};

export const FabricsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FabricsReducer, initialState);

  const addFabricWidth = (color) => {
    dispatch({
      type: "ADD_FABRIC_WIDTH",
      payload: color,
    });
  };
  const deleteFabricWidth = (fabricWidth) => {
    dispatch({
      type: "DELETE_FABRIC_WIDTH",
      payload: fabricWidth,
    });
  };
  const editFabricWidth = (fabricWidth) => {
    dispatch({
      type: "EDIT_FABRIC_WIDTH",
      payload: fabricWidth,
    });
  };
  const updateFabricWidths = (fabricWidths) => {
    dispatch({
      type: "UPDATE_FABRIC_WIDTHS",
      payload: fabricWidths,
    });
  };
  const updateFabricSquareWidth = (fabricSquareWidth) => {
    dispatch({
      type: "UPDATE_FABRIC_SQUARE_WIDTH",
      payload: fabricSquareWidth,
    });
  };
  const updateSeamAllowance = (seamAllowance) => {
    dispatch({
      type: "UPDATE_SEAM_ALLOWANCE",
      payload: seamAllowance,
    });
  };
  const setCalcFabricModalIsOpen = (calcFabricModalIsOpen) => {
    dispatch({
      type: "SET_CALC_FABRIC_MODAL_IS_OPEN",
      payload: calcFabricModalIsOpen,
    });
  };

  return (
    <FabricsContext.Provider
      value={{
        fabricWidths: state.fabricWidths,
        fabricSquareWidth: state.fabricSquareWidth,
        seamAllowance: state.seamAllowance,
        calcFabricModalIsOpen: state.calcFabricModalIsOpen,
        calculatedPieces: state.calculatedPieces,
        addFabricWidth,
        deleteFabricWidth,
        editFabricWidth,
        updateFabricWidths,
        updateFabricSquareWidth,
        updateSeamAllowance,
        setCalcFabricModalIsOpen,
      }}
    >
      {children}
    </FabricsContext.Provider>
  );
};
