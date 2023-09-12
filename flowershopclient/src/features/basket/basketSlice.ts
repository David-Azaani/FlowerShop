import { Product } from "./../../app/models/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "./../../app/models/basket";
import agent from "../../app/api/agent";
interface BasketState {
  basket: Basket | null;
  status: string;
  loading: boolean;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
  loading: false,
};
//                                           our returning obj
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",

  async ({ productId, quantity = 1 }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
      state.loading = true;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      console.log(action);
      state.status = "idle";
      state.basket = action.payload; // payload are basket because we specifed at first => linb 18
      state.loading = false;
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
      state.loading = false;
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
