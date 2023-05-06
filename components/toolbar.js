import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Toolbar.module.css";
import { useState, useEffect } from "react";
import Category from "./category";
import Weather from "./weather";
import Quotes from "./quotes";

const categories = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

const Toolbar = () => {
  const router = useRouter();
  const [category, setCategory] = useState("general");

  useEffect(() => {
    router.replace("/feed/1");
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    const currentUrl = router.asPath;
    const currentQueryParams = router.query;
    const newQueryParams = { ...currentQueryParams, category: value };
    const newUrl = `${currentUrl.split("?")[0]}?${new URLSearchParams(
      newQueryParams
    )}`;
    router.push(newUrl);
  };

  return (
    <div
      className="head sticky-top bg-light p-2"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="d-flex">
        <div className="col-10">
          <div className="d-flex">
            <div className="col-4">
              <h4
                className="text-center"
                style={{
                  color: "whitesmoke",
                  backgroundColor: "black",
                  letterSpacing: "11px",
                  wordSpacing: "8px",
                }}
              >
                𝔹𝕌ℝℝ𝕆𝕎 ℕ𝔼𝕎𝕊
              </h4>
            </div>
            <div className="col-8 row d-none d-md-block">
              <Quotes />
            </div>
          </div>
          <div className="row gx-0">
            <div className="d-flex justify-content-between flex-wrap">
              {categories.map((c) => (
                <Category
                  key={c.value}
                  label={c.label}
                  value={c.value}
                  active={category === c.value}
                  onClick={handleCategoryChange}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="col-2 text-center d-none d-md-block"
          style={{ borderLeft: "1px solid wheat" }}
        >
          <Weather city="Coimbatore" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
