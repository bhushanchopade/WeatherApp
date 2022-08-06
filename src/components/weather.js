import React, { useState, useEffect } from 'react';
import './style.css';
import WeatherCard from './weathercard';

const Weather = () => {
  const [searchValue, setSearchValue] = useState('nagpur');
  const [weatherInfo, setWeatherInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b1addcdaf0883b0136d8168cb2de0831`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure, sea_level } = data.main;
      console.log(temp, humidity, pressure, sea_level);
      
      const { main:weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setWeatherInfo(myWeatherInfo);
      console.log(myWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
    // eslint-disable-next-line
  }, [])
  
  
  return (
    <>
    <div className='wrap'>
      <div className='search'>
        <input type='search' 
          placeholder="search..."
          autoFocus
          id="search"
          className="searchTerm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="searchButton"
          type="button"
          onClick={getWeatherInfo}
          >
          Search
        </button>
       
       
      </div>
    </div>
    
    <WeatherCard weatherInfo={weatherInfo} />
    </>
  )
}

export default Weather