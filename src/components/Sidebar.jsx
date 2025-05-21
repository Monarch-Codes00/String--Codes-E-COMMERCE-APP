import React, { useState, useEffect } from "react";
import { fetchCategories } from "../services/adminService";
import "./styles/Sidebar.css";

const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    getCategories();
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      <button className="menu-icon" onClick={toggleSidebar} aria-label="Toggle categories menu">
        &#9776;
      </button>
      {!collapsed && (
        <ul className="category-list">
          {error && <li className="error">{error}</li>}
          {categories.map((category) => (
            <li
              key={category._id}
              className="category-item"
              onClick={() => onSelectCategory(category.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelectCategory(category.name);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
