import React from 'react';
import DailyGoals from '../DailyGoals';
import { Calendar, TrendingUp, AlertCircle, CheckCircle, FileText, Users } from 'lucide-react';
import { addDays, addMonths } from 'date-fns';

interface Goal {
  id: number;
  subject: string;
  description: string;
  completed: boolean;
  dueTime?: string;
}

interface OverviewTabProps {
  goals: Goal[];
  onToggleGoal: (goalId: number) => void;
  selectedDate: Date;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ goals, onToggleGoal, selectedDate }) => {
  // Generate upcoming IEP and progress report dates
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'IEP Annual Review Due', 
      date: '2025-09-15', 
      time: 'All Day', 
      type: 'iep-due',
      priority: 'high',
      daysUntil: Math.ceil((new Date('2025-09-15').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    },
    { 
      id: 2, 
      title: 'Progress Report Due', 
      date: '2025-03-15', 
      time: 'End of Day', 
      type: 'progress-report',
      priority: 'medium',
      daysUntil: Math.ceil((new Date('2025-03-15').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    },
    { 
      id: 3, 
      title: 'IEP Team Meeting', 
      date: '2025-02-01', 
      time: '10:00 AM', 
      type: 'meeting',
      priority: 'high',
      daysUntil: Math.ceil((new Date('2025-02-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    },
    { 
      id: 4, 
      title: 'Parent Conference', 
      date: '2025-01-25', 
      time: '2:30 PM', 
      type: 'conference',
      priority: 'medium',
      daysUntil: Math.ceil((new Date('2025-01-25').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    },
  ];

  const recentProgress = [
    { area: 'Reading Comprehension', progress: 85, trend: 'up' },
    { area: 'Math Problem Solving', progress: 72, trend: 'up' },
    { area: 'Social Skills', progress: 68, trend: 'stable' },
    { area: 'Written Expression', progress: 45, trend: 'down' },
  ];

  const alerts = [
    { 
      id: 1, 
      message: 'IEP Annual Review due in 247 days', 
      type: 'info',
      action: 'Schedule meeting 2 weeks prior'
    },
    { 
      id: 2, 
      message: 'Progress Report due in 58 days', 
      type: 'warning',
      action: 'Begin data collection'
    },
    { 
      id: 3, 
      message: 'Missing behavior data for this week', 
      type: 'warning',
      action: 'Update behavior tracking'
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'iep-due':
        return 'bg-red-500/20 text-red-700 border-red-200';
      case 'progress-report':
        return 'bg-gold/20 text-gold border-gold/20';
      case 'meeting':
        return 'bg-purple/20 text-purple border-purple/20';
      case 'conference':
        return 'bg-teal/20 text-teal border-teal/20';
      default:
        return 'bg-bg-secondary text-text-primary border-border';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'iep-due':
        return <FileText size={16} />;
      case 'progress-report':
        return <FileText size={16} />;
      case 'meeting':
        return <Users size={16} />;
      case 'conference':
        return <Calendar size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  const getPriorityBadge = (priority: string, daysUntil: number) => {
    if (daysUntil <= 7) {
      return <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Urgent</span>;
    } else if (daysUntil <= 30) {
      return <span className="px-2 py-1 bg-gold text-black text-xs rounded-full">Soon</span>;
    } else if (priority === 'high') {
      return <span className="px-2 py-1 bg-purple text-white text-xs rounded-full">High</span>;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyGoals 
          goals={goals} 
          onToggleGoal={onToggleGoal} 
          selectedDate={selectedDate} 
        />
        
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Upcoming IEP & Reports</h3>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event.type)}
                    <h4 className="font-medium text-sm">{event.title}</h4>
                  </div>
                  {getPriorityBadge(event.priority, event.daysUntil)}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>{event.date} at {event.time}</span>
                  <span className="font-medium">
                    {event.daysUntil > 0 ? `${event.daysUntil} days` : 'Today'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-purple/10 border border-purple/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle size={16} className="text-purple" />
              <span className="font-medium text-sm">Scheduling Tip</span>
            </div>
            <p className="text-xs text-text-secondary">
              IEP meetings should be scheduled 2-3 weeks before due dates to allow time for preparation and parent coordination.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Progress Summary</h3>
          </div>
          
          <div className="space-y-4">
            {recentProgress.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.area}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.progress}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        item.trend === 'up' ? 'bg-green' :
                        item.trend === 'down' ? 'bg-red-500' :
                        'bg-gold'
                      }`}></div>
                    </div>
                  </div>
                  <div className="w-full bg-bg-secondary rounded-full h-2">
                    <div 
                      className="bg-purple h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Alerts & Reminders</h3>
          </div>
          
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-gold/10 border-gold' :
                alert.type === 'info' ? 'bg-teal/10 border-teal' :
                'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-2">
                      {alert.type === 'warning' ? (
                        <AlertCircle size={16} className="text-gold mt-0.5" />
                      ) : alert.type === 'info' ? (
                        <CheckCircle size={16} className="text-teal mt-0.5" />
                      ) : (
                        <AlertCircle size={16} className="text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-text-secondary mt-1">{alert.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {alerts.length === 0 && (
            <div className="text-center py-4 text-text-secondary">
              <CheckCircle size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">All caught up! No alerts at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;