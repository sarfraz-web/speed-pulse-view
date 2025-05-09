
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchTestHistory } from '@/services/apiService';
import TestHistoryItem from '@/components/SpeedTest/TestHistoryItem';
import type { TestResult } from '@/components/SpeedTest/SpeedTestResults';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

const History = () => {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const data = await fetchTestHistory();
        setHistory(data);
      } catch (error) {
        console.error('Failed to load test history:', error);
        toast.error('Failed to load test history');
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, []);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Test History
          </h1>
          <p className="text-gray-400">
            View your previous speed test results
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-400">Loading history...</span>
          </div>
        ) : history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((result) => (
              <TestHistoryItem key={result.id} result={result} />
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-pingo-card border-none text-center">
            <p className="text-gray-400">No test results found</p>
            <p className="mt-2">
              <a href="/" className="text-blue-500 hover:underline">
                Run your first speed test
              </a>
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default History;
