import { createSlice } from "@reduxjs/toolkit";

//1
export interface CounterState {
  data: number;
  fullName: string;
}

//2
const initialState: CounterState = {
  data: 999,
  fullName: "David Azani with Redux Toolkit",
};

//3
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
      
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});
//4
export const { increment, decrement } = counterSlice.actions;
