import React from 'react';
import { Monitor, Chrome, FileText, Music, Folder, MoreHorizontal, Play, Square } from 'lucide-react';
import { App } from '../types';

interface AppCardProps {
  app: App;
  onToggleGesture: (appId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'browser': return Chrome;
    case 'editor': return FileText;
    case 'media': return Music;
    case 'productivity': return Monitor;
    case 'system': return Folder;
    default: return MoreHorizontal;
  }
};

export const AppCard: React.FC<AppCardProps> = ({ app, onToggleGesture }) => {
  const IconComponent = getCategoryIcon(app.category);
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${app.isRunning ? 'bg-green-600' : 'bg-gray-700'}`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{app.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                app.isRunning ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
              }`}>
                {app.isRunning ? <Play className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                <span>{app.isRunning ? 'Running' : 'Stopped'}</span>
              </div>
              <span className="text-gray-500 text-xs capitalize">{app.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={app.gestureEnabled}
              onChange={() => onToggleGesture(app.id)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-xs text-gray-400 mt-1">Gestures</span>
        </div>
      </div>
      
      {app.gestureEnabled && (
        <div className="border-t border-gray-700 pt-4">
          <div className="text-sm text-gray-300 mb-2">Enabled Gestures:</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Screenshot</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Close Tab</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Previous Tab</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Next Tab</span>
            </div>
          </div>
        </div>
      )}
      
      {app.lastUsed && (
        <div className="mt-4 text-xs text-gray-500">
          Last used: {app.lastUsed.toLocaleDateString()} at {app.lastUsed.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
