import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

// interface Props {
//   products: Product[];
//   addProduct: () => void;
// }

export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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




  return (
    <>
     <ProductList products={products}/>
      {/* <Button variant="contained" onClick={addProduct}>Add Product</Button> */}
    </>
  );
}
