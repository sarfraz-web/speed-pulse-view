
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const speedTest = require('speedtest-net');
require('dotenv').config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pingo';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Load models
const TestResult = require('./models/TestResult');

// API Routes
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await TestResult.find().sort({ timestamp: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tests', async (req, res) => {
  try {
    const newTest = new TestResult(req.body);
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/tests/:id', async (req, res) => {
  try {
    const updatedTest = await TestResult.findByIdAndUpdate(
      req.params.id,
      { feedback: req.body.feedback },
      { new: true }
    );
    res.json(updatedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected');
  
  let testRunning = false;
  let testAborted = false;
  
  socket.on('speedtest.start', async () => {
    if (testRunning) {
      socket.emit('speedtest.error', { message: 'Test already running' });
      return;
    }
    
    testRunning = true;
    testAborted = false;
    
    try {
      // Ping stage
      socket.emit('speedtest.progress', {
        stage: 'ping',
        progress: 0,
      });
      
      // Simulated ping test
      await simulateProgress(0, 100, 500, (progress) => {
        if (testAborted) throw new Error('Test aborted');
        socket.emit('speedtest.progress', {
          stage: 'ping',
          progress,
          speeds: { ping: Math.floor(Math.random() * 20) + 10 }
        });
      });
      
      // Download stage
      socket.emit('speedtest.progress', {
        stage: 'download',
        progress: 0,
      });
      
      // Simulated download test
      let downloadSpeed = 0;
      await simulateProgress(0, 100, 1500, (progress) => {
        if (testAborted) throw new Error('Test aborted');
        downloadSpeed = Math.floor(Math.random() * 50) + 50; // Simulated download speed
        socket.emit('speedtest.progress', {
          stage: 'download',
          progress,
          speeds: { 
            download: downloadSpeed,
            ping: Math.floor(Math.random() * 20) + 10
          }
        });
      });
      
      // Upload stage
      socket.emit('speedtest.progress', {
        stage: 'upload',
        progress: 0,
      });
      
      // Simulated upload test
      let uploadSpeed = 0;
      await simulateProgress(0, 100, 1000, (progress) => {
        if (testAborted) throw new Error('Test aborted');
        uploadSpeed = Math.floor(Math.random() * 30) + 20; // Simulated upload speed
        socket.emit('speedtest.progress', {
          stage: 'upload',
          progress,
          speeds: { 
            download: downloadSpeed,
            upload: uploadSpeed,
            ping: Math.floor(Math.random() * 20) + 10,
            jitter: Math.floor(Math.random() * 5) + 1
          }
        });
      });
      
      // Complete stage
      const result = {
        download: downloadSpeed,
        upload: uploadSpeed,
        ping: Math.floor(Math.random() * 20) + 10,
        jitter: Math.floor(Math.random() * 5) + 1,
        timestamp: new Date(),
        isp: 'Sample ISP'
      };
      
      socket.emit('speedtest.complete', result);
      testRunning = false;
      
      // In production, we'd store this to MongoDB
      // await new TestResult(result).save();
      
    } catch (error) {
      console.error('Speed test error:', error);
      socket.emit('speedtest.error', { message: error.message });
      testRunning = false;
    }
  });
  
  socket.on('speedtest.stop', () => {
    testAborted = true;
    testRunning = false;
    socket.emit('speedtest.error', { message: 'Test aborted by user' });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    testRunning = false;
  });
});

// Helper function to simulate progress
function simulateProgress(start, end, duration, callback) {
  return new Promise((resolve) => {
    const steps = 20;
    const stepSize = (end - start) / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = start + (stepSize * currentStep);
      callback(progress);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        resolve();
      }
    }, stepDuration);
  });
}

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
