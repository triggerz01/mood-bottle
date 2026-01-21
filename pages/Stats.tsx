
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MoodService } from '../services/moodService';
import { WEATHER_CONFIG } from '../constants';

const Stats: React.FC = () => {
  const logs = useMemo(() => MoodService.getLogs(), []);

  // Weekly Trend Data
  const trendData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const log = logs.find(l => l.date === date);
      return {
        date: date.split('-').slice(1).join('/'),
        value: log ? WEATHER_CONFIG[log.weatherType].value : null
      };
    });
  }, [logs]);

  // Distribution Data
  const pieData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(l => {
      counts[l.weatherType] = (counts[l.weatherType] || 0) + 1;
    });

    return Object.entries(WEATHER_CONFIG).map(([type, config]) => ({
      name: config.label,
      value: counts[type] || 0,
      color: config.color
    })).filter(d => d.value > 0);
  }, [logs]);

  return (
    <div className="min-h-screen p-6 pb-24 animate-in zoom-in-95 duration-500">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">气候分析</h1>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-bold text-gray-500 mb-6 flex items-center">
          <span className="mr-2">📈</span> 近7日情绪趋势
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8'}}
              />
              <YAxis 
                hide 
                domain={[0, 5]} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-2">
            <span>平静/开心 (5)</span>
            <span>低落/焦虑 (1)</span>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-500 mb-6 flex items-center">
          <span className="mr-2">🍰</span> 心情分布
        </h2>
        {pieData.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center space-x-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                   <span className="text-xs text-gray-600">{d.name}: {d.value}次</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            积累更多记录来生成分布图吧
          </div>
        )}
      </section>
    </div>
  );
};

export default Stats;
