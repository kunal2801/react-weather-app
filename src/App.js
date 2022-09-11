import React, { useEffect, useState } from "react";
import "./App.css";
import Topbtns from "./components/Topbtns";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "Current location";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };
  return (
    <div
      className={`max-w-full sm:max-w-screen-sm mt-2 py-2 px-3 mx-auto md:max-w-screen-md md:mt-4 md:py-5 md:px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()} `}
    >
      <Topbtns setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />

          <Forecast title="Hourly forecast" items={weather.hourly} />
          {/* <Forecast title="Daily forecast" /> */}
        </div>
      )}
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
