import { Grid, List } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/stroe/configureStore";
import ProductCardSkeleton from "./ProductCartSkeleton";
interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={6} sm={4} md={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
    // <List>
    //   {products.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </List>
  );
}
