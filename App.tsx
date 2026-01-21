
import React, { useState } from 'react';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Navigation, { Tab } from './components/Navigation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'calendar': return <Calendar />;
      case 'stats': return <Stats />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F7FA] relative overflow-x-hidden">
      {renderContent()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;
