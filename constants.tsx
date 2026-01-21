
import React from 'react';
import { WeatherType, Badge } from './types';

export const WEATHER_CONFIG: Record<WeatherType, { 
    label: string, 
    color: string, 
    icon: string, 
    value: number,
    gradient: string 
}> = {
  sunny: { 
    label: '开心', 
    color: '#FFB347', 
    icon: '☀️', 
    value: 5, 
    gradient: 'from-orange-300 to-yellow-500' 
  },
  cloudy: { 
    label: '平静', 
    color: '#90A4AE', 
    icon: '☁️', 
    value: 4, 
    gradient: 'from-blue-100 to-slate-400' 
  },
  rainy: { 
    label: '难过', 
    color: '#42A5F5', 
    icon: '🌧️', 
    value: 2, 
    gradient: 'from-blue-300 to-blue-600' 
  },
  storm: { 
    label: '愤怒', 
    color: '#7E57C2', 
    icon: '⚡', 
    value: 1, 
    gradient: 'from-purple-400 to-indigo-800' 
  },
  snow: { 
    label: '焦虑', 
    color: '#81D4FA', 
    icon: '❄️', 
    value: 3, 
    gradient: 'from-cyan-100 to-blue-300' 
  },
};

export const BADGES: Badge[] = [
  {
    id: 'rookie',
    name: '初级气象员',
    icon: '🌱',
    description: '累计记录 1 天',
    condition: (s) => s.totalRecords >= 1
  },
  {
    id: 'consistent',
    name: '情绪管家',
    icon: '📅',
    description: '连续记录 3 天',
    condition: (s) => s.streakDays >= 3
  },
  {
    id: 'storm_hunter',
    name: '风暴猎人',
    icon: '🌪️',
    description: '连续记录 7 天',
    condition: (s) => s.streakDays >= 7
  },
  {
    id: 'master',
    name: '气象专家',
    icon: '🏆',
    description: '累计记录 30 天',
    condition: (s) => s.totalRecords >= 30
  }
];
