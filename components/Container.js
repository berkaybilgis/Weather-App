import React from "react";
import data from "../cities.json";
import { useWeather } from "../context/WeatherContext";

function Container() {
  const { setCity, dailyData } = useWeather(); // useWeather kullanılarak istenilen proplar alındı

  // dropdownda oluşan her değişim işleminde gelen şehri state'e alır
  const handleChange = (name) => {
    setCity(name);
  };

  const tempWeather = [0, 8, 16, 24, 32]; // apidan gelen veriye göre günleri belirleyen array numaraları

  // günleri içeren array
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

  // anlık tarih bilgisi alındı
  const d = new Date();

  return (
    <div>
      <div>
        {/* şehir seçimi için dropdown oluşturuldu */}
        <select
          className="dropdown"
          onChange={(e) => handleChange(e.target.value)}
        >
          {/* json dosyasından şehir isimleri map edilerek alındı */}
          {data.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/* dailyDatadan gelen veriler tempWeatherdaki array sırasına göre alındı */}
      {tempWeather.map((item, i) => (
        <div className="card" key={i}>
          {/*gün gösteren bölüm oluşturuldu*/}
          <div className="day">{weekday[d.getDay() + i]}</div> <br />
          {/* apidan gelen icon verileri çekildi */}
          <img
            className="icon"
            src={
              dailyData && dailyData.length > 0
                ? `http://openweathermap.org/img/wn/${dailyData[item].weather[0].icon}@2x.png`
                : ""
            }
            alt=""
          />
          {/* maksimum ve minimum sıcaklık değerleri dailyData statetinden çekildi */}
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
