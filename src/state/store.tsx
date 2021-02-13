import React, { useReducer } from "react";
import IContextState from "../interfaces/state.context.interface";
import Reducer from "./reducer";

const initialState: any | IContextState = {
  users: [],
};

const Store = (props: any) => {
  const children: React.ComponentType = props.children;
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = React.createContext(initialState);
export default Store;
