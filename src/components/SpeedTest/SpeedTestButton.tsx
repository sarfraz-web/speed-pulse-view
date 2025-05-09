
import React from 'react';
import { Button } from '@/components/ui/button';

interface SpeedTestButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
}

const SpeedTestButton: React.FC<SpeedTestButtonProps> = ({ isRunning, onStart, onStop }) => {
  return (
    <div className="flex justify-center mt-8 mb-12">
      <Button
        onClick={isRunning ? onStop : onStart}
        className={`speedtest-button px-8 py-6 text-lg font-medium ${
          isRunning
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
        }`}
      >
        {isRunning ? 'Stop Test' : 'Start Speed Test'}
      </Button>
    </div>
  );
};

export default SpeedTestButton;
