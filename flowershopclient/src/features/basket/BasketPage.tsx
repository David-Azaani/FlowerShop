import React, { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  // [] means useeffect would runs once! not more!
  //  [id] means useeffect would runs once! or when is changed!
  // after each component page  we have to add it to route component

  if (loading)
    return <LoadingComponent loadingMessage="Loading basket ! wait ..." />;

  if (!basket)
    return <Typography variant="h3">Your Basket is Empty!</Typography>;

  return <div>Buyer Id = {basket.buyerId}</div>;
}
