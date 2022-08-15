import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getForecast, getWeather } from "../api/api";
import { Header } from "../components/Header";
import { Spinner } from "../components/Spinner";
import { convertTemp } from "../utils/convertTemp";
import { converToWeekDay, convertTime } from "../utils/convertTime";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  state: {
    lat: number;
    lon: number;
    isSaved?: boolean;
  };
};

export const Weather = () => {
  const {
    state: { lat, lon, isSaved },
  } = useLocation() as Props;

  const [data, setData] = useState<{coord: { lon: number; lat: number }}[] | null>(null);

  const [forecast, setForecast] = useState<{
    daily: {}[];
    hourly: {}[];
  } | null>();
  console.log(forecast)

  // save weather to local storage
  const [saveWeather, setSaveWeather] = useState(() => {
    const weather = localStorage.getItem("weather");
    return weather ? JSON.parse(weather) : [];
  });

  useEffect(() => {
    if (lat && lon) {
      getWeather(lat, lon).then((city) => setData([city]));
      getForecast(lat, lon).then((forecastData) => setForecast(forecastData));
    } else {
      setData(null);
    }
  }, []);

  const saveData = () => {
    const weather = localStorage.getItem("weather");
    if (weather) {
      const weatherData = JSON.parse(weather);
      weatherData.push(data![0]);
      localStorage.setItem("weather", JSON.stringify(weatherData));
    } else {
      localStorage.setItem("weather", JSON.stringify([data![0]]));
    }
    setSaveWeather([...saveWeather, data![0]]);
  };

  const removeWeather = () => {
    const weather = localStorage.getItem("weather");
    if (weather) {
      const weatherData = JSON.parse(weather);
      const newWeather = weatherData.filter((item: any) => {
        return item.coord.lon !== lon || item.coord.lat !== lat;
      });
      localStorage.setItem("weather", JSON.stringify(newWeather));
    }
    setSaveWeather(
      saveWeather.filter((item: any) => {
        return item.coord.lon !== lon || item.coord.lat !== lat;
      })
    );

    // return to '/' page
    window.location.href = "/";
  };

  const isTheSame = data?.[0]?.coord.lon === lon && data?.[0].coord.lat === lat;

  return (
    <section className="bg-weather-primary min-h-screen">
      <div className="header__page mb-14">
        <Header saveData={saveData} isTheSame={isTheSame} />
        {isTheSame ? null : (
          <p className="text-center bg-weather-secondary text-white p-2">
            You are currently previewing this city, click the '+' icon to start
            tracking this city.
          </p>
        )}

        {isSaved && <div className="top-[1.7rem] right-[22rem] absolute text-red-400 cursor-pointer" onClick={removeWeather}>
          <FontAwesomeIcon icon={faTrash} />
        </div>}
      </div>

      {/* Header Weather */}
      <div className="content container">
        {data &&
          data.map((val: any, index: number) => {
            return (
              <div className="city__weather" key={index}>
                <div className="city__header text-white text-center">
                  <h2 className="text-[1.7rem] font-bold tracking-wider">
                    {val.name}
                  </h2>
                  <p className="text-sm">{`${new Date().toDateString()} ${new Date(
                    val.dt * 1000
                  ).toLocaleTimeString()}`}</p>

                  <p className="text-[3rem]">{`${
                    convertTemp(val.main.temp).kelvinToCelcius
                  }° C / ${
                    convertTemp(val.main.temp).celciusToFahrenheit
                  }° F`}</p>

                  <div className="text-center flex flex-col items-center">
                    <p>{`Feels like ${
                      convertTemp(val.main.feels_like).kelvinToCelcius
                    }° C`}</p>
                    <p>{val.weather[0].description}</p>
                    <img
                      className="w-[80px] h-[80px]"
                      src={`http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`}
                      alt={val.weather[0].description}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Hourly Forecast */}
      {forecast ? (
        <>
          <hr />
          <div className="flex flex-col text-white container py-6 px-2">
            <p className="text-left mb-3">Hourly Forecast</p>
            <div className="flex flex-wrap items-center gap-3 justify-between">
              {forecast?.hourly.splice(0, 7).map((val: any, index: number) => {
                return (
                  <div className="flex flex-col gap-5 items-center" key={index}>
                    <p>{convertTime(val.dt)}</p>
                    <img
                      className="w-[50px] h-[50px]"
                      src={`http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`}
                      alt={val.weather[0].description}
                    />
                    <p>{`${convertTemp(val.temp).fahrenheitToCelcius}° C`}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
        </>
      ) : (
        <Spinner />
      )}

      {/* <!-- Weekly Weather --> */}
      {forecast && (
        <div className="container text-white py-6 px-2">
          <p className="mb-4">7 Days Forecast</p>
          {forecast?.daily.slice(0, 7).map((val: any, index: number) => {
            return (
              <div key={index} className="flex items-center justify-between">
                <p>{converToWeekDay(val.dt)}</p>
                <img
                  className="w-[50px] h-[50px]"
                  src={`http://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`}
                  alt=""
                />
                <div className="flex gap-2">
                  <p>H: {convertTemp(val.temp.max).fahrenheitToCelcius} ° C</p>
                  <p>L: {convertTemp(val.temp.min).fahrenheitToCelcius} ° C</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
