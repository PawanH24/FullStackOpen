import { useState, useEffect } from "react";
import countryService from "./services/country";

const Search = ({ value, onChange }) => {
  return (
    <>
      find countries<input value={value} onChange={onChange}></input>
    </>
  );
};

const CountryDetail = ({ country }) => {
  const languages = [];
  for (let key in country.languages) {
    languages.push(country.languages[key]);
  }
  return (
    <>
      <h1>{country.name.common}</h1>
      Capital {country.capital}
      <br />
      Area {country.area} <h1>Languages</h1>
      <ul>
        {languages.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
      <WeatherDetail capital={country.capital} />
    </>
  );
};

const WeatherDetail = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getWeather(capital).then((response) => {
      setWeather(response);
    });
  }, [capital]);

  if (weather === null) {
    return <p>Loading Weather data</p>;
  }
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <h1>Weather in {capital}</h1>
      Temperature {weather.main.temp} Celcius <br />
      <img src={icon} alt="weather icon" /> <br />
      Wind: {weather.wind.speed} m/s
    </>
  );
};

const Button = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>Show</button>
    </>
  );
};

const List = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleSelect(country) {
    setSelectedCountry(country);
  }

  if (data.length > 10) return <p>Too many matches, specify another filter</p>;
  else if (data.length === 1) {
    const country = data[0];
    return (
      <>
        <CountryDetail country={country} />
      </>
    );
  }
  return (
    <>
      <ul>
        {data.map((country, i, arr) => {
          return (
            <li key={country.cca2}>
              {country.name.common}{" "}
              <Button onClick={() => handleSelect(arr[i])} />
            </li>
          );
        })}
      </ul>
      {selectedCountry !== null && <CountryDetail country={selectedCountry} />}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService
      .getAll()
      .then((countries) => setCountries(countries))
      .catch((error) => {
        console.log("error fetching countries", error);
      });
  }, []);

  function handleSearchChange(event) {
    setFilter(event.target.value);
  }

  const toShow =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <>
      <Search value={filter} onChange={handleSearchChange} />
      <List data={toShow} />
    </>
  );
}

export default App;
