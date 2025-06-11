import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, FileText, Users, AlertCircle, Clock } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, addDays, addWeeks } from 'date-fns';

interface ScheduleEvent {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'iep-due' | 'progress-report' | 'evaluation' | 'conference' | 'other';
  studentName?: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

const Scheduling: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate automatic IEP and progress report dates
  const generateAutomaticEvents = (): ScheduleEvent[] => {
    const events: ScheduleEvent[] = [];
    const today = new Date();
    
    // Sample students with their IEP dates and progress report schedules
    const students = [
      { name: 'John Smith', iepDate: new Date(2024, 8, 15), lastProgress: new Date(2024, 11, 15) },
      { name: 'Emily Johnson', iepDate: new Date(2024, 5, 10), lastProgress: new Date(2024, 10, 10) },
      { name: 'Michael Davis', iepDate: new Date(2024, 2, 5), lastProgress: new Date(2024, 9, 5) },
      { name: 'Sarah Wilson', iepDate: new Date(2024, 7, 20), lastProgress: new Date(2025, 0, 20) },
      { name: 'David Thompson', iepDate: new Date(2024, 10, 30), lastProgress: new Date(2024, 8, 30) },
    ];
    
    let eventId = 1000;
    
    students.forEach(student => {
      // Calculate next IEP due date (annual)
      const nextIepDate = new Date(student.iepDate);
      nextIepDate.setFullYear(nextIepDate.getFullYear() + 1);
      
      // Add IEP due date
      events.push({
        id: eventId++,
        title: `IEP Annual Review Due - ${student.name}`,
        date: nextIepDate,
        time: 'All Day',
        type: 'iep-due',
        studentName: student.name,
        priority: 'high',
        description: 'Annual IEP review and goal updates required'
      });
      
      // Add IEP meeting 2 weeks before due date
      const iepMeetingDate = addDays(nextIepDate, -14);
      events.push({
        id: eventId++,
        title: `IEP Meeting - ${student.name}`,
        date: iepMeetingDate,
        time: '10:00 AM',
        type: 'meeting',
        studentName: student.name,
        priority: 'high',
        description: 'Annual IEP review meeting with team and parents'
      });
      
      // Generate quarterly progress reports
      for (let quarter = 0; quarter < 4; quarter++) {
        const progressDate = addMonths(student.lastProgress, quarter * 3);
        if (progressDate > today) {
          events.push({
            id: eventId++,
            title: `Progress Report Due - ${student.name}`,
            date: progressDate,
            time: 'End of Day',
            type: 'progress-report',
            studentName: student.name,
            priority: 'medium',
            description: 'Quarterly progress report on IEP goals'
          });
        }
      }
      
      // Add triennial evaluation if needed (every 3 years)
      const triennialDate = new Date(student.iepDate);
      triennialDate.setFullYear(triennialDate.getFullYear() + 3);
      if (triennialDate.getFullYear() === today.getFullYear() + 1) {
        events.push({
          id: eventId++,
          title: `Triennial Evaluation Due - ${student.name}`,
          date: addDays(triennialDate, -30),
          time: 'All Day',
          type: 'evaluation',
          studentName: student.name,
          priority: 'high',
          description: 'Three-year comprehensive evaluation required'
        });
      }
    });
    
    return events;
  };

