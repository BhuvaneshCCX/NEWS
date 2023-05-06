import React from "react";
import Link from "next/link";
import styles from "../styles/Feed.module.css";
import Image from "./image";

const NewsFeed = ({ articles, formattedDates, fontSize }) => {
  return (
    <>
      {articles &&
        articles.map((article, index) =>
          article.urlToImage ? (
            <div
              key={index}
              className={index % 2 === 0 ? styles.featuredPost : styles.post}
            >
              {index % 2 === 0 && (
                <div className={`${styles.featuredImage} row g-0`}>
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    height="25rem"
                    border="1px solid burlywood"
                  />
                </div>
              )}
              <div className="d-flex">
                {index % 2 !== 0 && (
                  <div className="col-5">
                    <Image src={article.urlToImage} alt={article.title} />
                  </div>
                )}
                <div
                  className={index % 2 === 0 ? "p-3 col-12" : "col-7 p-3"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid burlywood",
                  }}
                >
                  <div className="d-flex justify-content-between pb-2">
                    <div>{article.source.name}</div>
                    <div>{formattedDates[index]}</div>
                  </div>
                  <Link href={article.url}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#212529" }}
                    >
                      <h4 className="title" style={{ fontSize }}>
                        <b style={{ fontSize: "x-large" }}>{article.title}</b>
                      </h4>
                    </a>
                  </Link>
                  <p style={{ fontSize }}>{article.description}</p>
                  <div className="d-flex justify-content-between">
                    <Link href={article.url}>
                      <h4 className="title" style={{ fontSize }}>
                        <button className={styles.category}>Read More..</button>
                      </h4>
                    </Link>
                    {article.author && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        Author: {article.author}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
    </>
  );
};

export default NewsFeed;
