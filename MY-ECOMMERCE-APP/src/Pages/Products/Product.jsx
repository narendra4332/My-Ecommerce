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
import Sidebar from "./Sidebar"; // ✅ Sidebar ko import kiya
import "./Style/Product.css";
import "./Style/common.css";

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [selectedCategory, setSelectedCategory] = useState(""); // ✅ Selected category track karna
  const [newProduct, setNewProduct] = useState({
    Name: "",
    Category: "",
    ImageFile: null,
    ImageURL: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search ke liye state
  const [sortOrder, setSortOrder] = useState("asc"); // ✅ Sorting ke liye state
  const productsPerPage = 6;

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
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData); // ✅ Initially sabhi products dikhayenge
    };
    fetchProducts();
  }, []);

  // ✅ Category ke hisaab se products filter karna
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.Category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleAddProduct = async () => {
    if (role !== "admin" || !newProduct.Name || !newProduct.ImageURL) return;
    try {
      const docRef = await addDoc(collection(db, "Products"), {
        Name: newProduct.Name,
        Category: newProduct.Category, // ✅ Category add ki
        ImageURL: newProduct.ImageURL,
      });
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setNewProduct({ Name: "", Category: "", ImageFile: null, ImageURL: "" });
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

  useEffect(() => {
    let tempProducts = products;

    // ✅ Category Filter
    if (selectedCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.Category === selectedCategory
      );
    }

    // ✅ Search Filter
    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ✅ Sorting (A-Z)
    tempProducts.sort((a, b) =>
      sortOrder === "asc"
        ? a.Name.localeCompare(b.Name)
        : b.Name.localeCompare(a.Name)
    );

    setFilteredProducts(tempProducts);
  }, [selectedCategory, searchTerm, sortOrder, products]);

  // ✅ Sorting Toggle Function
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="my-5 container1">
      <div className="product-container">
        <Sidebar setSelectedCategory={setSelectedCategory} />
        {/* ✅ Sidebar ko yaha add kiya */}
        <div className="product-list">
          <h1 className="text-center fw-bold">
            <i className="bi bi-cart-check me-2"></i>Products
            <i className="bi bi-check-circle ms-2"></i>
          </h1>
          {/* ✅ Search Bar & Sort Button */}
          {/* ✅ Search Bar & Sort Button (Responsive) */}
          <div className="search-sort-container">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="sort-btn" onClick={toggleSortOrder}>
              {sortOrder === "asc" ? "Sort A-Z ⬆️" : "Sort Z-A ⬇️"}
            </button>
          </div>

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
            totalProducts={filteredProducts.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
