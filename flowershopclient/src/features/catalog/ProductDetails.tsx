import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((p) => p.productId == product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id && // if id is existed
      agent.Catalog.details(parseInt(id))
        .then((res) => setProducts(res)) // if the operation has got a successful result
        .catch((error) => console.log(error)) // => error.response => error > bucause of our axios interceptor setting otherwise : error.response
        .finally(() => setLoading(false));
  }, [id, item]);

  function handleQuantityChange(event: any) {
    //if (event.target.value === undefined || "NAN") return;
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  }
  function handleUpdateCart() {
    setSubmitting(true);

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then((basket) => setBasket(basket))
        .then(() => toast.success(`${updatedQuantity} item(s) added!`))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.deleteItem(product?.id!, updatedQuantity)
        .then(() => removeItem(product?.id!, updatedQuantity))
        .then(() => toast.success(`${updatedQuantity} item(s) removed!`))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  }

  //#region old
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/Products/${id}`)
  //     .then((res) => setProducts(res.data))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, [id]);
  //#endregion

  // if (loading) return <h3>Loading ... </h3>;
  if (loading)
    return <LoadingComponent loadingMessage="Loading Details ... Wait!" />;
  // if (!product) return <h3>Not Found ... </h3>;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid spacing={2} container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{ height: "55px" }}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleUpdateCart}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