  const [events, setEvents] = useState<ScheduleEvent[]>([
    // Manual events
    { 
      id: 1, 
      title: 'IEP Team Training', 
      date: new Date(2025, 0, 15), 
      time: '9:00 AM',
      type: 'other',
      priority: 'medium',
      description: 'Professional development on new IEP procedures'
    },
    { 
      id: 2, 
      title: 'Parent Conference - Emily Johnson', 
      date: new Date(2025, 0, 22), 
      time: '2:30 PM',
      type: 'conference',
      studentName: 'Emily Johnson',
      priority: 'medium',
      description: 'Quarterly parent conference'
    },
    { 
      id: 3, 
      title: 'Behavior Assessment - Michael Davis', 
      date: new Date(2025, 0, 28), 
      time: '1:00 PM',
      type: 'evaluation',
      studentName: 'Michael Davis',
      priority: 'high',
      description: 'Functional behavior assessment'
    },
    // Add automatically generated events
    ...generateAutomaticEvents()
  ]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get events for the selected month, sorted by priority and date
  const monthEvents = events
    .filter(event => isSameMonth(event.date, currentMonth))
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.date.getTime() - b.date.getTime();
    });

  // Get upcoming events across all months
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'iep-due':
        return 'bg-red-500 text-white';
      case 'progress-report':
        return 'bg-gold text-black';
      case 'meeting':
        return 'bg-purple text-white';
      case 'evaluation':
        return 'bg-teal text-white';
      case 'conference':
        return 'bg-green text-white';
      default:
        return 'bg-bg-secondary text-text-primary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={14} className="text-red-500" />;
      case 'medium':
        return <Clock size={14} className="text-gold" />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Scheduling</h1>
        <button className="btn bg-accent-teal">
          <span className="flex items-center gap-1">
            <Plus size={18} />
            New Event
          </span>
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">IEP Due Dates</p>
              <p className="text-2xl font-bold text-red-700">
                {events.filter(e => e.type === 'iep-due' && e.date >= new Date()).length}
              </p>
            </div>
            <FileText className="text-red-500" size={24} />
          </div>
        </div>
        
        <div className="card bg-gold/10 border-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gold">Progress Reports</p>
              <p className="text-2xl font-bold text-gold">
                {events.filter(e => e.type === 'progress-report' && e.date >= new Date()).length}
              </p>
            </div>
            <FileText className="text-gold" size={24} />
          </div>
        </div>
        
        <div className="card bg-purple/10 border-purple/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple">IEP Meetings</p>
              <p className="text-2xl font-bold text-purple">
                {events.filter(e => e.type === 'meeting' && e.date >= new Date()).length}
              </p>
            </div>
            <Users className="text-purple" size={24} />
          </div>
        </div>
        
        <div className="card bg-teal/10 border-teal/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal">Evaluations</p>
              <p className="text-2xl font-bold text-teal">
                {events.filter(e => e.type === 'evaluation' && e.date >= new Date()).length}
              </p>
            </div>
            <FileText className="text-teal" size={24} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">{format(currentMonth, 'MMMM yyyy')}</h2>
            <div className="flex gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-md hover:bg-bg-secondary transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-md hover:bg-bg-secondary transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="text-center font-medium p-2 text-sm">
                {day}
              </div>
            ))}
            
            {Array.from({ length: getDay(monthStart) }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-24 p-1 border border-border bg-bg-secondary bg-opacity-30 rounded-md" />
            ))}
            
            {monthDays.map(day => {
              const dayEvents = events.filter(event => 
                event.date.getDate() === day.getDate() && 
                event.date.getMonth() === day.getMonth() &&
                event.date.getFullYear() === day.getFullYear()
              );
              
              return (
                <div 
                  key={day.toString()} 
                  className={`h-24 p-1 border border-border rounded-md overflow-hidden transition-all hover:border-teal ${
                    isToday(day) ? 'bg-teal bg-opacity-10 border-teal' : ''
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{format(day, 'd')}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id} 
                        className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                        title={`${event.time} - ${event.title}`}
                      >
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(event.priority)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-text-secondary">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {Array.from({ length: 6 - getDay(monthEnd) }).map((_, index) => (
              <div key={`empty-end-${index}`} className="h-24 p-1 border border-border bg-bg-secondary bg-opacity-30 rounded-md" />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="text-teal" size={20} />
              <h2 className="text-xl font-medium">Upcoming Events</h2>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 border border-border rounded-md hover:border-teal transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(event.priority)}
                        <h3 className="font-medium text-sm">{event.title}</h3>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                        {format(event.date, 'MMM d')}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mb-1">{event.time}</p>
                    {event.studentName && (
                      <p className="text-xs text-purple font-medium">Student: {event.studentName}</p>
                    )}
                    {event.description && (
                      <p className="text-xs text-text-secondary mt-1">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary py-4 text-center">No upcoming events</p>
            )}
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium mb-4">Event Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>IEP Due Dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gold rounded"></div>
                <span>Progress Reports</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple rounded"></div>
                <span>IEP Meetings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal rounded"></div>
                <span>Evaluations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green rounded"></div>
                <span>Conferences</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="font-medium mb-2">Priority Levels</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={14} className="text-red-500" />
                  <span>High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-gold" />
                  <span>Medium Priority</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 border border-border rounded-md hover:border-teal transition-all">
                <div className="font-medium text-sm">Schedule IEP Meeting</div>
                <div className="text-xs text-text-secondary">Set up team meeting</div>
              </button>
              <button className="w-full text-left p-2 border border-border rounded-md hover:border-teal transition-all">
                <div className="font-medium text-sm">Add Progress Report</div>
                <div className="text-xs text-text-secondary">Schedule quarterly report</div>
              </button>
              <button className="w-full text-left p-2 border border-border rounded-md hover:border-teal transition-all">
                <div className="font-medium text-sm">Plan Evaluation</div>
                <div className="text-xs text-text-secondary">Schedule assessment</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;