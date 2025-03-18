import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import "./Sidebar.css"; // ✅ Sidebar ka styling

const Sidebar = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // ✅ Firestore se unique categories fetch karna
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const uniqueCategories = new Set();

      querySnapshot.forEach((doc) => {
        const category = doc.data().category;
        if (category) {
          uniqueCategories.add(category);
        }
      });

      setCategories(["All", ...Array.from(uniqueCategories)]);
    };

    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() =>
              setSelectedCategory(category === "All" ? "" : category)
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
