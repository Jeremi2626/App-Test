import React from 'react';
import { Cloud, CloudSun, Wind, CalendarDays } from 'lucide-react';

const WeatherCard = ({ currentWeather, loading, error }) => {
  return (
    <div className="bg-cyan-100 rounded-3xl p-6 w-80 shadow-xl text-center relative">
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin text-gray-600">Cargando...</div>
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
  );
};

export default WeatherCard;