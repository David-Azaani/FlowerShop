export const INCREASE_ME = "INCREASE_ME";
export const DECREASE_ME = "DECREASE_ME";

export interface CounterState {
  data: number;
  fullName: string;
}

const initialReducer: CounterState = {
  data: 999,
  fullName: "David Azani",
};

export default function counterReducer(state = initialReducer, action: any) {
  switch (action.type) {
    case INCREASE_ME:
      return {
        ...state,
        data: state.data + 1,
        fullName: state.fullName + 1 + "+",
      };

    case DECREASE_ME:
      return {
        ...state,
        data: state.data - 1,
        fullName: state.fullName + 1 + "-",
      };

    default:
      return state;
  }
  
}
