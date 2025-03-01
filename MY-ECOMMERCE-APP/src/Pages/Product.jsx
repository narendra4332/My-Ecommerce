import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Admin"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          gap: "30px",
          width: "100%",
          flexWrap: "Wrap",
        }}
      >
        {products.map((product) => (
          <div key={product.id}>
            <img
              style={{ width: "200px" }}
              src={product.ImageURL}
              alt={product.Name}
              className="product-image"
            />
            {/* <p>id:{product.id}</p> */}
            <p>Name:{product.Name}</p>
            {/* <p>Price: ${product.Price}</p> */}
            <button
              onClick={() => {
                addToCart(product);
                alert(`${product.Name} added to cart successfully!`);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Product;
