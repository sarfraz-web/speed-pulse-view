
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SpeedGaugeProps {
  value: number;
  max: number;
  title: string;
  unit: string;
  isActive: boolean;
  color?: string;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ 
  value, 
  max, 
  title, 
  unit, 
  isActive, 
  color = 'from-blue-500 to-indigo-600'
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Calculate percentage (capped at 100%)
  const percentage = Math.min((value / max) * 100, 100);
  
  // Convert percentage to a rotation value (180 degrees is full)
  const rotation = (percentage / 100) * 180;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(0);
    }
  }, [value, isActive]);

  return (
    <Card className="bg-pingo-card border-none shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center mb-2">
          <h3 className="text-lg font-medium text-gray-300">{title}</h3>
        </div>
        
        <div className="gauge-container w-40 h-40 mx-auto">
          {/* Background semi-circle */}
          <div className="absolute w-40 h-20 overflow-hidden">
            <div className="absolute w-40 h-40 rounded-full border-[15px] border-gray-700"></div>
          </div>
          
          {/* Foreground semi-circle */}
          <div className="absolute w-40 h-20 overflow-hidden">
            <div 
              className={`absolute w-40 h-40 rounded-full border-[15px] border-transparent border-t-0 border-r-0 border-b-0 bg-gradient-to-r ${color} gauge-progress`}
              style={{ 
                transform: `rotate(${-90 + rotation}deg)`,
                transition: isActive ? 'transform 0.5s ease-out' : 'none',
              }}
            ></div>
          </div>
          
          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-bold">
              {isActive ? animatedValue.toFixed(1) : '—'}
            </div>
            <div className="text-sm text-gray-400">{unit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedGauge;
