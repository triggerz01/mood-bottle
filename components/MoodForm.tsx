
import React, { useState } from 'react';
import { WeatherType } from '../types';
import { WEATHER_CONFIG } from '../constants';

interface MoodFormProps {
  onClose: () => void;
  onSave: (weather: WeatherType, note: string) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onClose, onSave }) => {
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>('sunny');
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">捕捉今日天气</h2>
          <button onClick={onClose} className="p-2 text-gray-400">✕</button>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-8">
          {(Object.keys(WEATHER_CONFIG) as WeatherType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedWeather(type)}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
                selectedWeather === type 
                ? 'bg-[#F0F4F8] ring-2 ring-blue-400' 
                : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl mb-1">{WEATHER_CONFIG[type].icon}</span>
              <span className="text-xs text-gray-600">{WEATHER_CONFIG[type].label}</span>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">心情备注</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="写下你现在的感受..."
            className="w-full h-32 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 transition-all resize-none"
          ></textarea>
        </div>

        <button
          onClick={() => onSave(selectedWeather, note)}
          className="w-full py-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-95"
        >
          存入瓶子
        </button>
      </div>
    </div>
  );
};

export default MoodForm;
