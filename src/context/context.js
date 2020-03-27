import React from "react";

const today = new Date();

export const initialState = {
  date: today
}

export const StateContext = React.createContext({
  initialState,
  setState: () => {}
});
