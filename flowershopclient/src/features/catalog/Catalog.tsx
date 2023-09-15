import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/stroe/configureStore";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxGroup from "../../app/components/CheckButtonGroup";
import CheckButtonGroup from "../../app/components/CheckButtonGroup";

// interface Props {
//   products: Product[];
//   addProduct: () => void;
// }

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((products) => setProducts(products))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  if (status.includes("pending"))
    return <LoadingComponent loadingMessage="Loading Products ... Wait!" />;
  // if (loading)
  //   return <LoadingComponent loadingMessage="Loading Products ... Wait!" />;

  //#region old
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/Products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // function addProducts() {
  //   setProducts((prevState) => [
  //     ...prevState,
  //     {
  //       id: prevState.length + 101,
  //       name: "p" + (prevState.length + 1),
  //       price: prevState.length * 100 + 100,
  //       brand: "some brand",
  //       description: "some descriptionn",
  //       pictureUrl: "http://picsum.photos/200",
  //       quantityInStock: 10,
  //     },
  //   ]);
  // }
  //#endregion

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          ></RadioButtonGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckButtonGroup
            items={brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
            checked={productParams.brands}
          ></CheckButtonGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckButtonGroup
            items={types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
            checked={productParams.types}
          ></CheckButtonGroup>

          {/* <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup> */}
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="initial">Diplay 1-6 ...... </Typography>
        <Pagination color="secondary" size="large" count={10} page={2} />
      </Box>
      {/* <Button variant="contained" onClick={addProduct}>Add Product</Button> */}
    </Grid>
  );
}
