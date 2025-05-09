
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SpeedTestButton from '@/components/SpeedTest/SpeedTestButton';
import SpeedGauge from '@/components/SpeedTest/SpeedGauge';
import ProgressIndicator from '@/components/SpeedTest/ProgressIndicator';
import SpeedTestResults, { TestResult } from '@/components/SpeedTest/SpeedTestResults';
import socketService from '@/services/socketService';
import { saveTestResult, updateTestFeedback } from '@/services/apiService';
import { toast } from 'sonner';

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  
  useEffect(() => {
    // Connect to socket when component mounts
    socketService.connect();
    
    const handleProgress = (data: any) => {
      setStage(data.stage);
      setProgress(data.progress);
      
      if (data.speeds) {
        if (data.speeds.download !== undefined) setDownloadSpeed(data.speeds.download);
        if (data.speeds.upload !== undefined) setUploadSpeed(data.speeds.upload);
        if (data.speeds.ping !== undefined) setPing(data.speeds.ping);
        if (data.speeds.jitter !== undefined) setJitter(data.speeds.jitter);
      }
    };
    
    const handleComplete = async (result: TestResult) => {
      setIsRunning(false);
      setStage('complete');
      
      // Save final values
      setDownloadSpeed(result.download);
      setUploadSpeed(result.upload);
      setPing(result.ping);
      setJitter(result.jitter);
      
      try {
        // Save the test result to the database
        const savedResult = await saveTestResult({
          ...result,
          timestamp: new Date()
        });
        setTestResult(savedResult);
        toast.success("Test completed successfully");
      } catch (error) {
        console.error("Failed to save test result:", error);
        toast.error("Failed to save test result");
        setTestResult(result);
      }
    };
    
    const handleError = (error: any) => {
      setIsRunning(false);
      setStage('idle');
      toast.error(`Test failed: ${error.message}`);
    };
    
    socketService.on('speedtest.progress', handleProgress);
    socketService.on('speedtest.complete', handleComplete);
    socketService.on('speedtest.error', handleError);
    
    return () => {
      socketService.off('speedtest.progress', handleProgress);
      socketService.off('speedtest.complete', handleComplete);
      socketService.off('speedtest.error', handleError);
    };
  }, []);
  
  const handleStartTest = () => {
    setIsRunning(true);
    setStage('ping');
    setProgress(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setJitter(0);
    setTestResult(null);
    
    socketService.startTest();
  };
  
  const handleStopTest = () => {
    setIsRunning(false);
    socketService.stopTest();
  };
  
  const handleSaveFeedback = async (feedback: string) => {
    if (!testResult || !testResult.id) return;
    
    try {
      const updatedResult = await updateTestFeedback(testResult.id, feedback);
      setTestResult(updatedResult);
    } catch (error) {
      console.error("Failed to save feedback:", error);
      toast.error("Failed to save feedback");
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Test Your Internet Speed
          </h1>
          <p className="text-gray-400">
            Fast, reliable speed testing with real-time metrics and detailed results
          </p>
        </div>
        
        <SpeedTestButton
          isRunning={isRunning}
          onStart={handleStartTest}
          onStop={handleStopTest}
        />
        
        <ProgressIndicator
          isRunning={isRunning}
          stage={stage}
          progress={progress}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <SpeedGauge
            value={downloadSpeed}
            max={100}
            title="Download"
            unit="Mbps"
            isActive={isRunning && (stage === 'download' || stage === 'complete')}
            color="from-blue-500 to-indigo-600"
          />
          <SpeedGauge
            value={uploadSpeed}
            max={50}
            title="Upload"
            unit="Mbps"
            isActive={isRunning && (stage === 'upload' || stage === 'complete')}
            color="from-purple-500 to-indigo-600"
          />
          <SpeedGauge
            value={ping}
            max={200}
            title="Ping"
            unit="ms"
            isActive={isRunning && (stage === 'ping' || stage === 'complete')}
            color="from-amber-500 to-orange-600"
          />
          <SpeedGauge
            value={jitter}
            max={50}
            title="Jitter"
            unit="ms"
            isActive={isRunning && stage === 'complete'}
            color="from-green-500 to-teal-600"
          />
        </div>
        
        {testResult && (
          <SpeedTestResults
            result={testResult}
            onSaveFeedback={handleSaveFeedback}
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
