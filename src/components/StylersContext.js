import React, { createContext, useReducer } from "react";

const initialState = {
  squStylerIsOpen: false,
  activeSquStyler: '',
  sashStylerIsOpen: false,
  activeSashStyler: '',
  bigBlockStylerIsOpen: false,
  activeBigBlockStyler: '',
  borderStylerIsOpen: false,
  calcStylerIsOpen: false,
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

    case "REOPEN_BIGBLOCKSTYLER":
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

    case "OPEN_CALCSTYLER":
      return {
        ...state,
        calcStylerIsOpen: true,
      };

    case "CLOSE_CALCSTYLER":
      return {
        ...state,
        calcStylerIsOpen: false,
      };

    case "OPEN_BORDERSTYLER":
      return {
        ...state,
        borderStylerIsOpen: true,
      };

    case "CLOSE_BORDERSTYLER":
      return {
        ...state,
        borderStylerIsOpen: false,
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
  const reopenBigBlockStyler = (id) => {
    dispatch({
      type: "REOPEN_BIGBLOCKSTYLER",
      payload: id
    });
  }
  const closeBigBlockStyler = () => {
    dispatch({
      type: "CLOSE_BIGBLOCKSTYLER",
    });
  }
  const openBorderStyler = () => {
    dispatch({
      type: "OPEN_BORDERSTYLER",
    });
  }
  const closeBorderStyler = () => {
    dispatch({
      type: "CLOSE_BORDERSTYLER",
    });
  }
  const openCalcStyler = () => {
    dispatch({
      type: "OPEN_CALCSTYLER",
    });
  }
  const closeCalcStyler = () => {
    dispatch({
      type: "CLOSE_CALCSTYLER",
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
        borderStylerIsOpen: state.borderStylerIsOpen,
        calcStylerIsOpen: state.calcStylerIsOpen,
        openSquStyler,
        closeSquStyler,
        openSashStyler,
        closeSashStyler,
        openBigBlockStyler,
        reopenBigBlockStyler,
        closeBigBlockStyler,
        openBorderStyler,
        closeBorderStyler,
        openCalcStyler,
        closeCalcStyler,
      }}
    >
      {children}
    </StylersContext.Provider>
  );
};
