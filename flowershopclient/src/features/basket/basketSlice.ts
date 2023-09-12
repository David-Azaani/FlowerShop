import { Product } from "./../../app/models/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "./../../app/models/basket";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { act } from "@testing-library/react";
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

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity }) => {
  // as we dont need name in logic we dont use it here
  try {
    await agent.Basket.deleteItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      // state here refer to our initialstate and ourinterfaceProp
      state.basket = action.payload;
    },
    // removeItem: (state, action) => {
    //   const { productId, quantity } = action.payload;
    //   const itemIndex = state.basket?.items.findIndex(
    //     (i) => i.productId == productId
    //   );
    //   if (itemIndex === -1 || itemIndex === undefined) return;

    //   //state.basket?.items[itemIndex].quantity -= quantity;

    //   state.basket!.items[itemIndex].quantity -= quantity; //(!) means hey typeScript i am developer and i know what i am doing,
    //   // dont worry i check that obj before using ! : override typeScript checking!
    //   if (
    //     state.basket?.items[itemIndex].quantity === -1 ||
    //     state.basket?.items[itemIndex].quantity === 0
    //   )
    //     state.basket.items.splice(itemIndex, 1);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
      state.loading = true;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      toast.success("Item added!");
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

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status =
        "pendingRmoveItem" + action.meta.arg.productId + action.meta.arg.name;
      state.loading = true;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId == productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (
        state.basket?.items[itemIndex].quantity === -1 ||
        state.basket?.items[itemIndex].quantity === 0
      )
        state.basket.items.splice(itemIndex, 1);

      toast.success("Item removed!");
      console.log(action);
      state.status = "idle";
      state.loading = true;
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      toast.error("Error occured");
      console.log(action);
      state.status = "idle";
      state.loading = true;
    });
  },
});

// export const { setBasket, removeItem } = basketSlice.actions;
export const { setBasket } = basketSlice.actions;
