
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pingo-card py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Pingo</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Fast, accurate internet speed testing</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Pingo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
