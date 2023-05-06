import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Toolbar.module.css";

function Weather({ city }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=bb7d76519ca8447d86b50642231302&q=${city}&days=8&aqi=yes&alerts=yes`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
        setData(null);
      }
    }

    fetchData();
  }, [city]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.weatherlink}>
        <a
          href="https://weather.com/en-IN/weather/today/l/13.04,80.23?par=google"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.location.name}, {data.location.tz_id}
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-3">
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
          style={{ height: "3.3rem" }}
        />
        <div>
          <span style={{ color: "maroon" }}> {data.current.temp_c}°C</span> /{" "}
          {data.current.temp_f}°F
        </div>
      </div>
    </div>
  );
}

export default Weather;
