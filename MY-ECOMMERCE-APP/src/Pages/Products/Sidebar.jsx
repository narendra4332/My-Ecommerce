import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Style/Sidebar.css";

const Sidebar = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // 🔹 Default Categories
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
        const categoryRef = collection(db, "categories");
        const querySnapshot = await getDocs(categoryRef);

        const fetchedCategories = querySnapshot.docs.map(
          (doc) => doc.data().name
        );

        // 🔹 Default + Firestore Categories Combine (Unique Values)
        const uniqueCategories = [
          ...new Set([...defaultCategories, ...fetchedCategories]),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <ul>
        <li onClick={() => setSelectedCategory("")}>All Products</li>
        {categories.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
