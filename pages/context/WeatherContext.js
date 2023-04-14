import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import data from "../cities.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState();
  const [city, setCity] = useState("Adana");
  const [cityLat, setCityLat] = useState(data[0].latitude);
  const [cityLon, setCityLon] = useState(data[0].longitude);

  const url = "https://api.openweathermap.org/data/2.5/forecast?";
  const key = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    data.map((item) =>
      city === item.name
        ? setCityLat(item.latitude) & setCityLon(item.longitude)
        : item
    );
  }, [city]);

  useEffect(() => {
    setDailyData(
      axios(
        `${url}lat=${cityLat}&lon=${cityLon}&appid=${key}&units=metric`
      ).then((res) => setDailyData(res.data.list))
    );
  }, [cityLat]);

  const values = { city, setCity, dailyData, setDailyData };
  console.log(dailyData);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
