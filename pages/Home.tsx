
import React, { useState, useEffect } from 'react';
import WeatherBottle from '../components/WeatherBottle';
import MoodForm from '../components/MoodForm';
import { MoodService } from '../services/moodService';
import { MoodLog, WeatherType } from '../types';

const Home: React.FC = () => {
  const [quote, setQuote] = useState("正在寻找温暖的话语...");
  const [todayLog, setTodayLog] = useState<MoodLog | undefined>();
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const log = MoodService.getLogByDate(today);
    setTodayLog(log);
    const q = await MoodService.fetchQuote();
    setQuote(q);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = (weather: WeatherType, note: string) => {
    const newLog = MoodService.saveLog(weather, note);
    setTodayLog(newLog);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">情绪天气瓶</h1>
        <div className="bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-blue-300"></div>
          <p className="text-gray-600 text-sm leading-relaxed italic">“{quote}”</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-medium text-gray-500">
            {todayLog ? '今天的天气是...' : '捕捉今日心情'}
          </h2>
          {todayLog && (
            <div className="px-4 py-1 bg-white/40 rounded-full text-xs text-gray-400 border border-white/50">
              更新于 {new Date(todayLog.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>

        <WeatherBottle weather={todayLog?.weatherType} />

        <div className="w-full max-w-xs text-center">
          {todayLog?.note && (
             <p className="text-sm text-gray-500 line-clamp-3 bg-white/30 p-3 rounded-xl backdrop-blur-sm">
                {todayLog.note}
             </p>
          )}
        </div>
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-tr from-blue-400 to-indigo-500 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95 z-30"
      >
        {todayLog ? '✎' : '+'}
      </button>

      {showForm && (
        <MoodForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;
