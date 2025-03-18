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
import Sidebar from "./Sidebar"; // ✅ Import Sidebar

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [newProduct, setNewProduct] = useState({
    Name: "",
    ImageFile: null,
    ImageURL: "",
    category: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userQuery = query(
          collection(db, "users"),
          where("__name__", "==", auth.currentUser.uid)
        );
        const userDoc = await getDocs(userQuery);
        if (!userDoc.empty) {
          setRole(userDoc.docs[0].data().role);
        }
      }
    };
    fetchUserRole();
  }, []);

  // ✅ Fetch Products (Filtered by Category)
  useEffect(() => {
    const fetchProducts = async () => {
      let productRef = collection(db, "Products");
      let productQuery = selectedCategory
        ? query(productRef, where("category", "==", selectedCategory))
        : productRef;

      const querySnapshot = await getDocs(productQuery);
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
            ImageFile: file,
            ImageURL: reader.result,
          }));
        } else {
          setNewProduct((prev) => ({
            ...prev,
            ImageFile: file,
            ImageURL: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Add Product
  const handleAddProduct = async () => {
    if (
      role !== "admin" ||
      !newProduct.Name ||
      !newProduct.ImageURL ||
      !newProduct.category
    )
      return;

    const docRef = await addDoc(collection(db, "Products"), {
      Name: newProduct.Name,
      ImageURL: newProduct.ImageURL,
      category: newProduct.category,
    });

    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setNewProduct({ Name: "", ImageFile: null, ImageURL: "", category: "" });
  };

  // ✅ Edit Product
  const handleEditProduct = async () => {
    if (!editingProduct || role !== "admin") return;
    const productRef = doc(db, "Products", editingProduct.id);
    await updateDoc(productRef, {
      Name: editingProduct.Name,
      ImageURL: editingProduct.ImageURL,
      category: editingProduct.category,
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct } : p))
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
    <div className=" my-5 container1">
      {/* ✅ Sidebar and Product List container */}
      <div className="product-container">
        {/* ✅ Sidebar - By default left me hoga, responsive hone par top pe chala jayega */}
        <Sidebar setSelectedCategory={setSelectedCategory} />

        {/* ✅ Products List */}
        <div className="product-list">
          <h1 className="text-center fw-bold">Products</h1>
          {/* ✅ Admin Only: Add Product Form */}
          {role === "admin" && (
            <div className="add-product-form p-4 mb-2 shadow-sm rounded">
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
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
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
                  alt="Product"
                />
              )}
              <button
                className="btn btn-success w-100"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          )}

          {/* ✅ Product Cards */}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-6 col-lg-4 mb-4 " key={product.id}>
                {/* ✅ Change col-lg-3 to col-lg-4 */}
                <div className="card product-card shadow-sm">
                  <img
                    src={product.ImageURL}
                    className="card-img-top"
                    alt={product.Name}
                  />
                  <div className="card-body text-center">
                    {editingProduct?.id === product.id ? (
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
                          type="text"
                          className="form-control mb-2"
                          placeholder="Name"
                          value={editingProduct.category}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              category: e.target.value,
                            })
                          }
                        />
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleEditProduct}
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
                        <p className="text-muted">{product.category}</p>
                        <button
                          className="btn-style"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                        {role === "admin" && (
                          <div className="d-flex justify-content-between">
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
      </div>
    </div>
  );
}

export default Product;
