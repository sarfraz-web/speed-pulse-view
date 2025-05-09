
import React from 'react';
import { Card } from '@/components/ui/card';

interface ProgressIndicatorProps {
  isRunning: boolean;
  stage: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  isRunning, 
  stage, 
  progress 
}) => {
  
  const getStageLabel = () => {
    switch(stage) {
      case 'idle':
        return 'Ready';
      case 'ping':
        return 'Measuring ping';
      case 'download':
        return 'Testing download speed';
      case 'upload':
        return 'Testing upload speed';
      case 'complete':
        return 'Test complete';
      default:
        return '';
    }
  };
  
  const stages = ['ping', 'download', 'upload'];
  const currentStageIndex = stages.indexOf(stage);
  
  return (
    <Card className="bg-pingo-card border-none shadow-lg p-4 mb-8">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-gray-300">
          {getStageLabel()}
        </h3>
        
        {isRunning && stage !== 'idle' && stage !== 'complete' && (
          <div className="text-sm text-gray-400">
            {Math.round(progress)}% complete
          </div>
        )}
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        {isRunning && stage !== 'idle' && (
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        )}
      </div>
      
      <div className="flex justify-between mt-2">
        {stages.map((s, index) => (
          <div 
            key={s}
            className={`flex flex-col items-center ${
              currentStageIndex >= index ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div 
              className={`w-3 h-3 rounded-full mb-1 ${
                currentStageIndex >= index ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            ></div>
            <span className="text-xs capitalize">{s}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressIndicator;
