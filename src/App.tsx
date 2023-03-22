import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const weatherdata = useRef<any>();

  const getWeatherReport = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e86b60d1aa7f4a4d01d02febf5461b0`
      );
      data.main.temp = (data.main.temp - 273.15).toFixed(2);
      setWeather(data);
      weatherdata.current = data;
    } catch (error: any) {
      alert("city not found");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-12 mx-auto">
            <div className="input_data p-5 ">
              <form className="">
                <div className="form-group d-flex mt-5 w-75 mx-auto city_input bg-dark p-4">
                  <input
                    type="text"
                    className="text-light p-2 w-100 h1 form_input bg-dark"
                    id="cityName"
                    autoComplete="off"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <button
                    type="submit"
                    id="search_btn"
                    className="btn btn-primary submit_btn px-5"
                    onClick={getWeatherReport}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mx-auto bg-primary information">
            <div className="d-flex text-light p-2 my-3">
              <p id="day" className="h3"></p>
              <p id="date" className="ml-auto h3"></p>
            </div>

            <div className=" text-light p-2 my-3">
              <p id="output" className="h3" ref={weatherdata}>
                {weatherdata.current?.sys
                  ? `${weatherdata.current.sys.country} , ${weatherdata.current.name}`
                  : "Get output here"}
              </p>
            </div>

            <div
              className={`d-flex text-light p-2 my-3 data ${
                !weather && "data_hide"
              }`}
              id="data_show"
            >
              <h1 id="temp" className="mx-auto temp">
                {weather && weather?.main?.temp} <sup>o</sup>C
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-5 mx-auto bg-dark details">
              <div className="row">
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    Wind - {weather && `${weather?.wind?.speed} Km/hr`}
                  </p>
                </div>
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    Wind Direction - {weather ? weather?.wind?.deg : 0}
                    <sup>o</sup>deg{" "}
                  </p>
                </div>
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    Visibility - {weather && `${weather?.visibility / 1000}km`}{" "}
                  </p>
                </div>
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    Pressure - {weather && `${weather?.main?.pressure} hpa`}{" "}
                  </p>
                </div>
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    Humidity - {weather && `${weather?.main?.humidity} %`}{" "}
                  </p>
                </div>
                <div className="col-6 p-4 center">
                  <p id="temp_status" className="mx-auto">
                    High/Low -{" "}
                    {weather &&
                      `${(weather?.main?.temp_max - 273.15).toFixed(2)} / `}
                    {weather && (weather?.main?.temp_min - 273.15).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
