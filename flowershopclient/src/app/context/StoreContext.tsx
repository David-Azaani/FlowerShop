//  the goal of this is we're going to effectively create a component that we can wrap around our application
//  and have the state available from anywhere in our app.

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreConetxt() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw Error("Oops -  we dont seem to be insde the provider");
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId == productId);

    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity; // remove item
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1); // check if it's quantity equals zero ,Remove
      setBasket((prevState) => {
        return { ...prevState!, items }; // (!) safty check!
      });
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider> // wrap this provider around our app to use this all over our app =>index.ts!
  );
}
