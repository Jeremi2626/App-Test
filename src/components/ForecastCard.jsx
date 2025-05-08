import React from 'react';
import { ArrowLeft, Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

const ForecastCard = ({ city, forecast }) => {
  return (
    <div className="bg-gray-900 text-white rounded-3xl p-6 w-80 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft size={20} />
        <span className="text-sm font-semibold">{city}</span>
        <CloudSun size={20} className="ml-auto text-yellow-400" />
      </div>
      <div className="bg-gray-800 p-3 rounded-xl text-xs mb-4">
        <p className="text-gray-300">15 minutes ago</p>
        <p>The wind is very strong today! This is not the time for a yacht trip.</p>
      </div>
      <div className="text-sm divide-y divide-gray-700">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3"
          >
            <span>{new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</span>
            <span>
              {Math.round(item.main.temp_max)}° {Math.round(item.main.temp_min)}°
            </span>
            <span>
              {item.weather[0].main === 'Rain' ? (
                <CloudRain size={16} className="text-blue-400" />
              ) : item.weather[0].main === 'Clouds' ? (
                <Cloud size={16} className="text-gray-300" />
              ) : (
                <Sun size={16} className="text-yellow-400" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;