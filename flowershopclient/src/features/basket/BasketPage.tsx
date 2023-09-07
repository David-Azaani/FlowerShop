// import React, { useEffect, useState } from "react";
// import { Basket } from "../../app/models/basket";
// import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { error } from "console";
import { LoadingButton } from "@mui/lab";

export default function BasketPage() {
  const { basket, removeItem, setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  function handleRemoveItem(productId: number, quantity: number = 1) {
    setLoading(true);
    agent.Basket.deleteItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  //#region  // these code were commented after useing store provide because we loaded the basket at initilizztion app and we dont need this anymore!
  // const [loading, setLoading] = useState(true);
  // const [basket, setBasket] = useState<Basket | null>(null);

  // useEffect(() => {
  //   agent.Basket.get()
  //     .then((basket) => setBasket(basket))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);
  // // [] means useeffect would runs once! not more!
  // //  [id] means useeffect would runs once! or when is changed!
  // // after each component page  we have to add it to route component

  // if (loading)
  //   return <LoadingComponent loadingMessage="Loading basket ! wait ..." />;
  //#endregion

  if (!basket)
    return <Typography variant="h3">Your Basket is Empty!</Typography>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span> {item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  $ {(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={loading}
                    color="error"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={loading}
                    color="secondary"
                    onClick={() => handleAddItem(item.productId)}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  $ {((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={loading}
                    color="error"
                    onClick={() =>
                      handleRemoveItem(item.productId, item.quantity)
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
