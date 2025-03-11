import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import "./Product.css";

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [newProduct, setNewProduct] = useState({
    Name: "",
    ImageURL: "",
    Category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingProduct, setEditingProduct] = useState(null); // Store product being edited

  // ✅ Fetch user role correctly
  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userDoc = await getDocs(
          query(
            collection(db, "users"),
            where("__name__", "==", auth.currentUser.uid)
          )
        );
        if (!userDoc.empty) {
          setRole(userDoc.docs[0].data().role);
        } else {
          setRole("user");
        }
      }
    };
    fetchUserRole();
  }, []);

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      let queryRef = collection(db, "Products");
      if (selectedCategory !== "All") {
        queryRef = query(queryRef, where("Category", "==", selectedCategory));
      }
      const querySnapshot = await getDocs(queryRef);
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, [selectedCategory]);

  // ✅ Convert image to Base64 and store in Firestore
  const handleImageUpload = (event, isEdit = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit && editingProduct) {
          setEditingProduct((prev) => ({
            ...prev,
            ImageURL: reader.result,
          }));
        } else {
          setNewProduct((prev) => ({
            ...prev,
            ImageURL: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Add Product (With Base64 Image)
  const handleAddProduct = async () => {
    if (
      role !== "admin" ||
      !newProduct.Name ||
      !newProduct.ImageURL ||
      !newProduct.Category
    )
      return;

    const docRef = await addDoc(collection(db, "Products"), {
      Name: newProduct.Name,
      ImageURL: newProduct.ImageURL, // Base64 Data
      Category: newProduct.Category,
    });

    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setNewProduct({ Name: "", ImageURL: "", Category: "" });
  };

  // ✅ Edit Product (Update Base64 Image)
  const handleEditProduct = async () => {
    if (!editingProduct || role !== "admin") return;

    const productRef = doc(db, "Products", editingProduct.id);
    await updateDoc(productRef, {
      Name: editingProduct.Name,
      ImageURL: editingProduct.ImageURL,
      Category: editingProduct.Category,
    });

    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct } : p
      )
    );
    setEditingProduct(null);
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (id) => {
    if (role !== "admin") return;
    await deleteDoc(doc(db, "Products", id));
    setProducts(products.filter((product) => product.id !== id));
  };
  return (
    <>
      <div className="container my-5 container1">
        {/* <h1 className="text-center fw-bold">Products</h1> */}
        {/* Sidebar */}
        <div>
          <div className="sidebar">
            {/* <h4>Categories</h4> */}
            <button onClick={() => setSelectedCategory("All")}>All</button>
            <button onClick={() => setSelectedCategory("Converters")}>
              Converters
            </button>
            <button onClick={() => setSelectedCategory("Cables")}>
              Cables
            </button>
            <button onClick={() => setSelectedCategory("Connectors")}>
              Connectors
            </button>
          </div>
        </div>

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
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newProduct.ImageURL && (
              <img
                src={newProduct.ImageURL}
                className="img-thumbnail mb-2"
                style={{ maxWidth: "150px" }}
              />
            )}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Catagry Name"
              value={newProduct.Category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, Category: e.target.value })
              }
            />
            <button
              className="btn btn-success w-100"
              onClick={handleAddProduct}
            >
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
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editingProduct.Name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            Name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="file"
                        className="form-control mb-2"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                      />
                      {editingProduct.ImageURL && (
                        <img
                          src={editingProduct.ImageURL}
                          className="img-thumbnail mb-2"
                          style={{ maxWidth: "100px" }}
                        />
                      )}
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingProduct(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{product.Name}</h5>
                      <button
                        className="btn-style"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      {role === "admin" && (
                        <div className="edit-btn delet-btn">
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => setEditingProduct(product)}
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
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
