import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../Firebase";
import Pagination from "../Products/Pagination";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./Style/Product.css";
import "./Style/common.css";

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [newProduct, setNewProduct] = useState({
    Name: "",
    ImageFile: null,
    ImageURL: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userQuery = collection(db, "users");
        const userDocs = await getDocs(userQuery);
        const userData = userDocs.docs.find(
          (doc) => doc.id === auth.currentUser.uid
        );
        if (userData) setRole(userData.data().role);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productRef = collection(db, "Products");
      const querySnapshot = await getDocs(productRef);
      setProducts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (role !== "admin" || !newProduct.Name || !newProduct.ImageURL) return;
    try {
      const docRef = await addDoc(collection(db, "Products"), {
        Name: newProduct.Name,
        ImageURL: newProduct.ImageURL,
      });
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setNewProduct({ Name: "", ImageFile: null, ImageURL: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct || role !== "admin") return;
    const productRef = doc(db, "Products", editingProduct.id);
    await updateDoc(productRef, editingProduct);
    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct } : p
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    if (role !== "admin") return;
    await deleteDoc(doc(db, "Products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="my-5 container1">
      <div className="product-list">
        <h1 className="text-center fw-bold">🛍️ Products ✨</h1>
        {role === "admin" && (
          <ProductForm
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddProduct={handleAddProduct}
          />
        )}
        <ProductList
          products={currentProducts}
          role={role}
          addToCart={addToCart}
          handleDeleteProduct={handleDeleteProduct}
          setEditingProduct={setEditingProduct}
          editingProduct={editingProduct}
          handleEditProduct={handleEditProduct}
        />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Product;
