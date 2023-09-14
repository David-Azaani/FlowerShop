import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/stroe/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();
  const debounceSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <>
      <TextField
        label="Search products"
        variant="outlined"
        value={searchTerm || ""} // || '' means alternative value!
        fullWidth
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debounceSearch(event);
        }}
      />

      {/* TextField : infact it's a wrapper around html tag */}
    </>
  );
}
