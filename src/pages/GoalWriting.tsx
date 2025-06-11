import React, { useState } from 'react';
import { Target, Plus, Save, Trash2, History, TrendingUp, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Goal {
  id: number;
  area: string;
  description: string;
  baseline: string;
  targetDate: string;
  status?: 'met' | 'partially-met' | 'not-met' | 'in-progress';
  iepYear?: string;
  finalProgress?: string;
  carryOver?: boolean;
}

interface IEPHistory {
  year: string;
  dateRange: string;
  goals: Goal[];
  overallProgress: number;
}

const GoalWriting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      area: 'Reading Comprehension',
      description: 'Student will identify the main idea and three supporting details in grade-level text with 80% accuracy in 3 out of 4 trials.',
      baseline: 'Currently identifies main idea with 40% accuracy',
      targetDate: '2025-06-15',
      status: 'in-progress',
    },
    {
      id: 2,
      area: 'Social Skills',
      description: 'Student will initiate appropriate peer interactions during unstructured activities at least 4 times per day for 4 consecutive weeks.',
      baseline: 'Currently initiates interactions 1-2 times per day',
      targetDate: '2025-05-30',
      status: 'in-progress',
    },
  ]);

  // Previous IEP Goals History (last 3 years)
  const [iepHistory] = useState<IEPHistory[]>([
    {
      year: '2024-2025',
      dateRange: 'September 2024 - September 2025',
      overallProgress: 75,
      goals: [
        {
          id: 101,
          area: 'Reading Comprehension',
          description: 'Student will identify the main idea and three supporting details in grade-level text with 80% accuracy in 3 out of 4 trials.',
          baseline: 'Currently identifies main idea with 40% accuracy',
          targetDate: '2025-06-15',
          status: 'in-progress',
          iepYear: '2024-2025',
          finalProgress: 'Currently at 65% accuracy - showing steady improvement',
        },
        {
          id: 102,
          area: 'Social Skills',
          description: 'Student will initiate appropriate peer interactions during unstructured activities at least 4 times per day for 4 consecutive weeks.',
          baseline: 'Currently initiates interactions 1-2 times per day',
          targetDate: '2025-05-30',
          status: 'in-progress',
          iepYear: '2024-2025',
          finalProgress: 'Currently initiating 3-4 interactions per day consistently',
        },
        {
          id: 103,
          area: 'Written Expression',
          description: 'Student will write a 5-sentence paragraph with topic sentence, 3 supporting details, and conclusion with 70% accuracy.',
          baseline: 'Currently writes 2-3 sentence responses',
          targetDate: '2025-04-15',
          status: 'partially-met',
          iepYear: '2024-2025',
          finalProgress: 'Consistently writes 4-sentence paragraphs, working on conclusion sentences',
        },
      ],
    },
    {
      year: '2023-2024',
      dateRange: 'September 2023 - September 2024',
      overallProgress: 82,
      goals: [
        {
          id: 201,
          area: 'Reading Comprehension',
          description: 'Student will answer literal comprehension questions about grade-level text with 70% accuracy in 4 out of 5 trials.',
          baseline: 'Currently answers literal questions with 35% accuracy',
          targetDate: '2024-06-15',
          status: 'met',
          iepYear: '2023-2024',
          finalProgress: 'Goal met - consistently achieving 75-80% accuracy on literal comprehension',
        },
        {
          id: 202,
          area: 'Math Calculation',
          description: 'Student will solve single-digit addition problems with regrouping with 80% accuracy.',
          baseline: 'Currently solves addition without regrouping with 60% accuracy',
          targetDate: '2024-05-30',
          status: 'met',
          iepYear: '2023-2024',
          finalProgress: 'Goal exceeded - achieving 85% accuracy with regrouping',
        },
        {
          id: 203,
          area: 'Social Skills',
          description: 'Student will use appropriate greetings with peers and adults 8 out of 10 opportunities.',
          baseline: 'Currently uses greetings 3 out of 10 opportunities',
          targetDate: '2024-04-15',
          status: 'partially-met',
          iepYear: '2023-2024',
          finalProgress: 'Uses greetings 6-7 out of 10 opportunities - continued focus needed',
          carryOver: true,
        },
        {
          id: 204,
          area: 'Fine Motor',
          description: 'Student will write legible letters and numbers on lined paper with appropriate sizing.',
          baseline: 'Letters are inconsistent in size and often illegible',
          targetDate: '2024-06-01',
          status: 'not-met',
          iepYear: '2023-2024',
          finalProgress: 'Some improvement in letter formation but still needs significant support',
        },
      ],
    },
    {
      year: '2022-2023',
      dateRange: 'September 2022 - September 2023',
      overallProgress: 68,
      goals: [
        {
          id: 301,
          area: 'Reading Fluency',
          description: 'Student will read grade-level text at 60 words per minute with 90% accuracy.',
          baseline: 'Currently reads at 25 words per minute with 70% accuracy',
          targetDate: '2023-06-15',
          status: 'partially-met',
          iepYear: '2022-2023',
          finalProgress: 'Achieved 45 words per minute with 85% accuracy',
        },
        {
          id: 302,
          area: 'Math Problem Solving',
          description: 'Student will solve one-step word problems involving addition and subtraction with 70% accuracy.',
          baseline: 'Currently solves word problems with 30% accuracy',
          targetDate: '2023-05-30',
          status: 'met',
          iepYear: '2022-2023',
          finalProgress: 'Goal met - consistently solving problems with 75% accuracy',
        },
        {
          id: 303,
          area: 'Behavior',
          description: 'Student will remain in seat during instruction for 15-minute intervals without reminders.',
          baseline: 'Currently remains seated for 5-7 minutes before needing reminders',
          targetDate: '2023-04-15',
          status: 'met',
          iepYear: '2022-2023',
          finalProgress: 'Goal exceeded - can remain seated for 20+ minute intervals',
        },
        {
          id: 304,
          area: 'Communication',
          description: 'Student will request help using complete sentences in 8 out of 10 opportunities.',
          baseline: 'Currently requests help using gestures or single words',
          targetDate: '2023-06-01',
          status: 'partially-met',
          iepYear: '2022-2023',
          finalProgress: 'Uses 3-4 word phrases to request help in 6 out of 10 opportunities',
        },
      ],
    },
  ]);
  
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [activeHistoryYear, setActiveHistoryYear] = useState<string>('2024-2025');
  const [showHistory, setShowHistory] = useState(false);
  
  const goalAreas = [
    'Reading Comprehension',
    'Reading Fluency',
    'Written Expression',
    'Math Calculation',
    'Math Problem Solving',
    'Social Skills',
    'Behavior',
    'Communication',
    'Adaptive Skills',
    'Fine Motor',
    'Gross Motor',
  ];
  
  const handleNewGoal = () => {
    const newGoal: Goal = {
      id: goals.length ? Math.max(...goals.map(g => g.id)) + 1 : 1,
      area: '',
      description: '',
      baseline: '',
      targetDate: '',
      status: 'in-progress',
    };
    
    setSelectedGoal(newGoal);
  };
  
  const handleSaveGoal = () => {
    if (!selectedGoal) return;
    
    if (goals.find(g => g.id === selectedGoal.id)) {
      setGoals(goals.map(g => g.id === selectedGoal.id ? selectedGoal : g));
    } else {
      setGoals([...goals, selectedGoal]);
    }
    
    setSelectedGoal(null);
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
    if (selectedGoal?.id === id) {
      setSelectedGoal(null);
    }
  };

  const handleCarryOverGoal = (historicalGoal: Goal) => {
    const newGoal: Goal = {
      id: goals.length ? Math.max(...goals.map(g => g.id)) + 1 : 1,
      area: historicalGoal.area,
      description: historicalGoal.description,
      baseline: historicalGoal.finalProgress || historicalGoal.baseline,
      targetDate: new Date(new Date().getFullYear() + 1, 5, 15).toISOString().split('T')[0],
      status: 'in-progress',
    };
    
    setSelectedGoal(newGoal);
    setShowHistory(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'met':
        return 'text-green bg-green/10 border-green/20';
      case 'partially-met':
        return 'text-gold bg-gold/10 border-gold/20';
      case 'not-met':
        return 'text-red-500 bg-red-50 border-red-200';
      case 'in-progress':
        return 'text-purple bg-purple/10 border-purple/20';
      default:
        return 'text-text-secondary bg-bg-secondary border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'met':
        return <CheckCircle size={16} className="text-green" />;
      case 'partially-met':
        return <Clock size={16} className="text-gold" />;
      case 'not-met':
        return <XCircle size={16} className="text-red-500" />;
      case 'in-progress':
        return <TrendingUp size={16} className="text-purple" />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Goal Writing</h1>
        <div className="flex gap-3">
          <button 
            className="btn border border-border hover:bg-bg-secondary"
            onClick={() => setShowHistory(!showHistory)}
          >
            <span className="flex items-center gap-1">
              <History size={18} />
              {showHistory ? 'Hide' : 'View'} IEP History
            </span>
          </button>
          <button className="btn bg-accent-green" onClick={handleNewGoal}>
            <span className="flex items-center gap-1">
              <Plus size={18} />
              New Goal
            </span>
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="mb-6 card">
          <div className="flex items-center gap-2 mb-4">
            <History className="text-purple" size={22} />
            <h2 className="text-xl font-medium">Previous IEP Goals (Last 3 Years)</h2>
          </div>
          
          <div className="flex gap-2 mb-4">
            {iepHistory.map(year => (
              <button
                key={year.year}
                onClick={() => setActiveHistoryYear(year.year)}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeHistoryYear === year.year
                    ? 'bg-purple text-white'
                    : 'border border-border hover:border-purple/30'
                }`}
              >
                {year.year}
              </button>
            ))}
          </div>

          {iepHistory
            .filter(year => year.year === activeHistoryYear)
            .map(yearData => (
              <div key={yearData.year}>
                <div className="flex items-center justify-between mb-4 p-3 bg-bg-secondary rounded-lg">
                  <div>
                    <h3 className="font-medium">{yearData.dateRange}</h3>
                    <p className="text-sm text-text-secondary">
                      Overall Progress: {yearData.overallProgress}%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple">{yearData.goals.length}</div>
                    <div className="text-xs text-text-secondary">Goals</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {yearData.goals.map(goal => (
                    <div key={goal.id} className="border border-border rounded-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-purple text-white text-xs rounded-md">
                            {goal.area}
                          </span>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs border ${getStatusColor(goal.status || 'in-progress')}`}>
                            {getStatusIcon(goal.status || 'in-progress')}
                            <span className="capitalize">{goal.status?.replace('-', ' ')}</span>
                          </div>
                          {goal.carryOver && (
                            <span className="px-2 py-1 bg-gold text-black text-xs rounded-md">
                              Carried Over
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleCarryOverGoal(goal)}
                          className="px-3 py-1 bg-green text-white text-xs rounded-md hover:bg-green/80 transition-colors"
                        >
                          Use as Template
                        </button>
                      </div>
                      
                      <p className="text-sm mb-3">{goal.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-bg-secondary rounded">
                          <span className="font-medium">Original Baseline:</span>
                          <p className="mt-1">{goal.baseline}</p>
                        </div>
                        <div className="p-2 bg-bg-secondary rounded">
                          <span className="font-medium">Final Progress:</span>
                          <p className="mt-1">{goal.finalProgress}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedGoal ? (
            <div className="card">
              <h2 className="text-xl font-medium mb-4">
                {selectedGoal.id ? `Edit Goal #${selectedGoal.id}` : 'Create New Goal'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Area</label>
                  <select
                    value={selectedGoal.area}
                    onChange={e => setSelectedGoal({...selectedGoal, area: e.target.value})}
                    className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                  >
                    <option value="">Select Goal Area</option>
                    {goalAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Description</label>
                  <textarea
                    value={selectedGoal.description}
                    onChange={e => setSelectedGoal({...selectedGoal, description: e.target.value})}
                    className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-24"
                    placeholder="e.g., Student will... with X% accuracy..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Current Baseline</label>
                  <textarea
                    value={selectedGoal.baseline}
                    onChange={e => setSelectedGoal({...selectedGoal, baseline: e.target.value})}
                    className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green h-16"
                    placeholder="Describe current performance level..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Target Date</label>
                  <input
                    type="date"
                    value={selectedGoal.targetDate}
                    onChange={e => setSelectedGoal({...selectedGoal, targetDate: e.target.value})}
                    className="w-full p-2 border border-border rounded-md bg-bg-primary focus:outline-none focus:ring-2 focus:ring-green"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    className="btn border border-border hover:bg-bg-secondary"
                    onClick={() => setSelectedGoal(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn bg-accent-green"
                    onClick={handleSaveGoal}
                    disabled={!selectedGoal.area || !selectedGoal.description}
                  >
                    <span className="flex items-center gap-1">
                      <Save size={16} />
                      Save Goal
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <Target className="text-green" size={22} />
                <h2 className="text-xl font-medium">Current IEP Goals (2024-2025)</h2>
              </div>
              
              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map(goal => (
                    <div key={goal.id} className="border border-border rounded-md p-4 hover:border-green transition-all">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <span className="px-2 py-1 bg-green text-white text-xs rounded-md">
                            {goal.area}
                          </span>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs border ${getStatusColor(goal.status || 'in-progress')}`}>
                            {getStatusIcon(goal.status || 'in-progress')}
                            <span className="capitalize">{goal.status?.replace('-', ' ')}</span>
                          </div>
                          Goal #{goal.id}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-1.5 hover:bg-bg-secondary rounded-md transition-colors" 
                            onClick={() => setSelectedGoal(goal)}
                            aria-label="Edit goal"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                          </button>
                          <button 
                            className="p-1.5 hover:bg-bg-secondary rounded-md transition-colors text-red-500" 
                            onClick={() => handleDeleteGoal(goal.id)}
                            aria-label="Delete goal"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-text-secondary">
                        <p>{goal.description}</p>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="border border-border rounded p-2">
                          <span className="font-medium">Baseline:</span> {goal.baseline}
                        </div>
                        <div className="border border-border rounded p-2">
                          <span className="font-medium">Target Date:</span> {new Date(goal.targetDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-secondary">
                  <Target size={40} className="mx-auto mb-2 opacity-30" />
                  <p>No goals have been created yet</p>
                  <button 
                    className="mt-4 btn bg-accent-green"
                    onClick={handleNewGoal}
                  >
                    <span className="flex items-center gap-1">
                      <Plus size={16} />
                      Create First Goal
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-medium mb-4">Goal Bank</h2>
            <p className="text-text-secondary mb-4">Use these pre-written templates to quickly create common IEP goals.</p>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-green rounded-md hover:bg-green hover:bg-opacity-5 transition-all">
                <h3 className="font-medium">Reading Fluency</h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  Student will read grade-level text at [X] words per minute with [Y]% accuracy.
                </p>
              </button>
              
              <button className="w-full text-left p-3 border border-green rounded-md hover:bg-green hover:bg-opacity-5 transition-all">
                <h3 className="font-medium">Math Problem Solving</h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  Student will solve multi-step word problems involving [operation] with [X]% accuracy.
                </p>
              </button>
              
              <button className="w-full text-left p-3 border border-green rounded-md hover:bg-green hover:bg-opacity-5 transition-all">
                <h3 className="font-medium">Written Expression</h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  Student will write [X]-paragraph essays with appropriate organization and details.
                </p>
              </button>
              
              <button className="w-full text-left p-3 border border-green rounded-md hover:bg-green hover:bg-opacity-5 transition-all">
                <h3 className="font-medium">Self-Regulation</h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  Student will identify and use [X] coping strategies when feeling frustrated or anxious.
                </p>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-purple" size={20} />
              <h3 className="text-lg font-medium">Progress Trends</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-green/10 border border-green/20 rounded-lg">
                <h4 className="font-medium text-sm text-green">Strengths</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Math goals consistently met or exceeded across all IEP years
                </p>
              </div>
              
              <div className="p-3 bg-gold/10 border border-gold/20 rounded-lg">
                <h4 className="font-medium text-sm text-gold">Areas for Focus</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Social skills goals need continued attention and modified approaches
                </p>
              </div>
              
              <div className="p-3 bg-purple/10 border border-purple/20 rounded-lg">
                <h4 className="font-medium text-sm text-purple">Recommendations</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Consider breaking down complex goals into smaller, measurable steps
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-medium mb-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Goal Writing Tips
            </h3>
            <ul className="text-sm space-y-2 text-text-secondary">
              <li>• Include measurable criteria for success</li>
              <li>• Specify conditions under which the skill will be performed</li>
              <li>• Include a timeframe for achievement</li>
              <li>• Ensure goals are appropriate and achievable</li>
              <li>• Build upon previous year's progress</li>
              <li>• Consider carrying over partially met goals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalWriting;