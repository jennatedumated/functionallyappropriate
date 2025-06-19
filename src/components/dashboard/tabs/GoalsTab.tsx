import React, { useState } from 'react';
import { Target, Plus, Save, Calendar, CheckCircle, Clock, Edit3, Trash2, Upload, Download, Contrast as DragDropContext, Droplet as Droppable, Cable as Draggable } from 'lucide-react';

interface Goal {
  id: number;
  text: string;
  studentName: string;
  status: 'active' | 'achieved' | 'on-hold';
  nextProgressDue: string;
  area: string;
  baseline?: string;
  targetCriteria?: string;
  extractedFromIEP?: boolean;
  lastUpdated: string;
}

interface WeeklyGoal {
  goalId: number;
  day: string;
  completed: boolean;
}

const GoalsTab: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      text: 'Student will read grade-level text with 90% accuracy and answer comprehension questions with 80% accuracy in 4 out of 5 trials.',
      studentName: 'John Smith',
      status: 'active',
      nextProgressDue: '2025-03-15',
      area: 'Reading Comprehension',
      baseline: 'Currently reads with 65% accuracy',
      targetCriteria: '90% accuracy, 4/5 trials',
      extractedFromIEP: true,
      lastUpdated: '2025-01-10'
    },
    {
      id: 2,
      text: 'Student will solve multi-step word problems involving addition and subtraction with 75% accuracy over 3 consecutive sessions.',
      studentName: 'John Smith',
      status: 'active',
      nextProgressDue: '2025-02-28',
      area: 'Math Problem Solving',
      baseline: 'Currently solves with 45% accuracy',
      targetCriteria: '75% accuracy, 3 consecutive sessions',
      extractedFromIEP: true,
      lastUpdated: '2025-01-10'
    },
    {
      id: 3,
      text: 'Student will initiate appropriate social interactions with peers during unstructured activities at least 5 times per day for 2 consecutive weeks.',
      studentName: 'John Smith',
      status: 'active',
      nextProgressDue: '2025-02-15',
      area: 'Social Skills',
      baseline: 'Currently initiates 1-2 interactions per day',
      targetCriteria: '5 interactions daily, 2 weeks',
      extractedFromIEP: false,
      lastUpdated: '2025-01-12'
    }
  ]);

  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    { goalId: 1, day: 'Monday', completed: true },
    { goalId: 2, day: 'Monday', completed: false },
    { goalId: 1, day: 'Tuesday', completed: false },
    { goalId: 3, day: 'Tuesday', completed: true },
    { goalId: 2, day: 'Wednesday', completed: false },
    { goalId: 1, day: 'Thursday', completed: false },
    { goalId: 3, day: 'Friday', completed: false }
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [showWeeklyPlanner, setShowWeeklyPlanner] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'weekly' | 'today'>('list');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green/10 text-green border-green/20';
      case 'achieved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-bg-secondary text-text-primary border-border';
    }
  };

  const getTodaysGoals = () => {
    const todayGoalIds = weeklyGoals
      .filter(wg => wg.day === today)
      .map(wg => wg.goalId);
    
    return goals.filter(goal => todayGoalIds.includes(goal.id));
  };

  const getGoalsForDay = (day: string) => {
    const dayGoalIds = weeklyGoals
      .filter(wg => wg.day === day)
      .map(wg => wg.goalId);
    
    return goals.filter(goal => dayGoalIds.includes(goal.id));
  };

  const toggleDailyCompletion = (goalId: number, day: string) => {
    setWeeklyGoals(prev => 
      prev.map(wg => 
        wg.goalId === goalId && wg.day === day 
          ? { ...wg, completed: !wg.completed }
          : wg
      )
    );
  };

  const addGoalToDay = (goalId: number, day: string) => {
    const exists = weeklyGoals.some(wg => wg.goalId === goalId && wg.day === day);
    if (!exists) {
      setWeeklyGoals(prev => [...prev, { goalId, day, completed: false }]);
    }
  };

  const removeGoalFromDay = (goalId: number, day: string) => {
    setWeeklyGoals(prev => prev.filter(wg => !(wg.goalId === goalId && wg.day === day)));
  };

  const handleNewGoal = () => {
    const newGoal: Goal = {
      id: Math.max(...goals.map(g => g.id)) + 1,
      text: '',
      studentName: 'John Smith',
      status: 'active',
      nextProgressDue: '',
      area: '',
      extractedFromIEP: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setSelectedGoal(newGoal);
    setShowNewGoalForm(true);
  };

  const handleSaveGoal = () => {
    if (!selectedGoal) return;
    
    if (goals.find(g => g.id === selectedGoal.id)) {
      setGoals(goals.map(g => g.id === selectedGoal.id ? selectedGoal : g));
    } else {
      setGoals([...goals, selectedGoal]);
    }
    
    setSelectedGoal(null);
    setShowNewGoalForm(false);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
    setWeeklyGoals(weeklyGoals.filter(wg => wg.goalId !== id));
  };

  const renderGoalList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="text-green" size={24} />
          <h2 className="text-xl font-semibold">IEP Goals Management</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn border border-border hover:bg-bg-secondary flex items-center space-x-2">
            <Upload size={16} />
            <span>Upload IEP</span>
          </button>
          <button 
            onClick={handleNewGoal}
            className="btn bg-green text-white hover:bg-green/90 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add New Goal</span>
          </button>
        </div>
      </div>

      {/* IEP Upload Notice */}
      <div className="bg-green/10 border border-green/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Upload className="text-green mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-green mb-1">Automatic Goal Extraction</h3>
            <p className="text-sm text-text-secondary">
              Upload your student's most recent IEP document and BetterSped will automatically extract and populate their annual goals. 
              You can then review, edit, and refine each goal as needed.
            </p>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="border border-border rounded-lg p-4 hover:border-green/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-green/20 text-green text-sm rounded-full font-medium">
                  {goal.area}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(goal.status)}`}>
                  {goal.status.replace('-', ' ').toUpperCase()}
                </span>
                {goal.extractedFromIEP && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                    Auto-Extracted
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedGoal(goal)}
                  className="p-2 hover:bg-bg-secondary rounded-md transition-colors"
                  aria-label="Edit goal"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-2 hover:bg-bg-secondary rounded-md transition-colors text-red-500"
                  aria-label="Delete goal"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-text-primary mb-3 leading-relaxed">{goal.text}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="p-2 bg-bg-secondary rounded">
                <span className="font-medium text-text-secondary">Baseline:</span>
                <p className="mt-1">{goal.baseline || 'Not specified'}</p>
              </div>
              <div className="p-2 bg-bg-secondary rounded">
                <span className="font-medium text-text-secondary">Target Criteria:</span>
                <p className="mt-1">{goal.targetCriteria || 'Not specified'}</p>
              </div>
              <div className="p-2 bg-bg-secondary rounded">
                <span className="font-medium text-text-secondary">Next Progress Due:</span>
                <p className="mt-1 font-medium text-green">
                  {goal.nextProgressDue ? new Date(goal.nextProgressDue).toLocaleDateString() : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <Target size={48} className="mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No Goals Added Yet</h3>
          <p className="mb-4">Upload an IEP document or manually add goals to get started</p>
          <button 
            onClick={handleNewGoal}
            className="btn bg-green text-white hover:bg-green/90 flex items-center space-x-2 mx-auto"
          >
            <Plus size={16} />
            <span>Add First Goal</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderWeeklyPlanner = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="text-green" size={24} />
          <h2 className="text-xl font-semibold">Weekly Goal Planner</h2>
        </div>
        <button 
          onClick={() => setActiveView('list')}
          className="btn border border-border hover:bg-bg-secondary"
        >
          Back to Goals List
        </button>
      </div>

      <div className="bg-green/10 border border-green/20 rounded-lg p-4">
        <h3 className="font-medium text-green mb-2">Plan Your Week</h3>
        <p className="text-sm text-text-secondary">
          Assign goals to specific days of the week to organize your classroom instruction. 
          Goals assigned to today will automatically appear in your "Today's Goals" dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {weekDays.map(day => (
          <div key={day} className={`border rounded-lg p-4 ${day === today ? 'border-green bg-green/5' : 'border-border'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${day === today ? 'text-green' : 'text-text-primary'}`}>
                {day}
                {day === today && <span className="ml-2 text-xs">(Today)</span>}
              </h3>
              <span className="text-xs text-text-secondary">
                {getGoalsForDay(day).length} goals
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              {getGoalsForDay(day).map(goal => {
                const weeklyGoal = weeklyGoals.find(wg => wg.goalId === goal.id && wg.day === day);
                return (
                  <div key={`${goal.id}-${day}`} className="p-2 bg-bg-secondary rounded text-xs">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium truncate">{goal.area}</span>
                      <button
                        onClick={() => removeGoalFromDay(goal.id, day)}
                        className="text-red-500 hover:text-red-700 ml-1"
                        aria-label="Remove goal"
                      >
                        ×
                      </button>
                    </div>
                    {day === today && (
                      <label className="flex items-center space-x-1 mt-1">
                        <input
                          type="checkbox"
                          checked={weeklyGoal?.completed || false}
                          onChange={() => toggleDailyCompletion(goal.id, day)}
                          className="w-3 h-3 text-green border-border rounded focus:ring-green"
                        />
                        <span className="text-xs">Completed</span>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addGoalToDay(parseInt(e.target.value), day);
                  e.target.value = '';
                }
              }}
              className="w-full text-xs p-2 border border-border rounded bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
            >
              <option value="">+ Add Goal</option>
              {goals
                .filter(goal => !getGoalsForDay(day).some(dg => dg.id === goal.id))
                .map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.area}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTodaysGoals = () => {
    const todaysGoals = getTodaysGoals();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green" size={24} />
            <h2 className="text-xl font-semibold">Today's Goals ({today})</h2>
          </div>
          <button 
            onClick={() => setActiveView('weekly')}
            className="btn bg-green text-white hover:bg-green/90"
          >
            Plan Weekly Goals
          </button>
        </div>

        {todaysGoals.length > 0 ? (
          <div className="space-y-3">
            {todaysGoals.map(goal => {
              const weeklyGoal = weeklyGoals.find(wg => wg.goalId === goal.id && wg.day === today);
              return (
                <div key={goal.id} className={`border rounded-lg p-4 transition-all ${
                  weeklyGoal?.completed ? 'border-green bg-green/5' : 'border-border hover:border-green/30'
                }`}>
                  <div className="flex items-start space-x-3">
                    <label className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={weeklyGoal?.completed || false}
                        onChange={() => toggleDailyCompletion(goal.id, today)}
                        className="w-5 h-5 text-green border-border rounded focus:ring-green"
                      />
                    </label>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-green/20 text-green text-sm rounded-full font-medium">
                          {goal.area}
                        </span>
                        {weeklyGoal?.completed && (
                          <span className="px-2 py-1 bg-green text-white text-xs rounded-full">
                            Completed Today
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${weeklyGoal?.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                        {goal.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-text-secondary">
            <Calendar size={40} className="mx-auto mb-2 opacity-30" />
            <p>No goals scheduled for today</p>
            <button 
              onClick={() => setActiveView('weekly')}
              className="mt-4 btn bg-green text-white hover:bg-green/90"
            >
              Plan Weekly Goals
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderGoalForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {selectedGoal?.id ? 'Edit Goal' : 'Add New Goal'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Goal Area</label>
            <input
              type="text"
              value={selectedGoal?.area || ''}
              onChange={e => setSelectedGoal(prev => prev ? {...prev, area: e.target.value} : null)}
              className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="e.g., Reading Comprehension, Math Problem Solving"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Goal Text</label>
            <textarea
              value={selectedGoal?.text || ''}
              onChange={e => setSelectedGoal(prev => prev ? {...prev, text: e.target.value} : null)}
              className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-24"
              placeholder="Enter the complete IEP goal text..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Baseline</label>
              <textarea
                value={selectedGoal?.baseline || ''}
                onChange={e => setSelectedGoal(prev => prev ? {...prev, baseline: e.target.value} : null)}
                className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-16"
                placeholder="Current performance level..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Target Criteria</label>
              <textarea
                value={selectedGoal?.targetCriteria || ''}
                onChange={e => setSelectedGoal(prev => prev ? {...prev, targetCriteria: e.target.value} : null)}
                className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-16"
                placeholder="Success criteria..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={selectedGoal?.status || 'active'}
                onChange={e => setSelectedGoal(prev => prev ? {...prev, status: e.target.value as any} : null)}
                className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="active">Active</option>
                <option value="achieved">Achieved</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Next Progress Due</label>
              <input
                type="date"
                value={selectedGoal?.nextProgressDue || ''}
                onChange={e => setSelectedGoal(prev => prev ? {...prev, nextProgressDue: e.target.value} : null)}
                className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => {
              setSelectedGoal(null);
              setShowNewGoalForm(false);
            }}
            className="btn border border-border hover:bg-bg-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveGoal}
            className="btn bg-green text-white hover:bg-green/90 flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Goal</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Navigation */}
      <div className="flex items-center space-x-1 bg-bg-secondary rounded-lg p-1">
        <button
          onClick={() => setActiveView('list')}
          className={`px-4 py-2 rounded-md transition-all ${
            activeView === 'list' ? 'bg-green text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Goals List
        </button>
        <button
          onClick={() => setActiveView('today')}
          className={`px-4 py-2 rounded-md transition-all ${
            activeView === 'today' ? 'bg-green text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Today's Goals
        </button>
        <button
          onClick={() => setActiveView('weekly')}
          className={`px-4 py-2 rounded-md transition-all ${
            activeView === 'weekly' ? 'bg-green text-white' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Weekly Planner
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'list' && renderGoalList()}
      {activeView === 'today' && renderTodaysGoals()}
      {activeView === 'weekly' && renderWeeklyPlanner()}

      {/* Goal Form Modal */}
      {(selectedGoal || showNewGoalForm) && renderGoalForm()}
    </div>
  );
};

export default GoalsTab;