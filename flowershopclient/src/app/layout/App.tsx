import { useEffect, useState } from "react";
import { product } from "../models/product";

function App() {
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function addProducts() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "p" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "some descriptionn",
        pictureUrl: "aaaaa",
        quantityInStock: 10,
      },
    ]);
  }

  return (
    <div>
      <h1>FlowerShop</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h1>
              {product.name} : {product.price}
            </h1>
          </li>
        ))}
      </ul>
      <button onClick={addProducts}>Add Product</button>
    </div>
  );
}

export default App;
