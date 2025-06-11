import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { User, Award, Clock, MessageCircle } from 'lucide-react';

interface StudentProfileProps {
  student: {
    id: number;
    name: string;
    grade: string;
    program: string;
    avatar?: string;
    dailyProgress: number;
    tokens: number;
    nextBreak?: string;
  };
  onSensoryBreak: () => void;
  onAddToken: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ 
  student, 
  onSensoryBreak, 
  onAddToken 
}) => {
  return (
    <div className="bg-gradient-to-br from-purple to-purple/80 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {student.avatar ? (
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-16 h-16 rounded-full border-4 border-white/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/20">
                <User size={24} className="text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-white/80">{student.grade} Grade • {student.program}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
            <Award size={16} />
            <span className="font-medium">{student.tokens}</span>
          </div>
          <button
            onClick={onAddToken}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-3">
            <CircularProgressbar
              value={student.dailyProgress}
              text={`${student.dailyProgress}%`}
              styles={buildStyles({
                textColor: 'white',
                pathColor: 'white',
                trailColor: 'rgba(255, 255, 255, 0.2)',
                textSize: '16px',
              })}
            />
          </div>
          <p className="text-sm text-white/80 text-center">Daily Goals</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={onSensoryBreak}
            className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 rounded-lg py-3 px-4 transition-colors"
          >
            <Clock size={18} />
            <span>Sensory Break</span>
          </button>
          
          <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg py-2 px-4">
            <MessageCircle size={16} />
            <span className="text-sm">Next: {student.nextBreak || '2:30 PM'}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/80">This Week:</span>
            <span className="font-medium">4/5 Goals</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Tokens Earned:</span>
            <span className="font-medium">{student.tokens}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Behavior:</span>
            <span className="font-medium text-green">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;