import Actions from "../enum/actions.enum";
import IContextState from "../interfaces/state.context.interface";

const Reducer = (state: IContextState, action: any) => {
  switch (action.type) {
    case Actions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
