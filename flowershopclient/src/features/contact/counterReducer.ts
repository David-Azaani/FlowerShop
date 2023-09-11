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

export function increment(amount = 1) {
  return {
    type: INCREASE_ME,
    payload: amount,
  };
}
export function decrement(amount = 1) {
  return {
    type: DECREASE_ME,
    payload: amount,
  };
}

// export default function counterReducer(state = initialReducer, action: any) {
//   switch (action.type) {
//     case INCREASE_ME:
//       return {
//         ...state,
//         data: state.data + 1,
//         fullName: state.fullName + 1 + "+",
//       };

//     case DECREASE_ME:
//       return {
//         ...state,
//         data: state.data - 1,
//         fullName: state.fullName + 1 + "-",
//       };

//     default:
//       return state;
//   }
// }
export default function counterReducer(state = initialReducer, action: any) {
  switch (action.type) {
    case INCREASE_ME:
      return {
        ...state,
        data: state.data + action.payload,
      };

    case DECREASE_ME:
      return {
        ...state,
        data: state.data - action.payload,
      };

    default:
      return state;
  }
}
