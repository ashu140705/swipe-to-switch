import { useState, useEffect } from 'react';
import { App, GestureConfig, SystemStatus } from '../types';

export const useGestureControl = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'Google Chrome',
      icon: 'chrome',
      isRunning: true,
      gestureEnabled: true,
      category: 'browser',
      lastUsed: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '2',
      name: 'Visual Studio Code',
      icon: 'code',
      isRunning: true,
      gestureEnabled: false,
      category: 'editor',
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: '3',
      name: 'Spotify',
      icon: 'music',
      isRunning: false,
      gestureEnabled: false,
      category: 'media',
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      id: '4',
      name: 'Microsoft Word',
      icon: 'file-text',
      isRunning: true,
      gestureEnabled: true,
      category: 'productivity',
      lastUsed: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    },
    {
      id: '5',
      name: 'Adobe Photoshop',
      icon: 'image',
      isRunning: false,
      gestureEnabled: false,
      category: 'editor',
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    },
    {
      id: '6',
      name: 'File Explorer',
      icon: 'folder',
      isRunning: true,
      gestureEnabled: false,
      category: 'system',
      lastUsed: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    }
  ]);

  const [gestureConfig, setGestureConfig] = useState<GestureConfig>({
    sensitivity: 75,
    confirmationDelay: 500,
    enabledGestures: {
      screenshot: true,
      closeTab: true,
      previousTab: true,
      nextTab: true
    }
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    connected: true,
    gestureRecognitionActive: true,
    activeApp: '1',
    lastGestureDetected: 'screenshot',
    lastGestureTime: new Date(Date.now() - 1000 * 60 * 2) // 2 minutes ago
  });

  const [stats, setStats] = useState({
    totalGestures: 1847,
    successRate: 94,
    averageResponseTime: 125,
    enabledApps: apps.filter(app => app.gestureEnabled).length
  });

  const toggleGestureForApp = (appId: string) => {
    setApps(prevApps => 
      prevApps.map(app => 
        app.id === appId 
          ? { ...app, gestureEnabled: !app.gestureEnabled }
          : app
      )
    );
  };

  const updateGestureConfig = (newConfig: GestureConfig) => {
    setGestureConfig(newConfig);
  };

  // Update stats when apps change
  useEffect(() => {
    setStats(prevStats => ({
      ...prevStats,
      enabledApps: apps.filter(app => app.gestureEnabled).length
    }));
  }, [apps]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update system status
      if (Math.random() > 0.95) {
        setSystemStatus(prev => ({
          ...prev,
          lastGestureDetected: ['screenshot', 'closeTab', 'previousTab', 'nextTab'][Math.floor(Math.random() * 4)],
          lastGestureTime: new Date()
        }));
        
        setStats(prev => ({
          ...prev,
          totalGestures: prev.totalGestures + 1
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    apps,
    gestureConfig,
    systemStatus,
    stats,
    toggleGestureForApp,
    updateGestureConfig
  };
};
