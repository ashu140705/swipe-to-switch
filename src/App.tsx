import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { GesturePanel } from './components/GesturePanel';
import { StatsPanel } from './components/StatsPanel';
import { useGestureControl } from './hooks/useGestureControl';

function App() {
  const {
    apps,
    gestureConfig,
    systemStatus,
    stats,
    toggleGestureForApp,
    updateGestureConfig
  } = useGestureControl();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showGesturePanel, setShowGesturePanel] = useState(false);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || app.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'browser', 'editor', 'media', 'productivity', 'system'];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header systemStatus={systemStatus} />
      
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="mb-8">
          <StatsPanel stats={stats} />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setShowGesturePanel(!showGesturePanel)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showGesturePanel 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {showGesturePanel ? 'Hide' : 'Show'} Gesture Settings
          </button>
        </div>

        {/* Gesture Configuration Panel */}
        {showGesturePanel && (
          <div className="mb-8">
            <GesturePanel 
              gestureConfig={gestureConfig}
              onConfigChange={updateGestureConfig}
            />
          </div>
        )}

        {/* Applications Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Applications ({filteredApps.length})
            </h2>
            <div className="text-sm text-gray-400">
              {apps.filter(app => app.gestureEnabled).length} apps with gestures enabled
            </div>
          </div>
          
          {filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No applications found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  onToggleGesture={toggleGestureForApp}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {systemStatus.lastGestureDetected && (
          <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>
                Last gesture: <strong className="text-blue-400">{systemStatus.lastGestureDetected}</strong>
                {systemStatus.lastGestureTime && (
                  <span className="text-gray-500 ml-2">
                    ({systemStatus.lastGestureTime.toLocaleTimeString()})
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
