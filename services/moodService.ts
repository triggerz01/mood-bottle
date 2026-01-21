
import { MoodLog, UserSettings, WeatherType } from '../types';

const STORAGE_KEY_LOGS = 'mood_weather_logs';
const STORAGE_KEY_SETTINGS = 'mood_weather_settings';

export const MoodService = {
  getLogs(): MoodLog[] {
    const data = localStorage.getItem(STORAGE_KEY_LOGS);
    return data ? JSON.parse(data) : [];
  },

  getSettings(): UserSettings {
    const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
    const defaultSettings: UserSettings = { streakDays: 0, badges: [], totalRecords: 0 };
    return data ? JSON.parse(data) : defaultSettings;
  },

  saveLog(weatherType: WeatherType, note: string): MoodLog {
    const logs = this.getLogs();
    const settings = this.getSettings();
    const today = new Date().toISOString().split('T')[0];

    // Remove existing log for today if it exists to overwrite
    const filteredLogs = logs.filter(log => log.date !== today);
    
    const newLog: MoodLog = {
      id: Date.now().toString(),
      date: today,
      weatherType,
      note,
      createTime: Date.now()
    };

    const updatedLogs = [...filteredLogs, newLog];
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updatedLogs));

    // Update settings
    this.updateUserStats(updatedLogs);

    return newLog;
  },

  updateUserStats(allLogs: MoodLog[]) {
    const settings = this.getSettings();
    const sortedLogs = [...allLogs].sort((a, b) => b.createTime - a.createTime);
    
    // Calculate streak
    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const uniqueDates = Array.from(new Set(allLogs.map(l => l.date))).sort().reverse();

    if (uniqueDates.length > 0) {
      let currentCheck = new Date(todayStr);
      for (const dateStr of uniqueDates) {
        const dateObj = new Date(dateStr);
        const diffDays = Math.floor((currentCheck.getTime() - dateObj.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays === 0 || diffDays === 1) {
          streak++;
          currentCheck = dateObj;
        } else {
          break;
        }
      }
    }

    const updatedSettings: UserSettings = {
      ...settings,
      streakDays: streak,
      totalRecords: uniqueDates.length
    };

    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updatedSettings));
  },

  getLogByDate(date: string): MoodLog | undefined {
    return this.getLogs().find(log => log.date === date);
  },

  async fetchQuote(): Promise<string> {
    try {
      const response = await fetch('https://api.shadiao.pro/chp');
      const data = await response.json();
      return data.data.text;
    } catch (error) {
      return "无论阴晴雨雪，每一个心情都值得被温柔对待。";
    }
  }
};
