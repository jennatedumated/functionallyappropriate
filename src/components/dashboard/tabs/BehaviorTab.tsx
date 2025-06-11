import React, { useState } from 'react';
import { Brain, Award, TrendingUp, AlertTriangle, Plus, Minus } from 'lucide-react';

const BehaviorTab: React.FC = () => {
  const [tokens, setTokens] = useState(15);
  
  const behaviorData = [
    { date: '2025-01-15', positive: 8, negative: 2, notes: 'Great participation in group work' },
    { date: '2025-01-14', positive: 6, negative: 3, notes: 'Needed reminders for transitions' },
    { date: '2025-01-13', positive: 9, negative: 1, notes: 'Excellent self-regulation' },
    { date: '2025-01-12', positive: 5, negative: 4, notes: 'Difficulty with math frustration' },
    { date: '2025-01-11', positive: 7, negative: 2, notes: 'Used coping strategies effectively' },
  ];

  const reinforcementInventory = [
    { item: 'Computer Time', cost: 5, available: true },
    { item: 'Helper Badge', cost: 3, available: true },
    { item: 'Free Choice Activity', cost: 4, available: true },
    { item: 'Extra Recess', cost: 6, available: false },
    { item: 'Lunch with Teacher', cost: 8, available: true },
    { item: 'Special Pencil', cost: 2, available: true },
  ];

  const copingStrategies = [
    { strategy: 'Deep Breathing', effectiveness: 85, lastUsed: '2025-01-15' },
    { strategy: 'Fidget Tool', effectiveness: 70, lastUsed: '2025-01-14' },
    { strategy: 'Movement Break', effectiveness: 90, lastUsed: '2025-01-15' },
    { strategy: 'Quiet Space', effectiveness: 75, lastUsed: '2025-01-13' },
  ];

  const handleTokenChange = (change: number) => {
    setTokens(Math.max(0, tokens + change));
  };

  const handleRedemption = (cost: number) => {
    if (tokens >= cost) {
      setTokens(tokens - cost);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Token System</h3>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-purple mb-2">{tokens}</div>
            <p className="text-text-secondary">Tokens Available</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => handleTokenChange(-1)}
              className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => handleTokenChange(1)}
              className="w-10 h-10 bg-green hover:bg-green/80 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Recent Earnings:</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Completed math worksheet</span>
                <span className="text-green">+2</span>
              </div>
              <div className="flex justify-between">
                <span>Helped classmate</span>
                <span className="text-green">+1</span>
              </div>
              <div className="flex justify-between">
                <span>Used coping strategy</span>
                <span className="text-green">+1</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Behavior Tracking</h3>
          </div>
          
          <div className="space-y-3">
            {behaviorData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-1">
                    <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green text-sm">+{day.positive}</span>
                      <span className="text-red-500 text-sm">-{day.negative}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">{day.notes}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple">
                    {day.positive - day.negative > 0 ? '+' : ''}{day.positive - day.negative}
                  </div>
                  <div className="text-xs text-text-secondary">Net</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Reinforcement Inventory</h3>
          </div>
          
          <div className="space-y-2">
            {reinforcementInventory.map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                item.available && tokens >= item.cost
                  ? 'border-green bg-green/5'
                  : 'border-border bg-bg-secondary'
              }`}>
                <div>
                  <span className="font-medium">{item.item}</span>
                  <div className="text-sm text-text-secondary">
                    {item.cost} tokens
                  </div>
                </div>
                <button
                  onClick={() => handleRedemption(item.cost)}
                  disabled={!item.available || tokens < item.cost}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    item.available && tokens >= item.cost
                      ? 'bg-purple text-white hover:bg-purple/80'
                      : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
                  }`}
                >
                  {item.available ? 'Redeem' : 'Unavailable'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Coping Strategies</h3>
          </div>
          
          <div className="space-y-3">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{strategy.strategy}</span>
                  <span className="text-sm text-text-secondary">
                    {strategy.effectiveness}% effective
                  </span>
                </div>
                <div className="w-full bg-bg-primary rounded-full h-2 mb-2">
                  <div 
                    className="bg-purple h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${strategy.effectiveness}%` }}
                  ></div>
                </div>
                <div className="text-xs text-text-secondary">
                  Last used: {new Date(strategy.lastUsed).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-purple/10 border border-purple/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle size={16} className="text-purple mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Recommendation</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Movement breaks are most effective. Consider increasing frequency during math activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorTab;