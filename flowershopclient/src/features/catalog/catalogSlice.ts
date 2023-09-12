import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async () => {
    try {
      return await agent.Catalog.list();
    } catch (error) {
      console.log(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState({
    productsLoaded: false,
      status: "idle",
    
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
     
      state.status = "idle";
    
    });
  },
});
