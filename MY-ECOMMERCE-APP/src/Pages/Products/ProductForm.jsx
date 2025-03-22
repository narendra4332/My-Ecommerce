import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Style/addProductForm.css";

function ProductForm({ newProduct, setNewProduct, handleAddProduct }) {
  const [categories, setCategories] = useState([]);

  // 🔹 Default Categories (Agar Firestore Me Data Na Ho)
  const defaultCategories = [
    "Converters",
    "FRC Cable Assembly",
    "Heat Shirink Sleever",
    "Heavy Duity Connecttors",
    "Interface Cables",
    "IO Connectors",
    "M-8-12-16 Series Connectors",
    "Mil Grade Connectors",
    "Mini-Din Connectors",
    "Programming Cables",
    "Servo Cable Assemblies",
    "Terminal Blocks",
    "UL Shielded Cables",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRef = collection(db, "categories"); // ✅ Ensure lowercase 'categories'
        const querySnapshot = await getDocs(categoryRef);

        const fetchedCategories = querySnapshot.docs.map(
          (doc) => doc.data().name
        );

        // 🔹 Default + Firestore Categories Merge Karke Unique List Banayein
        setCategories([
          ...new Set([...defaultCategories, ...fetchedCategories]),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="add-product-form p-4 mb-2 shadow-sm rounded">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Product Name"
        value={newProduct.Name}
        onChange={(e) => setNewProduct({ ...newProduct, Name: e.target.value })}
      />

      {/* ✅ Category Dropdown (Firestore + Default Categories) */}
      <select
        className="form-control mb-2"
        value={newProduct.Category || ""}
        onChange={(e) =>
          setNewProduct({ ...newProduct, Category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="file"
        className="form-control mb-2"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setNewProduct({
                ...newProduct,
                ImageFile: file,
                ImageURL: reader.result, // ✅ Store Base64 Image
              });
            };
            reader.readAsDataURL(file); // ✅ Convert Image to Base64
          }
        }}
      />

      {newProduct.ImageURL && (
        <img
          src={newProduct.ImageURL}
          className="img-thumbnail mb-2"
          style={{ maxWidth: "150px" }}
          alt="Product"
        />
      )}

      <button className="btn btn-success w-100" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
}

export default ProductForm;
