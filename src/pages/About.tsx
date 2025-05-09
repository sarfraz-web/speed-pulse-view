
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            About Pingo
          </h1>
          <p className="text-gray-400">
            A modern internet speed testing application
          </p>
        </div>
        
        <Card className="bg-pingo-card border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">How Pingo Works</h2>
            <p className="mb-4">
              Pingo uses a combination of advanced technologies to provide accurate and reliable internet speed measurements:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Ping Test:</strong> Measures the response time between your device and our servers, indicating latency.
              </li>
              <li>
                <strong>Download Test:</strong> Measures how quickly data can be retrieved from our servers to your device.
              </li>
              <li>
                <strong>Upload Test:</strong> Measures how quickly data can be sent from your device to our servers.
              </li>
              <li>
                <strong>Jitter Analysis:</strong> Measures the variation in ping response times, which can affect video calls and gaming.
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <Card className="bg-pingo-card border-none shadow-lg mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Understanding Your Results</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-500">Download Speed</h3>
                <p>Measured in Mbps (Megabits per second). Higher values mean faster downloads of web pages, videos, and files.</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>0-5 Mbps</span>
                    <span className="text-red-400">Poor</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-30 Mbps</span>
                    <span className="text-amber-400">Average</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30-100 Mbps</span>
                    <span className="text-green-400">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>100+ Mbps</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-purple-500">Upload Speed</h3>
                <p>Measured in Mbps. Higher values mean faster uploading of files, better video calls, and livestreaming.</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>0-2 Mbps</span>
                    <span className="text-red-400">Poor</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2-10 Mbps</span>
                    <span className="text-amber-400">Average</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10-30 Mbps</span>
                    <span className="text-green-400">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30+ Mbps</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-amber-500">Ping</h3>
                <p>Measured in ms (milliseconds). Lower values mean lower latency and better responsiveness for gaming and video calls.</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>0-20 ms</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20-50 ms</span>
                    <span className="text-green-400">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50-100 ms</span>
                    <span className="text-amber-400">Average</span>
                  </div>
                  <div className="flex justify-between">
                    <span>100+ ms</span>
                    <span className="text-red-400">Poor</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-teal-500">Jitter</h3>
                <p>Measured in ms. Lower values mean more consistent connection, which is important for video calls and online gaming.</p>
                <div className="mt-2 text-sm">
                  <div className="flex justify-between">
                    <span>0-5 ms</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-15 ms</span>
                    <span className="text-green-400">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15-25 ms</span>
                    <span className="text-amber-400">Average</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25+ ms</span>
                    <span className="text-red-400">Poor</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-pingo-card border-none shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Technology Stack</h2>
            <p className="mb-4">
              Pingo is built using modern web technologies:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Frontend:</strong> React, Tailwind CSS, shadcn/ui</li>
              <li><strong>Backend:</strong> Node.js, Express, Socket.IO</li>
              <li><strong>Database:</strong> MongoDB with Mongoose</li>
              <li><strong>Testing:</strong> speedtest-net package for accurate measurements</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
