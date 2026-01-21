
import React from 'react';

export type Tab = 'home' | 'calendar' | 'stats' | 'profile';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const items: { id: Tab, label: string, icon: string }[] = [
    { id: 'home', label: '瓶子', icon: '🍼' },
    { id: 'calendar', label: '记录', icon: '🗓️' },
    { id: 'stats', label: '统计', icon: '📊' },
    { id: 'profile', label: '成就', icon: '🏅' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 h-20 px-6 flex items-center justify-between z-40 pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className="flex flex-col items-center flex-1 transition-all"
        >
          <span className={`text-2xl mb-1 transition-all ${activeTab === item.id ? 'scale-110' : 'grayscale opacity-60'}`}>
            {item.icon}
          </span>
          <span className={`text-[10px] font-medium transition-all ${activeTab === item.id ? 'text-blue-500' : 'text-gray-400'}`}>
            {item.label}
          </span>
          {activeTab === item.id && (
            <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 animate-pulse"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
