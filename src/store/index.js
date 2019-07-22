import React, {createContext, useContext, useReducer} from 'react';
export const FETCHING_RESULTS = 'FETCHING_RESULTS';
export const PROFILE_SELECTED = 'PROFILE_SELECTED';
export const RESULTS_LOADED = 'RESULTS_LOADED';
export const StateContext = createContext();
export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
