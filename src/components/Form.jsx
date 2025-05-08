import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';

const Form = () => {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = `${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError('');
        setLoading(true);
        const currentRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        setCurrentWeather(currentRes.data);
        const dailyForecast = forecastRes.data.list.filter((item, index) => index % 8 === 0);
        setForecast(dailyForecast);
      } catch (error) {
        setError('City not found. Please try another.');
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);


  const handleSearch = (e) => {
    e.preventDefault();
    setCity(query);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <form onSubmit={handleSearch} className="flex mb-4 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl p-2 text-sm focus:outline-none"
          placeholder="Buscar ciudad..."
        />
        <button type="submit" className="bg-cyan-400 rounded-xl px-2 text-white">
          <Search size={16} />
        </button>
      </form>
      <WeatherCard currentWeather={currentWeather} loading={loading} error={error} />
      <ForecastCard city={city} forecast={forecast} />
    </div>
  );
};
export default Form;