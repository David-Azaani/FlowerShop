import { stat } from "fs";

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/stroe/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
}
const productAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.brands)
    params.append("brands", productParams.brands.toString());
  if (productParams.types)
    params.append("types", productParams.types.toString());

  return params;
}
// important topic is here!
// we access to the state in thunkAPI and as our params are in the state we can get and pass it from thunkAPI to the getAxiosParams.
export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void, // be cause of our returning of our func!
  { state: RootState } // our state and it's source! we have to specify these 2 to get proper result from  thunkAPI.getState().catalog.productParams
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  // if somewhere we need to pass an param as second param we can do this!
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);

  try {
    return await agent.Catalog.list(params);
  } catch (error: any) {
    //console.log(error);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});
//1*

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (producteId, thunkAPI) => {
    try {
      return await agent.Catalog.details(producteId);
    } catch (error: any) {
      //console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    orderBy: "name",
    pageNumber: 1,
    pageSize: 6,
  };
}

//2*
export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    status: "idle",
    filtersLoaded: false,
    brands: [],
    types: [],
    productParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action);
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action);
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendigFetchingFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brnads; // intetionaly mistake on brands spelling!!
      state.types = action.payload.types;
      state.status = "idle";
      state.filtersLoaded = true;
      //console.log(action.payload);
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idleFetchingFilters";
      console.log(action.payload);
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setProductParams, resetProductParams } = catalogSlice.actions;
