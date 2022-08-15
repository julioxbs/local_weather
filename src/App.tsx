import { useEffect, useState } from "react";
import { searchCity } from "./api/api";
import { Header } from "./components/Header";
import { SavedWeather } from "./components/SavedWeather";
import { Search } from "./components/Search";

export const App = () => {
  const [data, setData] = useState<[] | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search.length != 0) {
      searchCity(search).then(data => setData(data));
    }
  }, [search]);

  return (
    <main className="bg-weather-primary">
      <Header />
      <Search setSearch={setSearch} search={search} data={data} />
      <SavedWeather />
    </main>
  )
}
