
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import type { TestResult } from './SpeedTestResults';

interface TestHistoryItemProps {
  result: TestResult;
}

const TestHistoryItem: React.FC<TestHistoryItemProps> = ({ result }) => {
  return (
    <Card className="result-card bg-pingo-card border-none shadow-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            {formatDistance(new Date(result.timestamp), new Date(), { addSuffix: true })}
          </span>
          {result.isp && <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">{result.isp}</span>}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-xs text-gray-400">Download</div>
            <div className="font-bold">{result.download.toFixed(2)} <span className="text-xs">Mbps</span></div>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-xs text-gray-400">Upload</div>
            <div className="font-bold">{result.upload.toFixed(2)} <span className="text-xs">Mbps</span></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-400">Ping:</span> {result.ping} ms
          </div>
          <div>
            <span className="text-gray-400">Jitter:</span> {result.jitter} ms
          </div>
        </div>
        
        {result.feedback && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400">Feedback</div>
            <div className="text-sm italic">{result.feedback}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestHistoryItem;
