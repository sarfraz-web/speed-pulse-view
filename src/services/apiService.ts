
import axios from 'axios';
import { TestResult } from '@/components/SpeedTest/SpeedTestResults';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTestHistory = async (): Promise<TestResult[]> => {
  try {
    const response = await api.get('/api/tests');
    return response.data;
  } catch (error) {
    console.error('Error fetching test history:', error);
    throw error;
  }
};

export const saveTestResult = async (result: TestResult): Promise<TestResult> => {
  try {
    const response = await api.post('/api/tests', result);
    return response.data;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

export const updateTestFeedback = async (id: string, feedback: string): Promise<TestResult> => {
  try {
    const response = await api.patch(`/api/tests/${id}`, { feedback });
    return response.data;
  } catch (error) {
    console.error('Error updating test feedback:', error);
    throw error;
  }
};

export default {
  fetchTestHistory,
  saveTestResult,
  updateTestFeedback,
};
