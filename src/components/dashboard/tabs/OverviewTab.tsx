import React from 'react';
import DailyGoals from '../DailyGoals';
import { Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

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
  const upcomingEvents = [
    { id: 1, title: 'IEP Review Meeting', date: '2025-01-20', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Parent Conference', date: '2025-01-25', time: '2:30 PM', type: 'conference' },
    { id: 3, title: 'Behavior Assessment', date: '2025-02-01', time: '9:00 AM', type: 'assessment' },
  ];

  const recentProgress = [
    { area: 'Reading Comprehension', progress: 85, trend: 'up' },
    { area: 'Math Problem Solving', progress: 72, trend: 'up' },
    { area: 'Social Skills', progress: 68, trend: 'stable' },
    { area: 'Written Expression', progress: 45, trend: 'down' },
  ];

  const alerts = [
    { id: 1, message: 'Behavior plan review due next week', type: 'warning' },
    { id: 2, message: 'Missing data for math goals this week', type: 'info' },
  ];

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
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-text-secondary">{event.date} at {event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.type === 'meeting' ? 'bg-purple/20 text-purple' :
                  event.type === 'conference' ? 'bg-teal/20 text-teal' :
                  'bg-gold/20 text-gold'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
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
                'bg-teal/10 border-teal'
              }`}>
                <div className="flex items-start space-x-2">
                  {alert.type === 'warning' ? (
                    <AlertCircle size={16} className="text-gold mt-0.5" />
                  ) : (
                    <CheckCircle size={16} className="text-teal mt-0.5" />
                  )}
                  <p className="text-sm">{alert.message}</p>
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