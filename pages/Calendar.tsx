
import React, { useState, useMemo } from 'react';
import { MoodService } from '../services/moodService';
import { WEATHER_CONFIG } from '../constants';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const logs = useMemo(() => MoodService.getLogs(), []);
  const selectedLog = useMemo(() => logs.find(l => l.date === selectedDate), [logs, selectedDate]);

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay, totalDays };
  };

  const { firstDay, totalDays } = daysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    
    // Fill empty slots for first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-full"></div>);
    }

    // Days with records
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
      const log = logs.find(l => l.date === dateStr);
      const isSelected = selectedDate === dateStr;

      days.push(
        <div 
          key={d} 
          onClick={() => setSelectedDate(dateStr)}
          className={`h-14 w-full flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all relative ${isSelected ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}
        >
          <span className={`text-sm mb-1 ${isSelected ? 'font-bold text-blue-600' : 'text-gray-600'}`}>{d}</span>
          {log && (
            <span className="text-lg leading-none transform translate-y-[-2px]">
              {WEATHER_CONFIG[log.weatherType].icon}
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen p-6 pb-24 animate-in slide-in-from-right duration-500">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">气象历史</h1>

      {/* Calendar View */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">❮</button>
          <div className="text-lg font-bold text-gray-700">
            {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">❯</button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div key={d} className="text-xs font-bold text-gray-400">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderDays()}
        </div>
      </div>

      {/* Day Details */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[150px]">
        {selectedLog ? (
          <div className="flex space-x-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-[#F8FAFC]">
              {WEATHER_CONFIG[selectedLog.weatherType].icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800">{WEATHER_CONFIG[selectedLog.weatherType].label}</span>
                <span className="text-xs text-gray-400">{selectedDate}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {selectedLog.note || "这一天没有写下备注呢。"}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 py-8">
            <span className="text-4xl mb-2">🐚</span>
            <p className="text-sm">这一天暂时没有气候记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
