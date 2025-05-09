
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { formatDistance } from 'date-fns';

export interface TestResult {
  id?: string;
  timestamp: Date;
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  isp?: string;
  location?: string;
  feedback?: string;
}

interface SpeedTestResultsProps {
  result: TestResult | null;
  onSaveFeedback: (feedback: string) => void;
}

const SpeedTestResults: React.FC<SpeedTestResultsProps> = ({ result, onSaveFeedback }) => {
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();
  
  if (!result) return null;
  
  const handleSubmitFeedback = () => {
    onSaveFeedback(feedback);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    setFeedback('');
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Test Results</h2>
      
      <Card className="bg-pingo-card border-none shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-400">Download</div>
              <div className="text-2xl font-bold">{result.download.toFixed(2)} <span className="text-sm">Mbps</span></div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Upload</div>
              <div className="text-2xl font-bold">{result.upload.toFixed(2)} <span className="text-sm">Mbps</span></div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Ping</div>
              <div className="text-2xl font-bold">{result.ping} <span className="text-sm">ms</span></div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Jitter</div>
              <div className="text-2xl font-bold">{result.jitter} <span className="text-sm">ms</span></div>
            </div>
          </div>
          
          {(result.isp || result.location) && (
            <div className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.isp && (
                <div>
                  <div className="text-sm text-gray-400">Internet Service Provider</div>
                  <div className="font-medium">{result.isp}</div>
                </div>
              )}
              {result.location && (
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="font-medium">{result.location}</div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-400 text-center">
            Test completed {formatDistance(new Date(result.timestamp), new Date(), { addSuffix: true })}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-700 p-6 flex flex-col">
          <div className="mb-2 w-full">
            <label htmlFor="feedback" className="text-sm text-gray-400">How was your experience?</label>
            <Textarea 
              id="feedback"
              placeholder="Share your thoughts about your internet speed or this test..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button 
            onClick={handleSubmitFeedback}
            className="ml-auto mt-2"
          >
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpeedTestResults;
