import React from 'react';
import { 
  User, 
  Target, 
  Brain, 
  Calendar, 
  MessageSquare, 
  Layout, 
  Users,
  ClipboardList
} from 'lucide-react';

export type TabType = 
  | 'overview' 
  | 'demographics' 
  | 'goals' 
  | 'behavior' 
  | 'services' 
  | 'messaging' 
  | 'schedules' 
  | 'parent-portal';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: ClipboardList, color: 'text-purple' },
    { id: 'demographics' as TabType, label: 'Demographics', icon: User, color: 'text-teal' },
    { id: 'goals' as TabType, label: 'Goals', icon: Target, color: 'text-green' },
    { id: 'behavior' as TabType, label: 'Behavior Profile', icon: Brain, color: 'text-gold' },
    { id: 'services' as TabType, label: 'Services Tracker', icon: Calendar, color: 'text-purple' },
    { id: 'messaging' as TabType, label: 'Messaging', icon: MessageSquare, color: 'text-teal' },
    { id: 'schedules' as TabType, label: 'Visual Schedules', icon: Layout, color: 'text-green' },
    { id: 'parent-portal' as TabType, label: 'Parent Portal', icon: Users, color: 'text-gold' },
  ];

  return (
    <div className="mb-6">
      {/* Icon Navigation - Above the purple area */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-8 p-4 bg-bg-secondary rounded-xl border border-border">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-bg-primary shadow-md border border-border'
                    : 'hover:bg-bg-primary/50'
                }`}
                title={tab.label}
              >
                <Icon 
                  size={24} 
                  className={`${activeTab === tab.id ? tab.color : 'text-text-secondary'} transition-colors`} 
                />
                <span className={`text-xs font-medium ${
                  activeTab === tab.id ? 'text-text-primary' : 'text-text-secondary'
                } transition-colors`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Traditional Tab Navigation - Below for reference/backup */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple text-purple font-medium'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon size={18} className={activeTab === tab.id ? tab.color : ''} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;