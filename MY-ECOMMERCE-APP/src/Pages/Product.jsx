import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import "./Product.css";

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [newProduct, setNewProduct] = useState({ Name: "", ImageURL: "" });

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userDoc = await getDocs(collection(db, "users"));
        const userData = userDoc.docs.find(
          (doc) => doc.id === auth.currentUser.uid
        );
        setRole(userData ? userData.data().role : "user");
      }
    };
    fetchUserRole();
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, []);

  // Add a new product (Admin Only)
  const handleAddProduct = async () => {
    if (role !== "admin") return;
    if (!newProduct.Name || !newProduct.ImageURL) {
      alert("Please enter product details!");
      return;
    }
    const docRef = await addDoc(collection(db, "Products"), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setNewProduct({ Name: "", ImageURL: "" });
  };

  // Edit product (Admin Only)
  const handleEditProduct = async (id, updatedName, updatedImageURL) => {
    if (role !== "admin") return;
    const productRef = doc(db, "Products", id);
    await updateDoc(productRef, {
      Name: updatedName,
      ImageURL: updatedImageURL,
    });

    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, Name: updatedName, ImageURL: updatedImageURL }
          : product
      )
    );
  };

  // Delete product (Admin Only)
  const handleDeleteProduct = async (id) => {
    if (role !== "admin") return;
    await deleteDoc(doc(db, "Products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container my-5 container1">
      <h1 className="text-center text-primary fw-bold">Products</h1>

      {/* Add Product Form (Only for Admins) */}
      {role === "admin" && (
        <div className="add-product-form p-4 mb-4 shadow-sm rounded">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            value={newProduct.Name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL"
            value={newProduct.ImageURL}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ImageURL: e.target.value })
            }
          />
          <button className="btn btn-success w-100" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card product-card shadow-sm">
              <img
                src={product.ImageURL}
                className="card-img-top"
                alt={product.Name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.Name}</h5>

                {/* Add to Cart Button for Users */}
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                {/* Admin Controls */}
                {role === "admin" && (
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        const newName = prompt("Enter new name", product.Name);
                        const newImageURL = prompt(
                          "Enter new image URL",
                          product.ImageURL
                        );
                        if (newName && newImageURL)
                          handleEditProduct(product.id, newName, newImageURL);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
