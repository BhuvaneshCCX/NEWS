import Head from "next/head";
import { useRouter } from "next/router";
import Toolbar from "../../components/toolbar";
import styles from "../../styles/Feed.module.css";
import { useState, useEffect } from "react";
import Weather from "../../components/weather";
import axios from "axios";
import NewsFeed from "../../components/newsfeed";

export const Feed = ({ pageNumber, articles, category }) => {
  const router = useRouter();
  const [fontSize, setFontSize] = useState(16);
  const [formattedDates, setFormattedDates] = useState([]);
  const { slug } = router.query;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const fontSize = width < 780 ? 12 : width <= 1060 ? 16 : 20;
      setFontSize(fontSize);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (articles) {
      const formattedDates = articles.map((article) => {
        // console.log(article);
        // console.log(article.source);
        if (article.publishedAt) {
          const dateStr = article.publishedAt.slice(0, -1);
          const date = new Date(dateStr);
          const options = { month: "long", day: "numeric", year: "numeric" };
          return date.toLocaleDateString("en-US", options);
        }
        return "";
      });
      setFormattedDates(formattedDates);
    }
  }, [articles]);

  return (
    <div className="page-container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toolbar>
        <Weather city={slug} />
      </Toolbar>

      <div className={styles.feed}>
        <div className="container bg-light" style={{ paddingTop: "1.5rem" }}>
          <h1 style={{ color: "maroon" }}>
            <span className="text-dark">Top</span>&nbsp;
            {category &&
              category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
          </h1>
          <>
            <NewsFeed
              articles={articles}
              formattedDates={formattedDates}
              fontSize={fontSize}
              styles={styles}
            />
          </>

          <div className={styles.paginator}>
            <div
              onClick={() => {
                if (pageNumber > 1)
                  router.push(`/feed/${pageNumber - 1}?category=${category}`);
              }}
              className={pageNumber === 1 ? styles.disabled : styles.active}
            >
              Previous Page
            </div>

            <div>#{pageNumber}</div>

            <div
              onClick={() => {
                if (pageNumber < 5)
                  router.push(`/feed/${pageNumber + 1}?category=${category}`);
              }}
              className={pageNumber === 5 ? styles.disabled : styles.active}
            >
              Next Page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  const category = pageContext.query.category || "general";
  const apiKey = "8305f73a9576472690f3a4637e15c21e";

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: null,
        pageNumber: 1,
        category,
      },
    };
  }

  try {
    const apiResponse = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=8&page=${pageNumber}&&apiKey=${apiKey}`
    );

    const { data } = apiResponse;

    const { articles } = data;

    return {
      props: {
        articles: articles ? articles : null,
        pageNumber: Number.parseInt(pageNumber),
        category,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        articles: null,
        pageNumber: 1,
        category,
      },
    };
  }
};

export default Feed;
