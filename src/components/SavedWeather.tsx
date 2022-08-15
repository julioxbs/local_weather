import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertTemp } from "../utils/convertTemp";

export const SavedWeather = () => {
  const [savedWeather, setSavedWeather] = useState<{
    coord: { lon: number; lat: number };
    name: string;
    main: { temp: number; feels_like: number, temp_min: number, temp_max: number };
    sys: { country: string };
  }[]>();
  
  useEffect(() => {
    const getItems = localStorage.getItem("weather");
    if (getItems) {
      setSavedWeather(JSON.parse(getItems));
    }
  }, []);

  return (
    <div className="container px-2">
      {savedWeather ? (
        savedWeather.map((val, index: number) => {
          return (
            <Link
              state={{ lat: val.coord.lat, lon: val.coord.lon, isSaved: true }}
              to={`/${val.name}`}
              key={index}
            >
              <div
                key={index}
                className="flex items-center justify-between text-white mb-3 bg-weather-secondary px-2 py-4 rounded shadow-sm cursor-pointer relative"
              >
                <div className="nameAndcountry">
                  <h1 className="text-xl">{val.name}</h1>
                  <h3>{val.sys.country}</h3>
                </div>

                <div className="flex flex-col items-center mt-5">
                  <p className="text-xl">
                    {convertTemp(val.main.temp).kelvinToCelcius} ° C
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-sm">
                      H {convertTemp(val.main.temp_max).kelvinToCelcius} ° C
                    </p>
                    <p className="text-sm">
                      L {convertTemp(val.main.temp_min).kelvinToCelcius} ° C
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-white mt-5 text-center">
          No location added. To start tracking a location, search in the field
          above
        </p>
      )}
    </div>
  );
};
