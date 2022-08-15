import { Link } from "react-router-dom";
import { BaseInput } from "./BaseInput";

type searchProps = {
  setSearch: (value: string) => void;
  data: [] | null;
  search: string;
};

export const Search = ({ setSearch, data, search }: searchProps) => {
  return (
    <div className="content container px-2 mb-5">
      <form>
        <BaseInput
          className="w-full p-2 px-3 rounded bg-transparent border-b outline-none text-white mt-5"
          placeholder={"Search for a city or state"}
          type={"search"}
          handleChange={setSearch}
        />
      </form>

      <div className="results mb-5">
        {data &&
          search &&
          data.map((val: any, index) => {
            return (
              <div
                className="result bg-weather-secondary p-2 text-white"
                key={index}
              >
                <Link
                  state={{ lat: val.lat, lon: val.lon, id: val.id }}
                  to={`/${val.name}`}
                >
                  <div className="result__name flex items-center justify-between cursor-pointer border-b border-b-gray-300">
                    <p>{val.name}</p>
                    <p>{val.country}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};
