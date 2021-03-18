import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
import Data from "./Data";
import SearchIcon from "@material-ui/icons/Search";
import Cold from "./images/Cold.png";
import Hot from "./images/Hot.png";
import Clouds from "./images/Clouds.png";
import Arrow from "./images/Arrow.png";


function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);
  const time = new Date().toLocaleTimeString().slice(0, -6);
  const [image, setImage] = useState("");
  const degree = <sup>°C</sup>;
  const minTemp = <p>{weatherInfo?.main.temp_min} {degree}</p>
  const maxTemp = <p>{weatherInfo?.main.temp_max} {degree}</p>

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  
    useEffect(() => {
      determineImage();
    }, [weatherInfo]);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: inputRef.current.value || "Kolkata",
        units: "metric",
      },
      headers: {
        "x-rapidapi-key": "d15ad212bbmsh4631c0af8dd24dbp1448c0jsn3820b2585726",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setWeatherInfo(response.data);
      })
      .catch(() => {
        alert("Location not found");
      });
  };


    const determineImage = () => {
      if (weatherInfo?.weather[0].main === "Clouds") {
        setImage(Clouds);
      } else if (weatherInfo?.main.temp < 10) {
        setImage(Cold);
      } else if (weatherInfo?.main.temp >= 10) {
        setImage(Hot);
      }
    };

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__left">
          <form>
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for places ..."
            />
            <button
              className="app__left--button"
              onClick={fetchWeatherInfo}
              type="submit"
            >
              Show me the weather
            </button>
          </form>
          <img className="app__left--image" src={image} alt="weather image" />
          <p className="app__temp">
            {weatherInfo?.main.temp}
            {degree}
          </p>
          <h3 className="app__left--date">
            {weatherInfo && `${moment.unix(weatherInfo?.dt).format("dddd")}`},
            <span className="app__left--time"> {weatherInfo && time}</span>
          </h3>

          <hr className="app__left--line" />

          <p className="app__left--weather">{weatherInfo?.weather[0].main}</p>

          <p className="app__left--location">
            {weatherInfo?.name}, {weatherInfo?.sys?.country}
          </p>
        </div>

        <div className="app__right">
          <h1>Today's Highlights</h1>
          <div className="app__rightInfo">
            <Data
              title="Wind Status"
              stat1={`${weatherInfo?.wind?.speed} km/h`}
            />
            <Data
              title="Sunrise & Sunset"
              hasImage={true}
              stat1={moment.unix(weatherInfo?.sys?.sunrise).format("LT")}
              stat2={moment.unix(weatherInfo?.sys?.sunset).format("LT")}
              image={Arrow}
            />
            <Data
              title="Min & Max Temperature"
              hasImage={true}
              stat1={maxTemp}
              stat2={minTemp}
              image={Arrow}
            />
            <Data title="Humidity" stat1={`${weatherInfo?.main.humidity}`} />
            <Data title="Visibility" stat1={`${weatherInfo?.visibility} m`} />
            <Data title="Pressure" stat1={`${weatherInfo?.main.pressure}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
