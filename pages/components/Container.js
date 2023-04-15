import React from "react";
import data from "../cities.json";
import { useWeather } from "../context/WeatherContext";

function Container() {
  const { city, setCity, dailyData } = useWeather();

  const handleChange = (name) => {
    setCity(name);
  };

  const tempWeather = [0, 8, 16, 24, 32];
  const weekday = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const d = new Date();

  return (
    <div>
      <div>
        <select
          className="dropdown"
          onChange={(e) => handleChange(e.target.value)}
        >
          {data.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {tempWeather.map((item, i) => (
        <div className="card" key={i}>
          <div className="day">{weekday[d.getDay() + i]}</div>
          <br />
          <img
            className="icon"
            src={
              dailyData && dailyData.length > 0
                ? `http://openweathermap.org/img/wn/${dailyData[item].weather[0].icon}@2x.png`
                : ""
            }
            alt=""
          />
          <div className="temp">
            {dailyData &&
              dailyData.length > 0 &&
              Math.round(dailyData[item].main.temp_max)}{" "}
            C°{"         "}
            {dailyData &&
              dailyData.length > 0 &&
              Math.round(dailyData[item].main.temp_min)}{" "}
            C°
          </div>
        </div>
      ))}
    </div>
  );
}

export default Container;
