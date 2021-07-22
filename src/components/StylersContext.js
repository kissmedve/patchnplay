import React, { createContext, useReducer } from "react";

const initialState = {
  squStylerIsOpen: false,
  activeSquStyler: '',
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


  return (
    <StylersContext.Provider
      value={{
        squStylerIsOpen: state.squStylerIsOpen,
        activeSquStyler: state.activeSquStyler,
        openSquStyler,
        closeSquStyler,
      }}
    >
      {children}
    </StylersContext.Provider>
  );
};
