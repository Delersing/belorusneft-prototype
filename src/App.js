import React, { useState, useEffect } from 'react';
import './App.css';
import Tab1Transform from './components/Tab1Transform/TransformComparison';
import Tab2Simulator from './components/Tab2Simulator/Tab2Simulator';
import Tab3Analytics from './components/Tab3Analytics/Tab3Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('transform');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Загрузка экосистемы...</h2>
          <p className="text-cyan-400">Белоруснефть B2C/B2B Синергия</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-card m-4 mb-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Прототип Синергии B2C/B2B Экосистемы
              </h1>
              <p className="text-cyan-400 text-sm mt-1">
                «Белоруснефть» - Единая Цифровая Экосистема
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Демонстрация</div>
              <div className="text-cyan-400 font-semibold">C-T-C Концепция</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="glass-card m-4 mt-0 mb-4">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('transform')}
              className={`tab-button ${activeTab === 'transform' ? 'active' : ''}`}
            >
              Трансформация
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`tab-button ${activeTab === 'simulator' ? 'active' : ''}`}
            >
              Симулятор
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            >
              Аналитика
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="container mx-auto px-6 pb-8">
        {activeTab === 'transform' && <Tab1Transform />}
        {activeTab === 'simulator' && <Tab2Simulator />}
        {activeTab === 'analytics' && <Tab3Analytics />}
      </main>

      {/* Footer */}
      <footer className="glass-card m-4 mt-0">
        <div className="container mx-auto px-6 py-3 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Белоруснефть. Прототип демонстрирует эффект синергии B2C/B2B экосистемы
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
