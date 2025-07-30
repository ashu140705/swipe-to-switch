import React from 'react';
import { BarChart3, Zap, Target, Clock } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    totalGestures: number;
    successRate: number;
    averageResponseTime: number;
    enabledApps: number;
  };
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statItems = [
    {
      icon: BarChart3,
      label: 'Total Gestures',
      value: stats.totalGestures.toLocaleString(),
      color: 'text-blue-500'
    },
    {
      icon: Target,
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      color: 'text-green-500'
    },
    {
      icon: Clock,
      label: 'Avg Response',
      value: `${stats.averageResponseTime}ms`,
      color: 'text-orange-500'
    },
    {
      icon: Zap,
      label: 'Enabled Apps',
      value: stats.enabledApps.toString(),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-700 ${item.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
