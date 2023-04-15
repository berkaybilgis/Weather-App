import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import data from "../cities.json";

const WeatherContext = createContext(); // Context yapısı oluşturuldu

// Propları dağıtacak olan Provider yapısı oluşturuldu
export const WeatherProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState(); // apidan gelen verilerin tutulduğu state
  const [city, setCity] = useState("Adana"); // dropdowndan gelen şehir verisinin tutulduğu state
  const [cityLat, setCityLat] = useState(data[0].latitude); // json dosyasından gelen latitude verisinin tutulduğu state
  const [cityLon, setCityLon] = useState(data[0].longitude); // json dosyasından gelen longitude verisinin tutulduğu state

  const url = "https://api.openweathermap.org/data/2.5/forecast?"; // api url
  const key = process.env.NEXT_PUBLIC_API_KEY; // api şifresi .env dosyasından çekildi

  // city değeri her değiştiğinde yeni Lat ve Lon verileri çekilir
  useEffect(() => {
    data.map((item) =>
      city === item.name // alınan şehir değeri datanın içindeki değerle eşleşirse statelere lat ve Lon atanır
        ? setCityLat(item.latitude) & setCityLon(item.longitude)
        : item
    );
  }, [city]);

  // cityLat değer her değiştiğinde apidan veri çekilir
  useEffect(() => {
    // çekilen veri dailyData statetinde tutulur
    setDailyData(
      axios(
        `${url}lat=${cityLat}&lon=${cityLon}&appid=${key}&units=metric`
      ).then((res) => setDailyData(res.data.list))
    );
  }, [cityLat]);

  // Provider ile göndermek istediğimiz proplar values verisi altında toplandı
  const values = { city, setCity, dailyData, setDailyData };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider> // Bütün children componentlarına values verisi gönderildi
  );
};

export const useWeather = () => useContext(WeatherContext); // kolaylık açısından context useWeather adı altında bir state'e aktarıldı
