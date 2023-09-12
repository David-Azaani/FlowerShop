import { Product } from "./../../app/models/Product";
import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "./../../app/models/basket";
interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      // state here refer to our initialstate and ourinterfaceProp
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId == productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;

      //state.basket?.items[itemIndex].quantity -= quantity;

      state.basket!.items[itemIndex].quantity -= quantity; //(!) means hey typeScript i am developer and i know what i am doing,
      // dont worry i check that obj before using ! : override typeScript checking!
      if (
        state.basket?.items[itemIndex].quantity === -1 ||
        state.basket?.items[itemIndex].quantity === 0
      )
        state.basket.items.splice(itemIndex, 1);
    },
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
