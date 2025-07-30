import React from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';

interface GesturePanelProps {
  gestureConfig: {
    sensitivity: number;
    confirmationDelay: number;
    enabledGestures: {
      screenshot: boolean;
      closeTab: boolean;
      previousTab: boolean;
      nextTab: boolean;
    };
  };
  onConfigChange: (config: any) => void;
}

export const GesturePanel: React.FC<GesturePanelProps> = ({ gestureConfig, onConfigChange }) => {
  const gestures = [
    {
      id: 'screenshot',
      name: 'Screenshot',
      icon: Camera,
      description: 'Open palm facing camera',
      enabled: gestureConfig.enabledGestures.screenshot
    },
    {
      id: 'closeTab',
      name: 'Close Tab',
      icon: X,
      description: 'Fist gesture',
      enabled: gestureConfig.enabledGestures.closeTab
    },
    {
      id: 'previousTab',
      name: 'Previous Tab',
      icon: ChevronLeft,
      description: 'Thumb left gesture',
      enabled: gestureConfig.enabledGestures.previousTab
    },
    {
      id: 'nextTab',
      name: 'Next Tab',
      icon: ChevronRight,
      description: 'Thumb right gesture',
      enabled: gestureConfig.enabledGestures.nextTab
    }
  ];

  const handleGestureToggle = (gestureId: string) => {
    onConfigChange({
      ...gestureConfig,
      enabledGestures: {
        ...gestureConfig.enabledGestures,
        [gestureId]: !gestureConfig.enabledGestures[gestureId as keyof typeof gestureConfig.enabledGestures]
      }
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Sliders className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-white">Gesture Configuration</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Available Gestures</h3>
          <div className="space-y-4">
            {gestures.map((gesture) => {
              const IconComponent = gesture.icon;
              return (
                <div key={gesture.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${gesture.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{gesture.name}</div>
                      <div className="text-gray-400 text-sm">{gesture.description}</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gesture.enabled}
                      onChange={() => handleGestureToggle(gesture.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sensitivity: {gestureConfig.sensitivity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={gestureConfig.sensitivity}
                onChange={(e) => onConfigChange({
                  ...gestureConfig,
                  sensitivity: parseInt(e.target.value)
                })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmation Delay: {gestureConfig.confirmationDelay}ms
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={gestureConfig.confirmationDelay}
                onChange={(e) => onConfigChange({
                  ...gestureConfig,
                  confirmationDelay: parseInt(e.target.value)
                })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-white font-medium mb-2">Tips</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Higher sensitivity = faster detection</li>
                <li>• Longer delay = more accurate recognition</li>
                <li>• Ensure good lighting for best results</li>
                <li>• Keep gestures clear and deliberate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
