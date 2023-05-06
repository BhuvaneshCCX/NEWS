import { useState, useEffect } from "react";
import axios from "axios";

function Quotes() {
  const [quoteData, setQuoteData] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await axios.get("https://type.fit/api/quotes");
        setQuoteData(response.data);
      } catch (error) {
        console.error(error);
        setQuoteData(null);
      }
    }

    fetchQuotes();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quoteData.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [quoteData]);

  if (!quoteData) {
    return <div>Loading...</div>;
  }

  const { text, author } = quoteData[index];

  return (
    <div className="d-flex justify-content-evenly">
      <div style={{ color: "maroon" }}>{text}</div>
      <div className="text-end">- {author}</div>
    </div>
  );
}

export default Quotes;
