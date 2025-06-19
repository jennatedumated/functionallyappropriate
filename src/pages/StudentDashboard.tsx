import React, { useState } from 'react';
import TabNavigation, { TabType } from '../components/dashboard/TabNavigation';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import DemographicsTab from '../components/dashboard/tabs/DemographicsTab';
import GoalsTab from '../components/dashboard/tabs/GoalsTab';
import BehaviorTab from '../components/dashboard/tabs/BehaviorTab';
import SensoryBreakModal from '../components/dashboard/SensoryBreakModal';

interface Goal {
  id: number;
  subject: string;
  description: string;
  completed: boolean;
  dueTime?: string;
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showSensoryModal, setShowSensoryModal] = useState(false);
  const [selectedDate] = useState(new Date());
  
  const [student, setStudent] = useState({
    id: 1,
    name: 'John Smith',
    grade: '3rd',
    program: 'Resource Support',
    avatar: '',
    dailyProgress: 60,
    tokens: 15,
    nextBreak: '2:30 PM',
  });

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      subject: 'ELA',
      description: 'Read 2 pages from chapter book and answer comprehension questions',
      completed: true,
      dueTime: '10:00 AM'
    },
    {
      id: 2,
      subject: 'Math',
      description: 'Complete 10 addition problems with regrouping',
      completed: true,
      dueTime: '11:30 AM'
    },
    {
      id: 3,
      subject: 'Social Skills',
      description: 'Practice turn-taking during group activity',
      completed: false,
      dueTime: '1:00 PM'
    },
    {
      id: 4,
      subject: 'ELA',
      description: 'Write 3 sentences about favorite character',
      completed: false,
      dueTime: '2:00 PM'
    },
    {
      id: 5,
      subject: 'Behavior',
      description: 'Use coping strategy when feeling frustrated',
      completed: true,
      dueTime: 'All day'
    }
  ]);

  const handleToggleGoal = (goalId: number) => {
    setGoals(prevGoals => {
      const updatedGoals = prevGoals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      );
      
      // Update daily progress
      const completedGoals = updatedGoals.filter(goal => goal.completed).length;
      const totalGoals = updatedGoals.length;
      const newProgress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
      
      setStudent(prev => ({ ...prev, dailyProgress: newProgress }));
      
      return updatedGoals;
    });
  };

  const handleAddToken = () => {
    setStudent(prev => ({ ...prev, tokens: prev.tokens + 1 }));
  };

  const handleSensoryBreak = () => {
    setShowSensoryModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            goals={goals} 
            onToggleGoal={handleToggleGoal} 
            selectedDate={selectedDate}
            student={student}
            onSensoryBreak={handleSensoryBreak}
            onAddToken={handleAddToken}
          />
        );
      case 'demographics':
        return <DemographicsTab />;
      case 'goals':
        return <GoalsTab />;
      case 'behavior':
        return <BehaviorTab />;
      case 'services':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Services Tracker</h3>
            <p className="text-text-secondary">
              Track speech therapy, occupational therapy, counseling sessions, and other related services.
              Monitor attendance, progress notes, and service delivery hours.
            </p>
          </div>
        );
      case 'messaging':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Messaging System</h3>
            <p className="text-text-secondary">
              Secure communication platform for teachers, parents, and service providers.
              Share updates, coordinate services, and maintain communication logs.
            </p>
          </div>
        );
      case 'schedules':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Visual Schedules</h3>
            <p className="text-text-secondary">
              Create and manage visual schedules for daily routines, transitions, and special activities.
              Customize schedules based on student needs and preferences.
            </p>
          </div>
        );
      case 'parent-portal':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Parent Portal Access</h3>
            <p className="text-text-secondary">
              Provide parents with access to their child's progress, goals, behavior data, and communication tools.
              Generate reports and facilitate parent-teacher collaboration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-bg-primary rounded-lg shadow border border-border">
        <div className="p-6">
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          {renderTabContent()}
        </div>
      </div>
      
      <SensoryBreakModal 
        isOpen={showSensoryModal}
        onClose={() => setShowSensoryModal(false)}
      />
    </div>
  );
};

export default StudentDashboard;