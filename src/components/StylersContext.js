import React, { createContext, useReducer } from "react";

const initialState = {
  squStylerIsOpen: false,
  activeSquStyler: '',
  sashStylerIsOpen: false,
  activeSashStyler: '',
  bigBlockStylerIsOpen: false,
  activeBigBlockStyler: '',
};

export const StylersContext = createContext(initialState);

export const StylersReducer = (state, action) => {
  switch (action.type) {

    case "OPEN_SQUSTYLER":
      return {
        ...state,
        squStylerIsOpen: true,
        activeSquStyler: action.payload,
      };

    case "CLOSE_SQUSTYLER":
      return {
        ...state,
        squStylerIsOpen: false,
        activeSquStyler: '',
      };

    case "OPEN_SASHSTYLER":
      return {
        ...state,
        sashStylerIsOpen: true,
        activeSashStyler: action.payload,
      };

    case "CLOSE_SASHSTYLER":
      return {
        ...state,
        sashStylerIsOpen: false,
        activeSashStyler: '',
      };

    case "OPEN_BIGBLOCKSTYLER":
      return {
        ...state,
        bigBlockStylerIsOpen: true,
        activeBigBlockStyler: action.payload,
      };

    case "CLOSE_BIGBLOCKSTYLER":
      return {
        ...state,
        bigBlockStylerIsOpen: false,
        activeBigBlockStyler: '',
      };

    default:
      return null;
  }
}

export const StylersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StylersReducer, initialState);

  const openSquStyler = (id) => {
    dispatch({
      type: "OPEN_SQUSTYLER",
      payload: id
    });
  }
  const closeSquStyler = () => {
    dispatch({
      type: "CLOSE_SQUSTYLER",
    });
  }
  const openSashStyler = ({ rowCol, id }) => {
    dispatch({
      type: "OPEN_SASHSTYLER",
      payload: { rowCol, id }
    });
  }
  const closeSashStyler = () => {
    dispatch({
      type: "CLOSE_SASHSTYLER",
    });
  }
  const openBigBlockStyler = (id) => {
    dispatch({
      type: "OPEN_BIGBLOCKSTYLER",
      payload: id
    });
  }
  const closeBigBlockStyler = () => {
    dispatch({
      type: "CLOSE_BIGBLOCKSTYLER",
    });
  }


  return (
    <StylersContext.Provider
      value={{
        squStylerIsOpen: state.squStylerIsOpen,
        activeSquStyler: state.activeSquStyler,
        sashStylerIsOpen: state.sashStylerIsOpen,
        activeSashStyler: state.activeSashStyler,
        bigBlockStylerIsOpen: state.bigBlockStylerIsOpen,
        activeBigBlockStyler: state.activeBigBlockStyler,
        openSquStyler,
        closeSquStyler,
        openSashStyler,
        closeSashStyler,
        openBigBlockStyler,
        closeBigBlockStyler,
      }}
    >
      {children}
    </StylersContext.Provider>
  );
};
