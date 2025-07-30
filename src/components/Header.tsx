import React from 'react';
import { Hand, Settings, Activity } from 'lucide-react';

interface HeaderProps {
  systemStatus: {
    connected: boolean;
    gestureRecognitionActive: boolean;
  };
}

export const Header: React.FC<HeaderProps> = ({ systemStatus }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Hand className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Gesture Control Panel</h1>
            <p className="text-gray-400 text-sm">Manage hand gesture controls for your applications</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-300">
              {systemStatus.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Activity className={`w-4 h-4 ${systemStatus.gestureRecognitionActive ? 'text-green-500' : 'text-gray-500'}`} />
            <span className="text-sm text-gray-300">
              {systemStatus.gestureRecognitionActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
