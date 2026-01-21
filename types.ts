
export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'storm' | 'snow';

export interface MoodLog {
  id: string;
  date: string; // YYYY-MM-DD
  weatherType: WeatherType;
  note: string;
  createTime: number;
}

export interface UserSettings {
  streakDays: number;
  badges: string[];
  totalRecords: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  condition: (settings: UserSettings) => boolean;
}
