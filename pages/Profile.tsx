
import React, { useMemo } from 'react';
import { MoodService } from '../services/moodService';
import { BADGES } from '../constants';

const Profile: React.FC = () => {
  const settings = useMemo(() => MoodService.getSettings(), []);

  return (
    <div className="min-h-screen p-6 pb-24 animate-in slide-in-from-bottom duration-500">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">成就馆</h1>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-6 rounded-3xl shadow-lg shadow-orange-200 text-white">
          <div className="text-sm opacity-80 mb-1">连续记录</div>
          <div className="text-3xl font-bold flex items-end">
            {settings.streakDays} <span className="text-sm ml-1 mb-1">天</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-lg shadow-blue-200 text-white">
          <div className="text-sm opacity-80 mb-1">累计记录</div>
          <div className="text-3xl font-bold flex items-end">
            {settings.totalRecords} <span className="text-sm ml-1 mb-1">条</span>
          </div>
        </div>
      </div>

      {/* Badges Wall */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          荣耀徽章 <span className="ml-2 text-sm font-normal text-gray-400">已解锁 {BADGES.filter(b => b.condition(settings)).length}/{BADGES.length}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = badge.condition(settings);
            return (
              <div 
                key={badge.id}
                className={`flex flex-col items-center p-6 rounded-3xl border transition-all ${
                  isUnlocked 
                  ? 'bg-white border-blue-100 shadow-sm' 
                  : 'bg-gray-100 border-transparent opacity-60'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${isUnlocked ? 'bg-blue-50' : 'bg-gray-200 grayscale'}`}>
                  {badge.icon}
                </div>
                <h3 className={`text-sm font-bold mb-1 ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>{badge.name}</h3>
                <p className="text-[10px] text-gray-400 text-center leading-tight">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="mt-12 text-center">
        <p className="text-xs text-gray-300">情绪天气瓶 v1.0.0</p>
        <p className="text-xs text-gray-300 mt-1">用心感受每一个起伏的瞬间</p>
      </footer>
    </div>
  );
};

export default Profile;
