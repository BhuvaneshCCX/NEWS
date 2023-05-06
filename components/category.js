import React from "react";
import styles from "../styles/Toolbar.module.css";

const Category = ({ label, value, active, onClick }) => {
  const buttonClasses = `${styles.category} ${active ? styles.maroon : ""}`;

  return (
    <button className={buttonClasses} onClick={() => onClick(value)}>
      <h6>{label}</h6>
    </button>
  );
};
export default Category;
