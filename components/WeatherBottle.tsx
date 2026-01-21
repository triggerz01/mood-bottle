
import React from 'react';
import { WeatherType } from '../types';
import { WEATHER_CONFIG } from '../constants';

interface WeatherBottleProps {
  weather?: WeatherType;
}

const WeatherBottle: React.FC<WeatherBottleProps> = ({ weather }) => {
  const config = weather ? WEATHER_CONFIG[weather] : null;

  return (
    <div className="relative w-64 h-80 mx-auto flex items-center justify-center">
      {/* Bottle Body */}
      <div className="absolute inset-0 border-4 border-white/40 rounded-t-[100px] rounded-b-[40px] shadow-2xl glass-morphism overflow-hidden z-10">
        
        {/* Fill Content */}
        {config ? (
          <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-40 transition-all duration-700`}></div>
        ) : (
          <div className="absolute inset-0 bg-gray-200/20 flex items-center justify-center">
             <span className="text-4xl text-gray-400 opacity-50">?</span>
          </div>
        )}

        {/* Dynamic Effects */}
        {weather === 'sunny' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-200 rounded-full blur-2xl animate-pulse opacity-60"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 bg-yellow-100 rounded-full animate-ping opacity-75" style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 0.5}s`
              }}></div>
            ))}
          </div>
        )}

        {weather === 'rainy' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="absolute w-0.5 h-6 bg-blue-100/50 rounded-full" style={{
                top: '-20px',
                left: `${Math.random() * 100}%`,
                animation: `rain-fall ${0.5 + Math.random() * 0.5}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}></div>
            ))}
          </div>
        )}

        {weather === 'snow' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 bg-white rounded-full" style={{
                top: '-10px',
                left: `${Math.random() * 100}%`,
                animation: `snow-fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}></div>
            ))}
          </div>
        )}

        {weather === 'storm' && (
           <div className="absolute inset-0 bg-black/10 animate-pulse pointer-events-none">
             <div className="h-full w-full bg-indigo-900/10"></div>
           </div>
        )}

        {/* Weather Icon Overlay */}
        {config && (
          <div className="absolute inset-0 flex items-center justify-center z-20 float-animation">
            <span className="text-8xl drop-shadow-lg">{config.icon}</span>
          </div>
        )}
      </div>

      {/* Bottle Cap */}
      <div className="absolute -top-4 w-16 h-8 bg-amber-800 rounded-md shadow-md z-20 left-1/2 -translate-x-1/2"></div>
      
      {/* Table Shadow */}
      <div className="absolute -bottom-4 w-48 h-4 bg-black/5 rounded-full blur-sm"></div>

      <style>{`
        @keyframes rain-fall {
          to { transform: translateY(350px); }
        }
        @keyframes snow-fall {
          to { transform: translateY(350px) translateX(${Math.random() * 20 - 10}px); }
        }
      `}</style>
    </div>
  );
};

export default WeatherBottle;
