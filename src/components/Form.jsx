import React, { useState, useEffect } from 'react';
import { Search, Cloud, CloudSun, Wind, CalendarDays, Loader2 } from 'lucide-react';
import axios from 'axios';

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
    <div className="bg-cyan-100 rounded-3xl p-6 w-80 shadow-xl text-center relative">
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
        <div className="bg-cyan-100 rounded-3xl p-6 w-80 shadow-xl text-center relative">
    
          {loading && (
            <div className="flex justify-center mb-4">
              <Loader2 className="animate-spin text-gray-600" size={24} />
            </div>
          )}
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          {currentWeather && !loading && (
            <>
              <div className="text-gray-800 font-medium text-lg mb-2 flex justify-center items-center gap-2">
                <span className="text-sm">{currentWeather.name}</span>
                <CalendarDays size={16} />
              </div>
              <div className="relative w-full flex justify-center items-center mb-4">
                <Cloud className="text-white absolute left-1/4 z-20" size={48} />
                <Cloud className="text-white absolute right-1/4 z-20" size={48} />
                <Cloud className="text-white absolute top-10 z-10" size={48} />
                <div className="z-30">
                  <CloudSun size={64} className="text-yellow-400" />
                  <Wind size={32} className="text-blue-400" />
                </div>
              </div>
              <div className="text-gray-800 text-xl font-semibold mb-1">{currentWeather.weather[0].main}</div>
              <div className="text-6xl font-bold text-blue-500 mb-2">{Math.round(currentWeather.main.temp)}°C</div>
              <div className="text-sm text-gray-600 flex justify-center gap-4">
                <span>{currentWeather.wind.speed} km/h</span>
                <span>{currentWeather.main.humidity}%</span>
              </div>
            </>
          )}
        </div>
     </div>
     
  )
}

export default Form